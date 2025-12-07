import {
	ArrowRight,
	Building2,
	Eye,
	EyeOff,
	Lock,
	Mail,
	User,
	UserCircle2,
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { authAPI } from '../services/api'

export default function Register() {
	const { login } = useAuth()
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [accountType, setAccountType] = useState('user')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const handleSubmit = async e => {
		e.preventDefault()
		setError('')

		// Validation
		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match')
			return
		}

		if (formData.password.length < 6) {
			setError('Password must be at least 6 characters')
			return
		}

		setLoading(true)

		try {
			let response
			const registerData = {
				name: formData.fullName,
				email: formData.email,
				password: formData.password,
			}

			if (accountType === 'user') {
				response = await authAPI.registerUser(registerData)
			} else {
				response = await authAPI.registerCompany(registerData)
			}

			// Auto-login after registration
			login({
				id: response.id,
				name: response.name,
				email: response.email,
				role: accountType,
			})

			console.log('Registration successful, redirecting...')
		} catch (err) {
			setError(err.message || 'Registration failed. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12'>
			<div className='w-full max-w-md'>
				{/* Card */}
				<div className='bg-white rounded-2xl shadow-2xl overflow-hidden'>
					{/* Header */}
					<div className='bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white'>
						<div className='w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4'>
							<div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
								<span className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
									PR
								</span>
							</div>
						</div>
						<h1 className='text-3xl font-bold mb-2'>Create Account</h1>
						<p className='text-blue-100'>Join Place Rank community today</p>
					</div>

					{/* Form */}
					<div className='p-8'>
						<div className='space-y-5'>
							{/* Account Type Selection */}
							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-3'>
									Account Type
								</label>
								<div className='grid grid-cols-2 gap-3'>
									<button
										type='button'
										onClick={() => setAccountType('user')}
										className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-200 ${
											accountType === 'user'
												? 'border-purple-600 bg-purple-50 text-purple-600'
												: 'border-gray-200 text-gray-600 hover:border-gray-300'
										}`}
									>
										<UserCircle2 size={24} />
										<span className='font-semibold'>User</span>
									</button>
									<button
										type='button'
										onClick={() => setAccountType('company')}
										className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-200 ${
											accountType === 'company'
												? 'border-purple-600 bg-purple-50 text-purple-600'
												: 'border-gray-200 text-gray-600 hover:border-gray-300'
										}`}
									>
										<Building2 size={24} />
										<span className='font-semibold'>Company</span>
									</button>
								</div>
							</div>

							{/* Error Message */}
							{error && (
								<div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm'>
									{error}
								</div>
							)}

							{/* Full Name */}
							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2'>
									{accountType === 'company' ? 'Company Name' : 'Full Name'}
								</label>
								<div className='relative'>
									{accountType === 'company' ? (
										<Building2
											className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'
											size={20}
										/>
									) : (
										<User
											className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'
											size={20}
										/>
									)}
									<input
										type='text'
										name='fullName'
										value={formData.fullName}
										onChange={handleChange}
										placeholder={
											accountType === 'company'
												? 'Enter company name'
												: 'Enter your full name'
										}
										className='w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200'
										required
									/>
								</div>
							</div>

							{/* Email */}
							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2'>
									Email Address
								</label>
								<div className='relative'>
									<Mail
										className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'
										size={20}
									/>
									<input
										type='email'
										name='email'
										value={formData.email}
										onChange={handleChange}
										placeholder='Enter your email'
										className='w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200'
										required
									/>
								</div>
							</div>

							{/* Password */}
							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2'>
									Password
								</label>
								<div className='relative'>
									<Lock
										className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'
										size={20}
									/>
									<input
										type={showPassword ? 'text' : 'password'}
										name='password'
										value={formData.password}
										onChange={handleChange}
										placeholder='Create a password'
										className='w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200'
										required
									/>
									<button
										type='button'
										onClick={() => setShowPassword(!showPassword)}
										className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
									>
										{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
									</button>
								</div>
							</div>

							{/* Confirm Password */}
							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2'>
									Confirm Password
								</label>
								<div className='relative'>
									<Lock
										className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'
										size={20}
									/>
									<input
										type={showConfirmPassword ? 'text' : 'password'}
										name='confirmPassword'
										value={formData.confirmPassword}
										onChange={handleChange}
										placeholder='Confirm your password'
										className='w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200'
										required
									/>
									<button
										type='button'
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
									>
										{showConfirmPassword ? (
											<EyeOff size={20} />
										) : (
											<Eye size={20} />
										)}
									</button>
								</div>
							</div>

							{/* Terms Checkbox */}
							<div>
								<label className='flex items-start gap-2 cursor-pointer'>
									<input
										type='checkbox'
										className='w-4 h-4 mt-1 text-purple-600 border-gray-300 rounded focus:ring-purple-500'
										required
									/>
									<span className='text-sm text-gray-600'>
										I agree to the{' '}
										<a
											href='#'
											className='text-purple-600 hover:underline font-semibold'
										>
											Terms of Service
										</a>{' '}
										and{' '}
										<a
											href='#'
											className='text-purple-600 hover:underline font-semibold'
										>
											Privacy Policy
										</a>
									</span>
								</label>
							</div>

							{/* Submit Button */}
							<button
								onClick={handleSubmit}
								disabled={loading}
								className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center gap-2 group ${
									loading ? 'opacity-70 cursor-not-allowed' : ''
								}`}
							>
								{loading ? 'Creating Account...' : 'Create Account'}
								{!loading && (
									<ArrowRight
										size={20}
										className='group-hover:translate-x-1 transition-transform'
									/>
								)}
							</button>
						</div>

						{/* Divider */}
						<div className='my-6 flex items-center gap-4'>
							<div className='flex-1 h-px bg-gray-200'></div>
							<span className='text-sm text-gray-500'>OR</span>
							<div className='flex-1 h-px bg-gray-200'></div>
						</div>

						{/* Social Login */}
						<div className='space-y-3'>
							<button className='w-full border-2 border-gray-200 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-3'>
								<svg className='w-5 h-5' viewBox='0 0 24 24'>
									<path
										fill='#4285F4'
										d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
									/>
									<path
										fill='#34A853'
										d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
									/>
									<path
										fill='#FBBC05'
										d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
									/>
									<path
										fill='#EA4335'
										d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
									/>
								</svg>
								Continue with Google
							</button>
						</div>

						{/* Sign In Link */}
						<div className='mt-6 text-center'>
							<p className='text-gray-600'>
								Already have an account?{' '}
								<a
									href='/login'
									className='text-purple-600 hover:text-purple-700 font-semibold'
								>
									Sign In
								</a>
							</p>
						</div>
					</div>
				</div>

				{/* Footer */}
				<p className='text-center text-gray-500 text-sm mt-6'>
					Protected by reCAPTCHA and subject to the{' '}
					<a href='#' className='text-purple-600 hover:underline'>
						Google Privacy Policy
					</a>
				</p>
			</div>
		</div>
	)
}
