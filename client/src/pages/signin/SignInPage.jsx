import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validator from "validator";
import toast from 'react-hot-toast';
import axios from 'axios';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { OAuth } from '../signup/OAuth';
import { UserData } from '../../context/userContext';

export const SigninPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [emailError, setEmailError] = useState("");
    const [seePassword, setSeePassword] = useState(false);

    const { user, setUser, userRawData, setUserRawData } = UserData();


    const navigate = useNavigate();
    // const dispatch = useDispatch();

    //validate email
    const validateEmail = () => {
        if (validator.isEmail(email)) {
            setEmailError("");
        } else {
            setEmailError("Enter a valid Email Id!");
        }
    };


    useEffect(() => {
        if (email !== "") validateEmail();

        if (validator.isEmail(email) && password) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [email, password]);


    useEffect(() => {
        if (user) {
            navigate("/dashboard")
        }
    }, [user])


    const handleSignIn = async (e) => {
        e.preventDefault();

        if (email === "" || password === "") {
            toast.error("Please fill all fields !")
        }

        try {
            setLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, { email, password }, { withCredentials: true });

            console.log(res.data);
            setUser(res.data.rest);
            toast.success(res.data.message);
            setLoading(false);
            navigate("/dashboard");

        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
            // console.log(error);
        }
    };


    return (
        <div className='relative w-full h-screen'>
            <div className='bg-black text-gray-200 max-w-md top-20 rounded-lg p-8 mx-auto  absolute left-0 right-0'>
                <h2 className='font-bold text-2xl text-center mb-8'>Sign In</h2>

                <OAuth />
                <form onSubmit={handleSignIn}>
                    <div className='text-center'>
                        --------------  or  ---------------
                    </div>

                    <div className='my-6 flex flex-col justify-center gap-4'>

                        <div className='relative'>
                            <input type="email" id="email" name="email" placeholder="Email Id" className='w-full p-2 pl-12 bg-inherit border rounded-lg outline-none' onChange={(e) => setEmail(e.target.value)} />
                            {emailError && <p className='text-red-500 text-sm'>{emailError}</p>}

                            <div className='absolute top-3 left-3'>
                                <MdEmail size={19} />
                            </div>
                        </div>

                        <div className='relative'>
                            <input type={seePassword ? "text" : "password"} id="password" name="password" placeholder="Password" className='w-full px-12 p-2 bg-inherit border rounded-lg outline-none' onChange={(e) => setPassword(e.target.value)} />
                            <div className='absolute top-3 left-3'>
                                <RiLockPasswordFill size={19} />
                            </div>

                            <span
                                className="absolute right-3  top-3 cursor-pointer "
                                onClick={() => setSeePassword(!seePassword)}
                            >
                                {seePassword ? <IoMdEyeOff size={20} /> : <IoEye size={20} />}
                            </span>
                        </div>


                        {disabled ? <button disabled className={`w-full  p-2 outline-none rounded-lg cursor-pointer mt-3 ${disabled ? "bg-gray-500" : "bg-[#217bfe]"}`}>{Loading ? "Signin..." : "Sign In"}</button> :
                            <button className={`w-full  p-2 outline-none rounded-lg cursor-pointer mt-3 ${disabled ? "bg-gray-500" : "bg-[#217bfe]"}`}>{Loading ? "Signin..." : "Sign In"}</button>}
                    </div>

                    <div>
                        Don't have an account ?
                        <Link to="/sign-up" className='text-blue-400'> Create Account</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

