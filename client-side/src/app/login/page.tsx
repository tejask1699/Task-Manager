'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'
import AuthFooter from '@/components/auth/auth-footer'
import { useRouter } from 'next/navigation'

interface LoginData {
    user_email: string
    user_password: string
}

const Login = () => {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>()
    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = async (data: LoginData) => {
        
        try {
            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(data)
            })
            console.log(await res.json())
            router.push('/dashboard')
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-50">
            <Card className="w-[400px] p-6">
                <CardContent>
                    <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="space-y-4">
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

                            {/* Password Field with Toggle */}
                            <div className="relative">
                                <Label htmlFor="user_password">Password</Label>
                                <Input
                                    id="user_password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className={`${errors.user_password ? 'border-red-500' : ''}`}
                                    {...register('user_password', {
                                        required: 'Password is required',
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

                            {/* Submit Button */}
                            <Button type="submit" className="w-full text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600">
                                Login
                            </Button>
                        </div>
                    </form>
                    <AuthFooter type="login" />
                </CardContent>
            </Card>
        </div>
    )
}

export default Login
