'use client'

import Link from 'next/link'
import { CardFooter } from '@/components/ui/card'

interface AuthFooterProps {
  type: 'login' | 'register'
}

const AuthFooter = ({ type }: AuthFooterProps) => {
  return (
    <CardFooter className="justify-center mt-4 text-sm">
      {type === 'register' ? (
        <>
          Already have an account? <Link href="/login" className="text-blue-600 ml-1 hover:underline">Login</Link>
        </>
      ) : (
        <>
          Don't have an account? <Link href="/register" className="text-blue-600 ml-1 hover:underline">Register</Link>
        </>
      )}
    </CardFooter>
  )
}

export default AuthFooter