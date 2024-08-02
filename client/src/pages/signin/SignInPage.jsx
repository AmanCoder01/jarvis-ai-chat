import { SignIn } from '@clerk/clerk-react'
import React from 'react'
import "./signInPage.css"

export const SignInPage = () => {
    return (
        <div className='signInPage'>
            <SignIn path='/sign-in' signUpUrl='/sign-up' forceRedirectUrl="/dashboard" />
        </div>
    )
}
