import { OTP } from "../models/otp.js";
import { User } from "../models/user.js";
import { tryCatch } from "../utils/tryCatch.js";
import otpGenerator from 'otp-generator';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const cookieOptions = {
    maxAge: 3 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
};



// Send OTP For Email Verification
export const sendotp = tryCatch(async (req, res) => {
    const { name, email, password } = req.body;

    // console.log(name, email, password);

    if (!name || !email || !password) {
        return res.status(401).json({
            success: false,
            message: "All Fields are required"
        })
    }


    // Check if user is already present
    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
        return res.status(401).json({
            success: false,
            message: `User is Already Registered`,
        });
    }

    let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });

    const result = await OTP.findOne({ otp: otp });

    // console.log("OTP", otp);

    while (result) {
        otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
    }

    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);

    return res.status(200).json({
        success: true,
        message: `OTP Sent Successfully`,
        otp,
    });
})



export const register = tryCatch(async (req, res) => {
    const { name, email, password, otp } = req.body;

    if (!otp) {
        return res.status(401).json({
            success: false,
            message: "Please Enter Otp"
        })
    }


    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1); // get the most recent otp
    // console.log(recentOtp);

    if (recentOtp.length == 0) {
        return res.status(400).json({
            success: false,
            message: "Otp not found",
        });
    } else if (otp !== recentOtp[0].otp) {
        return res.status(401).json({
            success: false,
            message: "Invalid OTP"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        img: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
    })

    const { password: pass, ...rest } = user._doc;

    // create jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT);

    return res.status(201).cookie("access-token", token, cookieOptions).json({
        message: "Registered Successfully",
        rest
    });
})



export const login = tryCatch(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User not found"
        })
    }

    if (user.googleSignIn) {
        return res.status(401).json({
            success: false,
            message: "Entered email is Signed Up with google account. Please SignIn with google."
        })
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
        return res.status(401).json({
            success: false,
            message: "Invalid Credentials"
        })
    }

    const { password: pass, ...rest } = user._doc;

    // create jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT);

    return res.status(201).cookie("access-token", token, cookieOptions).json({
        message: "Login Successfully",
        rest
    });
})




export const myProfile = tryCatch(async (req, res) => {
    if (!req.user.id) {
        return res.status(401).json({
            success: false,
            message: "Please Login"
        })
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User not found"
        })
    }

    const { password: pass, ...rest } = user._doc;


    return res.status(201).json({
        rest
    });
})







export const google = tryCatch(async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        const { password: pass, ...rest } = user._doc;

        // Return user data, token, and success message
        const token = jwt.sign({ id: user._id }, process.env.JWT);

        return res.status(200).cookie("access-token", token, cookieOptions).json({
            success: true,
            rest,
            message: `Welcome Back ${user.name}`,
        });
    } else {
        const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

        const newUser = await User.create({
            name,
            email,
            password,
            img: googlePhotoUrl,
            googleSignIn: true
        })

        const { password: pass, ...rest } = newUser._doc;


        // Return user data, token, and success message
        const token = jwt.sign({ id: newUser._id }, process.env.JWT);

        return res.status(200).cookie("access-token", token, cookieOptions).json({
            success: true,
            rest,
            message: `Registered Successfully, ${newUser.name}`,
        });

    }
}
)






export const logout = async (req, res) => {
    return res
        .status(200)
        .cookie("access-token", "", { ...cookieOptions, maxAge: 0 })
        .json({
            success: true,
            message: "Logged out successfully",
        });
};

