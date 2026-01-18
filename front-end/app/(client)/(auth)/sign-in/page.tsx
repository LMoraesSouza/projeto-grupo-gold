"use client";

import Cookies from 'js-cookie'
import { SignIn } from './sign-in';
import { useRouter } from 'next/navigation';


export default function SignInPage() {
  const router = useRouter();
  const userData = Cookies.get('userData');
  
  if (userData) {
    const user = JSON.parse(userData);
    if (user.role === 'client') {
      router.push('/agendamentos');
    }
  }
  
  return (

    <div className='min-h-screen flex justify-center p-'>
        <SignIn/>
    </div>
)
}