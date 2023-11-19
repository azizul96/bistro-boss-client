import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";

const PaymentHistory = () => {
    const {user} = useAuth()
    const axiosSecure = useAxios()

    const {data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/payments/${user.email}`)
            console.log(res.data);
            return res.data
        }
    })

    return ( 
        <div>
            <div>
                <SectionTitle heading="Payment History" subHeading="all payment"></SectionTitle>
            </div>
            <div>
                <h2 className="text-2xl my-5"> Total Payments: {payments.length}</h2>
                <table className="table w-full">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>Email</th>
                        <th>Transaction ID</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Date</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {
                        payments.map((payment, index) => <tr key={payment._id}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                {payment.email}
                            </td>
                            <td>
                                {payment.transactionId}
                            </td>
                            <td>
                                ${payment.price}
                            </td>
                            
                            <td>
                                {payment.status}
                            </td>
                            <td>
                                {payment.date}
                            </td>
                        </tr>)
                    }
                    </tbody> 
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;