import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (name, photo) =>{
        setLoading(true)
        return updateProfile( auth.currentUser, {displayName:name, photoURL:photo})
    }

    const emailLogin = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleLogin = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const userLogOut = () =>{
        setLoading(true)
        return signOut(auth)
    }


    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser)=>{            
        setUser(currentUser)
        // console.log('Current user...',currentUser);
        if(currentUser){
            const userInfo = {email: currentUser.email}
            axiosPublic.post('/jwt', userInfo)
            .then(res =>{
                if(res.data.token){
                    localStorage.setItem('access-token', res.data.token)
                }
            })
        }
        else{
            localStorage.removeItem('access-token')
        }
        setLoading(false)
        
        })
        
    },[axiosPublic])

    const authInfo = {
        user,
        loading,
        createUser,
        updateUserProfile,
        userLogOut,
        googleLogin,
        emailLogin
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;