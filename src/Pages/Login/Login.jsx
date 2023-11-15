import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Context/AuthProvider';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';

const Login = () => {
    const {emailLogin} = useContext(AuthContext)
    const [disabled, setDisabled] = useState(true)
    const navigate = useNavigate()
    const location = useLocation();

    const from = location.state?.from?.pathname || "/"

    useEffect(()=>{
        loadCaptchaEnginge(6)
    }, [])

    const handleValidateCaptcha = e =>{
        const user_captcha_value = e.target.value
        if(validateCaptcha(user_captcha_value)){
            setDisabled(false)
        }
        else{
            setDisabled(true)
        }
    }

    const handleLogin = e =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        emailLogin(email, password)
        .then(() =>{
            toast.success('Login successfully'); 
        })
        navigate(from, { replace: true});
    }




    return (
        <div>
            <Helmet>
                <title>Bistro | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <LoadCanvasTemplate />
                        </label>
                        <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="Code" className="input input-bordered" required />
                        {/* <button onClick={handleValidateCaptcha} className=" mt-2 btn btn-xs btn-error">Validate Captcha</button> */}
                        
                        </div>
                        <div className="form-control mt-6">
                        <input type='submit' value="Login" disabled={disabled} className="btn btn-neutral"/>
                        </div>

                        <label className="label text-[#00917c]">
                                New here? <Link to="/signUp" className="label-text-alt link link-hover font-bold text-[#00917c]">Sign Up</Link>
                        </label>
                    </form>
                       <SocialLogin></SocialLogin> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;