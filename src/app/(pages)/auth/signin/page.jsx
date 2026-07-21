import SigninForm from '@/components/forms/SigninForm/SigninForm';
import SignUpLink from '@/components/links/SignUpLink/SignUpLink';
import GoogleSignInButton from '@/components/SocialButtons/GoogleSignInButton/GoogleSignInButton';
import React from 'react'

const Signin = () => {
     return (
          <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
               <div className="card w-full max-w-md bg-base-100">
                    <div className="card-body">
                         <h2 className="card-title text-2xl font-semibold text-base-content justify-center mb-6">Sign In</h2>

                         <SigninForm />

                         <GoogleSignInButton />

                         {/* Sign In Link */}
                         <SignUpLink />
                    </div>
               </div>
          </div>
     );
}

export default Signin
