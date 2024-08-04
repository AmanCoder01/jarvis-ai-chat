import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserData } from '../../context/userContext';
import "./signUpPage.css"

export const Verify = () => {

    const [otp, setOtp] = useState('');
    const [otpLoading, setOtpLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const { user, setUser, userRawData, setUserRawData } = UserData();


    const navigate = useNavigate();

    // console.log(signupData);

    useEffect(() => {
        if (otp.length === 6) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [otp]);


    // useEffect(() => {
    //     if (!userRawData) {
    //         navigate('/sign-in')
    //     }
    // }, [userRawData])


    const validateOtp = async () => {
        setOtpLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, { name: userRawData.name, email: userRawData.email, password: userRawData.password, otp }, { withCredentials: true });

            console.log(res);


            setOtpLoading(false);
            setUserRawData(null);
            setUser(res.data.rest);
            navigate("/dashboard");
            toast.success(res.data.message);

        } catch (error) {
            setOtpLoading(false);
            toast.error(error.response.data.message);
            // console.log(error);
        }

    }


    return (
        <div className='relative w-full h-screen'>
            <img src="./istockphoto.jpg" alt="" className='signUpPage' />
            <div className='bg-black text-gray-200 max-w-md top-20 rounded-lg p-8 mx-auto  absolute left-0 right-0'>
                <h2 className='font-bold text-2xl text-center mb-10'>Verify OTP</h2>
                <h2>A verification <b>&nbsp;OTP &nbsp;</b> has been sent to:</h2>
                <span className='italic'>{userRawData?.email}</span>

                <div className='my-8'>
                    <div>
                        <input type="number" className='w-full p-2 px-5 bg-inherit border rounded-lg outline-none' onChange={(e) => setOtp(e.target.value)} />
                    </div>


                    {disabled ? <button disabled className={`w-full  p-2 outline-none rounded-lg cursor-pointer mt-8 ${disabled ? "bg-gray-500 " : "bg-[#217bfe]"}`} onClick={validateOtp}>{otpLoading ? "Verifying..." : "Submit"}</button> :
                        <button className={`w-full  p-2 outline-none rounded-lg cursor-pointer mt-8 ${disabled ? "bg-gray-500 " : "bg-[#217bfe]"}`} onClick={validateOtp}>{otpLoading ? "Verifying..." : "Submit"}</button>}
                </div>

            </div>
        </div>
    )
}

