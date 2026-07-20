import SignupForm from '@/components/forms/SignupForm/SignupForm';
import Link from 'next/link';

const Signup = () => {
     return (
          <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
               <div className="card w-full max-w-md bg-base-100">
                    <div className="card-body">
                         <h2 className="card-title text-2xl font-semibold text-base-content justify-center mb-6">Sign Up</h2>

                         <SignupForm />

                         {/* Sign Up Link */}
                         <p className="text-center text-sm text-base-content/60 mt-4">
                              <span className='text-slate-500'>Already have an account?</span>{' '}
                              <Link href="/auth/signin" className="text-warning hover:underline">Sign in</Link>
                         </p>
                    </div>
               </div>
          </div>
     );
}

export default Signup;
