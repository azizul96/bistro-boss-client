import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const {googleLogin} = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate(null)


    const handleGoogleLogin = () =>{
        googleLogin()
        .then(result =>{
            const usrInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', usrInfo)
            .then(res =>{
                console.log(res.data);
                toast.success('Login successful');
                navigate("/")
            })
        })
        .catch(error =>{
            toast.error(error.message);
        })
    }

  return (
    <div>
        <div className="divider"></div>
      <div className="mb-5">
        <label className="label justify-center items-center gap-5"> Login With{" "} <FcGoogle onClick={handleGoogleLogin}  className="text-3xl cursor-pointer"/>
        </label>
      </div>
    </div>
  );
};

export default SocialLogin;
