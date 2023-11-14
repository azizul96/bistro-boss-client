
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";


const FoodCard = ({item}) => {
    const {name, price, image, recipe, _id} = item
    // useAuth is our custom hook.
    const {user} =  useAuth()
    const navigate = useNavigate()
    const location = useLocation();

    const axiosSecure = useAxios()


    const handleAddToCart = food =>{
        console.log(food,);
        if(user && user.email){
            // will add to database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name, 
                image,
                price
            }
            axiosSecure.post('/carts', cartItem)
            .then(res =>{
                console.log(res.data);
                if(res.data.insertedId){
                    toast.success(`${name} - added on the cart`)
                }
            })
            
        }
        else{
            Swal.fire({
                title: "Please login first!",
                text: "Login for added items on the cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes Login!"
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/login", {state: {from: location}})
                }
              });
        }
    }
    return (
        <div>
            <div className="card  bg-base-100 shadow-xl rounded-none">
                <figure><img className="object-cover w-full h-56" src={image} alt="Shoes" /></figure>
                <p className="absolute bg-slate-900 text-white right-0 mr-4 mt-4 px-3">${price}</p>
                <div className="card-body ">
                    <h2 className="card-title justify-center">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-center ">
                    <button onClick={()=> handleAddToCart(item)} className="btn btn-md btn-outline border-0 border-b-4 text-yellow-600">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;