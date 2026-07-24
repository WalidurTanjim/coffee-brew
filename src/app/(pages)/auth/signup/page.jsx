import SignupForm from '@/components/forms/SignupForm/SignupForm';
import SignInLink from '@/components/links/SignInLink/SignInLink';

const Signup = () => {
     return (
          <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
               <div className="card w-full max-w-md bg-base-100">
                    <div className="card-body">
                         <h2 className="card-title text-2xl font-semibold text-base-content justify-center mb-6">Sign Up</h2>

                         <SignupForm />

                         {/* Sign In Link */}
                         <SignInLink />
                    </div>
               </div>
          </div>
     );
}

export default Signup;
