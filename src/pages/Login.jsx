import {
	ArrowRight,
	Building2,
	Eye,
	EyeOff,
	Lock,
	Mail,
	UserCircle2,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Default credentials
const DEFAULT_USERS = {
	user: {
		email: 'john.doe@example.com',
		password: 'user123',
		data: {
			id: 1,
			name: 'John Doe',
			email: 'john.doe@example.com',
			role: 'user',
		},
	},
	company: {
		email: 'info@heritagetours.uz',
		password: 'company123',
		data: {
			id: 2,
			name: 'Heritage Tours Uzbekistan',
			email: 'info@heritagetours.uz',
			role: 'company',
		},
	},
}

export default function Login() {
	const navigate = useNavigate()
	const { login } = useAuth()
	const [showPassword, setShowPassword] = useState(false)
	const [accountType, setAccountType] = useState('user')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const handleSubmit = async e => {
		e.preventDefault()
		setError('')
		setLoading(true)

		try {
			// Simulate API delay
			await new Promise(resolve => setTimeout(resolve, 500))

			// Check credentials
			const defaultCreds = DEFAULT_USERS[accountType]

			if (
				formData.email === defaultCreds.email &&
				formData.password === defaultCreds.password
			) {
				// Login successful
				login(defaultCreds.data)
				navigate('/profile')
			} else {
				setError('Invalid credentials. Try default credentials below.')
			}
		} catch (err) {
			setError(err.message || 'Login failed. Please try again.')
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

	const fillDefaultCredentials = () => {
		const defaultCreds = DEFAULT_USERS[accountType]
		setFormData({
			email: defaultCreds.email,
			password: defaultCreds.password,
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
						<h1 className='text-3xl font-bold mb-2'>Welcome Back!</h1>
						<p className='text-blue-100'>Sign in to continue to Place Rank</p>
					</div>

					{/* Form */}
					<div className='p-8'>
						<div className='space-y-6'>
							{/* Account Type Selection */}
							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-3'>
									Account Type
								</label>
								<div className='grid grid-cols-2 gap-3'>
									<button
										type='button'
										onClick={() => {
											setAccountType('user')
											setFormData({ email: '', password: '' })
											setError('')
										}}
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
										onClick={() => {
											setAccountType('company')
											setFormData({ email: '', password: '' })
											setError('')
										}}
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

							{/* Default Credentials Info */}
							<div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
								<p className='text-sm font-semibold text-blue-800 mb-2'>
									Demo Credentials:
								</p>
								<div className='text-xs text-blue-700 space-y-1'>
									<p>
										<strong>Email:</strong> {DEFAULT_USERS[accountType].email}
									</p>
									<p>
										<strong>Password:</strong>{' '}
										{DEFAULT_USERS[accountType].password}
									</p>
								</div>
								<button
									type='button'
									onClick={fillDefaultCredentials}
									className='mt-3 text-sm text-blue-600 hover:text-blue-700 font-semibold underline'
								>
									Use default credentials
								</button>
							</div>

							{/* Error Message */}
							{error && (
								<div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm'>
									{error}
								</div>
							)}

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
										placeholder='Enter your password'
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

							{/* Remember & Forgot */}
							<div className='flex items-center justify-between'>
								<label className='flex items-center gap-2 cursor-pointer'>
									<input
										type='checkbox'
										className='w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500'
									/>
									<span className='text-sm text-gray-600'>Remember me</span>
								</label>
								<button className='text-sm text-purple-600 hover:text-purple-700 font-semibold'>
									Forgot Password?
								</button>
							</div>

							{/* Submit Button */}
							<button
								onClick={handleSubmit}
								disabled={loading}
								className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center gap-2 group ${
									loading ? 'opacity-70 cursor-not-allowed' : ''
								}`}
							>
								{loading ? 'Signing In...' : 'Sign In'}
								{!loading && (
									<ArrowRight
										size={20}
										className='group-hover:translate-x-1 transition-transform'
									/>
								)}
							</button>
						</div>

						{/* Sign Up Link */}
						<div className='mt-6 text-center'>
							<p className='text-gray-600'>
								Don't have an account?{' '}
								<button
									onClick={() => navigate('/signup')}
									className='text-purple-600 hover:text-purple-700 font-semibold'
								>
									Sign Up
								</button>
							</p>
						</div>
					</div>
				</div>

				{/* Footer */}
				<p className='text-center text-gray-500 text-sm mt-6'>
					By signing in, you agree to our{' '}
					<button className='text-purple-600 hover:underline'>Terms</button> and{' '}
					<button className='text-purple-600 hover:underline'>
						Privacy Policy
					</button>
				</p>
			</div>
		</div>
	)
}
