import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxios from "../../../Hooks/useAxios";
import toast from "react-hot-toast";



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {
    const { register, handleSubmit } = useForm()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxios()


    const onSubmit = async(data) =>{
        console.log(data)
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if(res.data.success){
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.post('/menu', menuItem)
            console.log(menuRes.data);
            if(menuRes.data.insertedId){
                toast.success("Item Added!")
            }
        }
        console.log("image",res.data);
    }

    return (
        <div>
            <div>
                <SectionTitle subHeading="What's New?" heading="Add An Item"></SectionTitle>
            </div>
            <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="from-control w-full my-6">
                    <label className="label">
                        <span className="label-text font-semibold">Item Name</span>
                    </label>
                    <input {...register("name", {required: true})} type="text" placeholder="Type here" className="input input-bordered input-primary w-full " />
                </div>
                <div className="flex gap-5">
                    <div className="from-control w-full my-6">
                        <label className="label">
                            <span className="label-text font-semibold">Category*</span>
                        </label>
                        <select {...register("category", {required: true})}
                        className="select select-primary w-full ">
                            <option disabled selected>Select Category</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drinks">Drinks</option>
                        </select>
                    </div>
                    <div className="from-control w-full my-6">
                        <label className="label">
                            <span className="label-text font-semibold">Price*</span>
                        </label>
                        <input {...register("price", {required: true})} type="number" placeholder="Price" className="input input-bordered input-primary w-full " />
                    </div>
                    
                </div>
                <div className="from-control w-full my-6">
                    <label className="label">
                        <span className="label-text font-semibold">Item Recipe</span>
                    </label>
                    <textarea {...register("recipe")} 
                    className="textarea textarea-primary w-full" placeholder="Recipe"></textarea>
                    </div>
                <div className="from-control my-6">
                    <input {...register("image", {required: true})}  type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                </div>

                <button className="btn text-white bg-amber-600">Add Item <FaUtensils/></button>
            </form>
            </div>
        </div>
    );
};

export default AddItems;