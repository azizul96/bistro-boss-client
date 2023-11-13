import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { useContext } from "react";
import toast from "react-hot-toast";


const SignUp = () => {
    const {register, handleSubmit, reset, formState: { errors },  } = useForm()
    const {createUser, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate(null)

    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user
            console.log(loggedUser);
            updateUserProfile(data.name, data.image)
            .then(()=>{
                reset()
                toast.success('User created successfully');
                navigate("/")
            })
        })
    }
    
    return (
        <div>
            <Helmet>
                <title>Bistro | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
                    
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} name="name" placeholder="Full Name" className="input input-bordered" />
                        {errors.name && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image URL</span>
                        </label>
                        <input type="text" {...register("image", { required: true })} name="image" placeholder="Your Image url" className="input input-bordered" />
                        {errors.image && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                        {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", { 
                            required: true, 
                            minLength: 6,
                            maxLength: 20,
                            pattern: /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/ })} name="password" placeholder="password" className="input input-bordered" />
                        {errors.password?.type === 'required' && <span className="text-red-500">Password is required</span>}
                        {errors.password?.type === 'minLength' && <span className="text-red-500">Password must be 6 Character</span>}
                        {errors.password?.type === 'maxLength' && <span className="text-red-500">Password must be under 20 Character</span>}
                        {errors.password?.type === 'pattern' && <span className="text-red-500">Password must be special Characters</span>}
                        </div>
                        
                        <div className="form-control mt-6">
                        <button className="btn btn-neutral">Sign Up</button>
                        </div>

                        <label className="label text-[#00917c]">
                                Have an account ? <Link to="/login" className="label-text-alt link link-hover font-bold text-[#00917c]">Login</Link>
                        </label>
                    </form>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;