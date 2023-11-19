import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const CheckoutForm = () => {
    const [error, setError] = useState("")
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("")
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxios();
    const {user} = useAuth()
    const [cart, refetch] = useCart()
    const navigate = useNavigate()
    const totalPrice = cart.reduce((total, item)=> total + item.price, 0)

    useEffect(()=>{
        if(totalPrice > 0){
            axiosSecure.post('/create-payment-intent', {price: totalPrice})
        .then(res =>{
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret)
        })
        }
    },[axiosSecure,totalPrice ])

    const handleSubmit = async(event) =>{
        event.preventDefault()
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
          }
          const card = elements.getElement(CardElement);
          if (card == null) {
            return;
          }
          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
          if (error) {
            console.log('[error]', error);
            setError(error.message)
          } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError("")
          }
        //   confirm payment
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: card,
              billing_details: {
                name: user?.displayName || 'Anonymous',
                email: user?.email || 'Anonymous'
              },
            },
          })
          if(confirmError){
            console.log('confirm Error',confirmError.message);
          }
          else{
            console.log('payment Intent ', paymentIntent);
            if(paymentIntent?.status === 'succeeded'){
                setTransactionId(paymentIntent.id)

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), //Todo: utc date convert using moment js
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }
                const res = await axiosSecure.post('/payments', payment)
                // console.log(res);
                refetch()
                if(res.data?.insertedId){
                   toast.success("Payment Successful!")
                   navigate('/dashboard/paymentHistory')
                }
            }
          }
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement 
                options={{
                style: {
                    base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                    },
                    invalid: {
                    color: '#9e2146',
                    },
                },
                }}
            />
            <button type="submit" disabled={!stripe ||!clientSecret} className="btn btn-sm btn-success text-white my-5">$Pay</button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-500"> Transaction ID: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;