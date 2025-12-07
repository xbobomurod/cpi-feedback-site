import { ArrowRight, FileText, Image, MapPin, Tag, Upload } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { placeAPI } from '../services/api'

export default function AddPlace() {
	const { user } = useAuth()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		location: '',
		category: '',
		description: '',
		image: '',
	})

	const categories = [
		'Restaurants',
		'Historical Sites',
		'Parks',
		'Museums',
		'Shopping',
		'Entertainment',
		'Hotels',
		'Cafes',
	]

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleImageUpload = e => {
		const file = e.target.files[0]
		if (file) {
			// In real app, upload to server and get URL
			const reader = new FileReader()
			reader.onloadend = () => {
				setFormData({ ...formData, image: reader.result })
			}
			reader.readAsDataURL(file)
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setError('')
		setSuccess(false)

		// Validation
		if (!formData.name || !formData.location || !formData.category) {
			setError('Please fill in all required fields')
			return
		}

		try {
			setLoading(true)
			await placeAPI.create({
				...formData,
				companyId: user.id,
			})
			setSuccess(true)
			// Reset form
			setFormData({
				name: '',
				location: '',
				category: '',
				description: '',
				image: '',
			})
			// Redirect to profile after 2 seconds
			setTimeout(() => {
				console.log('Redirect to profile')
			}, 2000)
		} catch (err) {
			setError(err.message || 'Failed to add place')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4'>
			<div className='max-w-3xl mx-auto'>
				{/* Header */}
				<div className='bg-white rounded-2xl shadow-2xl overflow-hidden mb-8'>
					<div className='bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white'>
						<div className='w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4'>
							<MapPin size={32} />
						</div>
						<h1 className='text-3xl font-bold mb-2'>Add New Place</h1>
						<p className='text-emerald-100'>
							Share a new location with the community
						</p>
					</div>

					<div className='p-8'>
						{/* Success Message */}
						{success && (
							<div className='bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6 flex items-center gap-2'>
								<span>✓</span>
								<span>Place added successfully! Redirecting to profile...</span>
							</div>
						)}

						{/* Error Message */}
						{error && (
							<div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6'>
								{error}
							</div>
						)}

						<div className='space-y-6'>
							{/* Place Name */}
							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2'>
									Place Name <span className='text-red-500'>*</span>
								</label>
								<div className='relative'>
									<Tag
										className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'
										size={20}
									/>
									<input
										type='text'
										name='name'
										value={formData.name}
										onChange={handleChange}
										placeholder='Enter place name'
										className='w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors duration-200'
										required
									/>
								</div>
							</div>

							{/* Location */}
							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2'>
									Location <span className='text-red-500'>*</span>
								</label>
								<div className='relative'>
									<MapPin
										className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'
										size={20}
									/>
									<input
										type='text'
										name='location'
										value={formData.location}
										onChange={handleChange}
										placeholder='City, Country'
										className='w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors duration-200'
										required
									/>
								</div>
							</div>

							{/* Category */}
							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2'>
									Category <span className='text-red-500'>*</span>
								</label>
								<select
									name='category'
									value={formData.category}
									onChange={handleChange}
									className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors duration-200'
									required
								>
									<option value=''>Select a category</option>
									{categories.map(cat => (
										<option key={cat} value={cat}>
											{cat}
										</option>
									))}
								</select>
							</div>

							{/* Description */}
							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
									<FileText size={18} />
									Description
								</label>
								<textarea
									name='description'
									value={formData.description}
									onChange={handleChange}
									placeholder='Describe this place...'
									rows='4'
									className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors duration-200'
								/>
							</div>

							{/* Image Upload */}
							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
									<Image size={18} />
									Place Image
								</label>
								<div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors duration-200'>
									{formData.image ? (
										<div className='relative'>
											<img
												src={formData.image}
												alt='Preview'
												className='max-h-64 mx-auto rounded-lg'
											/>
											<button
												type='button'
												onClick={() => setFormData({ ...formData, image: '' })}
												className='mt-4 text-red-600 hover:text-red-700 font-semibold'
											>
												Remove Image
											</button>
										</div>
									) : (
										<label className='cursor-pointer'>
											<Upload
												className='mx-auto text-gray-400 mb-2'
												size={48}
											/>
											<p className='text-gray-600 mb-2'>
												Click to upload or drag and drop
											</p>
											<p className='text-gray-400 text-sm'>
												PNG, JPG up to 10MB
											</p>
											<input
												type='file'
												accept='image/*'
												onChange={handleImageUpload}
												className='hidden'
											/>
										</label>
									)}
								</div>
							</div>

							{/* Submit Buttons */}
							<div className='flex gap-4 pt-4'>
								<button
									type='button'
									onClick={() => console.log('Cancel')}
									className='flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200'
								>
									Cancel
								</button>
								<button
									onClick={handleSubmit}
									disabled={loading}
									className={`flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center gap-2 ${
										loading ? 'opacity-70 cursor-not-allowed' : ''
									}`}
								>
									{loading ? 'Adding Place...' : 'Add Place'}
									{!loading && <ArrowRight size={20} />}
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Info Card */}
				<div className='bg-blue-50 border border-blue-200 rounded-xl p-6'>
					<h3 className='font-semibold text-blue-800 mb-2'>
						Guidelines for Adding Places
					</h3>
					<ul className='text-blue-700 text-sm space-y-1'>
						<li>• Provide accurate and detailed information</li>
						<li>• Use high-quality images that represent the place</li>
						<li>• Write descriptive text to help visitors</li>
						<li>• Select the most appropriate category</li>
						<li>• Ensure the location information is correct</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
