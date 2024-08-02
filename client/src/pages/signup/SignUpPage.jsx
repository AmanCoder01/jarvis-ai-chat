import { SignUp } from '@clerk/clerk-react'
import React from 'react'
import "./signUpPage.css"

export const SignUpPage = () => {
    return (
        <div className='signUpPage'>
            <SignUp path='/sign-up' signInUrl='/sign-in' />
        </div>
    )
}
