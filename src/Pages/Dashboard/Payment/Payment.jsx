import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK)
const Payment = () => {
    return (
        <div>
            <div>
                <SectionTitle heading="Payment" subHeading="Please pay to eat"></SectionTitle>
            </div>
            <div className="my-10">
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;