import React from 'react'
import { FcGoogle } from "react-icons/fc";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase";
import axios from "axios";
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { UserData } from '../../context/userContext';
// import { useDispatch } from 'react-redux';


export const OAuth = () => {
    const auth = getAuth(app);
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const { setUser } = UserData();

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);

            const data = {
                name: resultsFromGoogle?.user?.displayName,
                email: resultsFromGoogle?.user?.email,
                googlePhotoUrl: resultsFromGoogle?.user?.photoURL,
            };


            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/google`, data, {
                withCredentials: true,
            });
            // console.log(res);

            if (res.status === 200) {
                setUser(res.data.rest)
                toast.success(res.data.message);
                navigate("/dashboard");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            // dispatch(signUpFailure());
            console.log(error);

            toast.error(error.response.data.message || "Something Went Wrong !");
        }
    };

    return (
        <div className='w-full my-6'>
            <button className='border w-full p-2 rounded-lg flex gap-4 items-center justify-center' onClick={handleGoogleClick}>
                <FcGoogle size={20} />
                Continue with Google</button>
        </div>
    )
}


