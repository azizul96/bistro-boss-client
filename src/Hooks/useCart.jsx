import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useCart = () => {
    const axiosSecure = useAxios()
    const {data: cart = [] } = useQuery({
        queryKey: ['cart'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/carts')
            return res.data
        }
    })
    return [cart]
};

export default useCart;