import { Building2, Edit, FileText, Mail, MapPin, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PlaceCard from '../components/PlaceCard'
import { useAuth } from '../context/AuthContext'
import { companyAPI, placeAPI } from '../services/api'

export default function CompanyProfile() {
	const { user, updateUser } = useAuth()
	const navigate = useNavigate()
	const [isEditing, setIsEditing] = useState(false)
	const [loading, setLoading] = useState(false)
	const [places, setPlaces] = useState([])
	const [formData, setFormData] = useState({
		name: user?.name || '',
		email: user?.email || '',
		address: '',
		description: '',
	})

	useEffect(() => {
		fetchCompanyData()
	}, [])

	const fetchCompanyData = async () => {
		try {
			setLoading(true)
			const [profileData, placesData] = await Promise.all([
				companyAPI.getProfile(user.id),
				companyAPI.getPlaces(user.id),
			])

			setFormData({
				name: profileData.name,
				email: profileData.email,
				address: profileData.address || '',
				description: profileData.description || '',
			})

			setPlaces(placesData)
		} catch (error) {
			console.error('Failed to fetch company data:', error)
			// Mock data for demo
			setPlaces([
				{
					id: 1,
					name: 'Registan Square',
					location: 'Samarkand, Uzbekistan',
					rating: 4.9,
					reviews: 1250,
					image:
						'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=800&q=80',
					category: 'Historical',
					description: 'A stunning example of Islamic architecture',
				},
				{
					id: 2,
					name: 'Chorsu Bazaar',
					location: 'Tashkent, Uzbekistan',
					rating: 4.7,
					reviews: 890,
					image:
						'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
					category: 'Market',
					description: 'Traditional market with fresh produce',
				},
			])
		} finally {
			setLoading(false)
		}
	}

	const handleSaveProfile = async () => {
		try {
			setLoading(true)
			await companyAPI.updateProfile(user.id, formData)
			updateUser({ name: formData.name, email: formData.email })
			setIsEditing(false)
		} catch (error) {
			console.error('Failed to update profile:', error)
		} finally {
			setLoading(false)
		}
	}

	const handleEditPlace = place => {
		console.log('Edit place:', place)
		// Navigate to edit page
	}

	const handleDeletePlace = async placeId => {
		if (!confirm('Are you sure you want to delete this place?')) return

		try {
			await placeAPI.delete(placeId)
			setPlaces(places.filter(p => p.id !== placeId))
		} catch (error) {
			console.error('Failed to delete place:', error)
		}
	}

	const getInitials = name => {
		return (
			name
				?.split(' ')
				.map(n => n[0])
				.join('')
				.toUpperCase() || 'C'
		)
	}
	const handleAddPlace = path => {
		navigate(path)
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4'>
			<div className='max-w-6xl mx-auto'>
				{/* Profile Header Card */}
				<div className='bg-white rounded-2xl shadow-2xl overflow-hidden mb-8'>
					<div className='bg-gradient-to-r from-blue-600 to-purple-600 h-32'></div>
					<div className='px-8 pb-8 -mt-16'>
						<div className='flex flex-col md:flex-row items-center md:items-end gap-6'>
							{/* Logo */}
							<div className='w-32 h-32 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold text-4xl border-4 border-white shadow-xl'>
								{getInitials(user?.name)}
							</div>

							<div className='flex-1 text-center md:text-left'>
								{isEditing ? (
									<input
										type='text'
										value={formData.name}
										onChange={e =>
											setFormData({ ...formData, name: e.target.value })
										}
										className='text-3xl font-bold text-gray-800 mb-2 border-2 border-purple-300 rounded-lg px-3 py-1 w-full md:w-auto'
									/>
								) : (
									<h1 className='text-3xl font-bold text-gray-800 mb-2'>
										{formData.name}
									</h1>
								)}

								<div className='space-y-2 mb-3'>
									<p className='text-gray-600 flex items-center justify-center md:justify-start gap-2'>
										<Mail size={18} />
										{isEditing ? (
											<input
												type='email'
												value={formData.email}
												onChange={e =>
													setFormData({ ...formData, email: e.target.value })
												}
												className='border-2 border-purple-300 rounded-lg px-3 py-1'
											/>
										) : (
											formData.email
										)}
									</p>

									{(isEditing || formData.address) && (
										<p className='text-gray-600 flex items-center justify-center md:justify-start gap-2'>
											<MapPin size={18} />
											{isEditing ? (
												<input
													type='text'
													value={formData.address}
													onChange={e =>
														setFormData({
															...formData,
															address: e.target.value,
														})
													}
													placeholder='Company address'
													className='border-2 border-purple-300 rounded-lg px-3 py-1'
												/>
											) : (
												formData.address
											)}
										</p>
									)}
								</div>

								<span className='inline-block bg-emerald-100 text-emerald-600 px-4 py-1 rounded-full text-sm font-semibold'>
									Company Account
								</span>
							</div>

							<button
								onClick={() => {
									if (isEditing) {
										handleSaveProfile()
									} else {
										setIsEditing(true)
									}
								}}
								disabled={loading}
								className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2'
							>
								<Edit size={18} />
								{isEditing
									? loading
										? 'Saving...'
										: 'Save Profile'
									: 'Edit Profile'}
							</button>
						</div>

						{/* Description */}
						{(isEditing || formData.description) && (
							<div className='mt-6'>
								<h3 className='font-semibold text-gray-700 mb-2 flex items-center gap-2'>
									<FileText size={18} />
									About Company
								</h3>
								{isEditing ? (
									<textarea
										value={formData.description}
										onChange={e =>
											setFormData({ ...formData, description: e.target.value })
										}
										placeholder='Tell us about your company...'
										className='w-full border-2 border-purple-300 rounded-lg px-4 py-3 min-h-24'
									/>
								) : (
									<p className='text-gray-600'>{formData.description}</p>
								)}
							</div>
						)}
					</div>
				</div>

				{/* Stats Card */}
				<div className='bg-white rounded-xl shadow-lg p-6 mb-8'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center'>
						<div>
							<Building2 className='mx-auto mb-2 text-purple-500' size={32} />
							<h3 className='text-3xl font-bold text-gray-800'>
								{places.length}
							</h3>
							<p className='text-gray-600'>Total Places</p>
						</div>
						<div>
							<MapPin className='mx-auto mb-2 text-blue-500' size={32} />
							<h3 className='text-3xl font-bold text-gray-800'>
								{places.reduce((sum, p) => sum + (p.reviews || 0), 0)}
							</h3>
							<p className='text-gray-600'>Total Reviews</p>
						</div>
						<div>
							<FileText className='mx-auto mb-2 text-emerald-500' size={32} />
							<h3 className='text-3xl font-bold text-gray-800'>
								{places.length > 0
									? (
											places.reduce((sum, p) => sum + (p.rating || 0), 0) /
											places.length
									  ).toFixed(1)
									: '0.0'}
							</h3>
							<p className='text-gray-600'>Average Rating</p>
						</div>
					</div>
				</div>

				{/* My Places */}
				<div className='bg-white rounded-xl shadow-lg p-8'>
					<div className='flex justify-between items-center mb-6'>
						<h2 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
							<Building2 className='text-purple-500' />
							My Places
						</h2>
						<button
							onClick={() => handleAddPlace('/add-place')}
							className='bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2'
						>
							<Plus size={20} />
							Add New Place
						</button>
					</div>

					{loading ? (
						<p className='text-gray-500 text-center py-8'>Loading places...</p>
					) : places.length > 0 ? (
						<div className='flex flex-col gap-6'>
							{places.map(place => (
								<PlaceCard
									key={place.id}
									place={place}
									showActions={true}
									onEdit={handleEditPlace}
									onDelete={handleDeletePlace}
								/>
							))}
						</div>
					) : (
						<div className='text-center py-12'>
							<Building2 className='mx-auto text-gray-300 mb-4' size={64} />
							<h3 className='text-xl font-bold text-gray-800 mb-2'>
								No places yet
							</h3>
							<p className='text-gray-500 mb-6'>
								Start adding places to showcase your business
							</p>
							<button
								onClick={handleAddPlace}
								className='bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 hover:scale-105 shadow-lg inline-flex items-center gap-2'
							>
								<Plus size={20} />
								Add Your First Place
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
