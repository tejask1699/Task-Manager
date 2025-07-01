'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Loader } from 'lucide-react'
import AuthFooter from '@/components/auth/auth-footer'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface RegisterData {
  user_name: string
  user_email: string
  user_password: string
  user_confirm_password: string
}

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData>()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const router = useRouter()


  const onSubmit = async (data: RegisterData) => {
    setLoading(true)
    const formattedData = {
      user_name: data.user_name,
      user_password: data.user_password,
      user_email: data.user_email
    };

    try {
      const res = await fetch(`http://localhost:5000/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData)
      });

      if (res.ok) { // same as res.status >= 200 && res.status < 300
        const Userdata = await res.json();
        localStorage.setItem("token", Userdata.token);
        setLoading(false)
        toast.success("Registered successfully");
        router.push('/dashboard');
      } else {
        const errorData = await res.json();
        setLoading(false)
        toast.error(errorData.message || "Registration failed");
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
          setLoading(false)
      toast.error(message)
    }
  }


  // Watch password to validate confirm password
  const password = watch('user_password')

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-50">
      <Card className="w-[400px] p-6">
        <CardContent>
          <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-4">
              {/* Full Name Field */}
              <div>
                <Label htmlFor="user_name">Full Name</Label>
                <Input
                  id="user_name"
                  type="text"
                  placeholder="Enter your full name"
                  className={`${errors.user_name ? 'border-red-500' : ''}`}
                  {...register('user_name', {
                    required: 'Full Name is required',
                    minLength: {
                      value: 2,
                      message: 'Full Name must be at least 2 characters',
                    },
                  })}
                />
                {errors.user_name && (
                  <p className="text-red-600 text-sm mt-1">{errors.user_name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <Label htmlFor="user_email">Email</Label>
                <Input
                  id="user_email"
                  type="email"
                  placeholder="Enter your email"
                  className={`${errors.user_email ? 'border-red-500' : ''}`}
                  {...register('user_email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                />
                {errors.user_email && (
                  <p className="text-red-600 text-sm mt-1">{errors.user_email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <Label htmlFor="user_password">Password</Label>
                <Input
                  id="user_password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className={`${errors.user_password ? 'border-red-500' : ''}`}
                  {...register('user_password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 focus:outline-none"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.user_password && (
                  <p className="text-red-600 text-sm mt-1">{errors.user_password.message}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <Label htmlFor="user_confirm_password">Confirm Password</Label>
                <Input
                  id="user_confirm_password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className={`${errors.user_confirm_password ? 'border-red-500' : ''}`}
                  {...register('user_confirm_password', {
                    required: 'Confirm Password is required',
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 focus:outline-none"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.user_confirm_password && (
                  <p className="text-red-600 text-sm mt-1">{errors.user_confirm_password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={loading} className="w-full text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600">
                {loading ? (
                  <>
                    Register
                    <Loader className='animate-spin' />
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <AuthFooter type="register" />
      </Card>
    </div>
  )
}

export default Register
