import { Calendar, Edit, Mail, MessageSquare, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { userAPI } from '../services/api'

export default function UserProfile() {
	const { user, updateUser } = useAuth()
	const [isEditing, setIsEditing] = useState(false)
	const [loading, setLoading] = useState(false)
	const [ratings, setRatings] = useState([])
	const [comments, setComments] = useState([])
	const [formData, setFormData] = useState({
		name: user?.name || '',
		email: user?.email || '',
		bio: '',
	})

	useEffect(() => {
		fetchUserData()
	}, [])

	const fetchUserData = async () => {
		try {
			setLoading(true)
			const [ratingsData, commentsData] = await Promise.all([
				userAPI.getUserRatings(user.id),
				userAPI.getUserComments(user.id),
			])
			setRatings(ratingsData)
			setComments(commentsData)
		} catch (error) {
			console.error('Failed to fetch user data:', error)
		} finally {
			setLoading(false)
		}
	}

	const handleSaveProfile = async () => {
		try {
			setLoading(true)
			await userAPI.updateProfile(user.id, formData)
			updateUser({ name: formData.name, email: formData.email })
			setIsEditing(false)
		} catch (error) {
			console.error('Failed to update profile:', error)
		} finally {
			setLoading(false)
		}
	}

	const getInitials = name => {
		return (
			name
				?.split(' ')
				.map(n => n[0])
				.join('')
				.toUpperCase() || 'U'
		)
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4'>
			<div className='max-w-5xl mx-auto'>
				{/* Profile Header Card */}
				<div className='bg-white rounded-2xl shadow-2xl overflow-hidden mb-8'>
					<div className='bg-gradient-to-r from-blue-600 to-purple-600 h-32'></div>
					<div className='px-8 pb-8 -mt-16'>
						<div className='flex flex-col md:flex-row items-center md:items-end gap-6'>
							{/* Avatar */}
							<div className='w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-4xl border-4 border-white shadow-xl'>
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
										{user?.name}
									</h1>
								)}
								<p className='text-gray-600 flex items-center justify-center md:justify-start gap-2 mb-2'>
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
										user?.email
									)}
								</p>
								<span className='inline-block bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-semibold'>
									User Account
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
					</div>
				</div>

				{/* Stats Cards */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
					<div className='bg-white rounded-xl shadow-lg p-6 text-center'>
						<Star className='mx-auto mb-2 text-yellow-500' size={32} />
						<h3 className='text-3xl font-bold text-gray-800'>
							{ratings.length}
						</h3>
						<p className='text-gray-600'>Ratings Given</p>
					</div>
					<div className='bg-white rounded-xl shadow-lg p-6 text-center'>
						<MessageSquare className='mx-auto mb-2 text-blue-500' size={32} />
						<h3 className='text-3xl font-bold text-gray-800'>
							{comments.length}
						</h3>
						<p className='text-gray-600'>Comments Written</p>
					</div>
					<div className='bg-white rounded-xl shadow-lg p-6 text-center'>
						<Calendar className='mx-auto mb-2 text-purple-500' size={32} />
						<h3 className='text-3xl font-bold text-gray-800'>2024</h3>
						<p className='text-gray-600'>Member Since</p>
					</div>
				</div>

				{/* My Ratings */}
				<div className='bg-white rounded-xl shadow-lg p-8 mb-8'>
					<h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
						<Star className='text-yellow-500' />
						My Ratings
					</h2>
					{loading ? (
						<p className='text-gray-500 text-center py-8'>Loading ratings...</p>
					) : ratings.length > 0 ? (
						<div className='space-y-4'>
							{ratings.map(rating => (
								<div
									key={rating.id}
									className='border-b border-gray-200 pb-4 last:border-0'
								>
									<div className='flex justify-between items-start mb-2'>
										<h3 className='font-bold text-gray-800'>
											{rating.placeName}
										</h3>
										<div className='flex items-center gap-1'>
											{[...Array(5)].map((_, i) => (
												<Star
													key={i}
													size={16}
													className={
														i < rating.rating
															? 'text-yellow-500 fill-yellow-500'
															: 'text-gray-300'
													}
												/>
											))}
										</div>
									</div>
									<p className='text-gray-600 text-sm'>{rating.date}</p>
								</div>
							))}
						</div>
					) : (
						<div className='text-center py-8'>
							<Star className='mx-auto text-gray-300 mb-3' size={48} />
							<p className='text-gray-500'>
								No ratings yet. Start exploring and rate places!
							</p>
						</div>
					)}
				</div>

				{/* My Comments */}
				<div className='bg-white rounded-xl shadow-lg p-8'>
					<h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
						<MessageSquare className='text-blue-500' />
						My Comments
					</h2>
					{loading ? (
						<p className='text-gray-500 text-center py-8'>
							Loading comments...
						</p>
					) : comments.length > 0 ? (
						<div className='space-y-4'>
							{comments.map(comment => (
								<div
									key={comment.id}
									className='border-b border-gray-200 pb-4 last:border-0'
								>
									<h3 className='font-bold text-gray-800 mb-2'>
										{comment.placeName}
									</h3>
									<p className='text-gray-700 mb-2'>{comment.text}</p>
									<p className='text-gray-500 text-sm'>{comment.date}</p>
								</div>
							))}
						</div>
					) : (
						<div className='text-center py-8'>
							<MessageSquare className='mx-auto text-gray-300 mb-3' size={48} />
							<p className='text-gray-500'>
								No comments yet. Share your thoughts about places!
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
