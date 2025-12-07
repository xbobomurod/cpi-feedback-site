import {
	Filter,
	MapPin,
	Search,
	SlidersHorizontal,
	Star,
	X,
} from 'lucide-react'
import { useState } from 'react'

export default function Explore() {
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('All')
	const [showFilters, setShowFilters] = useState(false)
	const [selectedRating, setSelectedRating] = useState('All')

	const categories = [
		'All',
		'Restaurants',
		'Historical Sites',
		'Parks',
		'Museums',
		'Shopping',
		'Entertainment',
	]

	const places = [
		{
			id: 1,
			name: 'Registan Square',
			location: 'Samarkand, Uzbekistan',
			rating: 4.9,
			reviews: 1250,
			image:
				'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=800&q=80',
			category: 'Historical Sites',
			description:
				'A stunning example of Islamic architecture with three madrasahs',
		},
		{
			id: 2,
			name: 'Chorsu Bazaar',
			location: 'Tashkent, Uzbekistan',
			rating: 4.7,
			reviews: 890,
			image:
				'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
			category: 'Shopping',
			description: 'Traditional market with fresh produce and local crafts',
		},
		{
			id: 3,
			name: 'Amir Timur Museum',
			location: 'Tashkent, Uzbekistan',
			rating: 4.8,
			reviews: 654,
			image:
				'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80',
			category: 'Museums',
			description:
				'Museum dedicated to the history of Amir Timur and his empire',
		},
		{
			id: 4,
			name: 'Alisher Navoi Opera',
			location: 'Tashkent, Uzbekistan',
			rating: 4.9,
			reviews: 720,
			image:
				'https://images.unsplash.com/photo-1580809361436-42a7ec204889?w=800&q=80',
			category: 'Entertainment',
			description:
				'Beautiful opera and ballet theatre with stunning architecture',
		},
		{
			id: 5,
			name: 'Tashkent Tower',
			location: 'Tashkent, Uzbekistan',
			rating: 4.6,
			reviews: 520,
			image:
				'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
			category: 'Entertainment',
			description: 'Tallest tower in Central Asia with panoramic city views',
		},
		{
			id: 6,
			name: 'Japanese Garden',
			location: 'Tashkent, Uzbekistan',
			rating: 4.5,
			reviews: 380,
			image:
				'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800&q=80',
			category: 'Parks',
			description: 'Peaceful garden with traditional Japanese landscaping',
		},
	]

	const filteredPlaces = places.filter(place => {
		const matchesSearch =
			place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			place.location.toLowerCase().includes(searchQuery.toLowerCase())
		const matchesCategory =
			selectedCategory === 'All' || place.category === selectedCategory
		const matchesRating =
			selectedRating === 'All' ||
			(selectedRating === '4.5+' && place.rating >= 4.5) ||
			(selectedRating === '4.0+' && place.rating >= 4.0)
		return matchesSearch && matchesCategory && matchesRating
	})

	return (
		<div className='min-h-screen bg-linear-to-r from-blue-50 via-purple-50 to-pink-50'>
			{/* Header */}
			<div className='bg-linear-to-r from-blue-600 to-purple-600 text-white py-12 px-6'>
				<div className='max-w-7xl mx-auto'>
					<h1 className='text-4xl md:text-5xl font-bold mb-4'>
						Explore Places
					</h1>
					<p className='text-blue-100 text-lg'>
						Discover amazing locations around the world
					</p>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-6 -mt-8'>
				{/* Search and Filter Bar */}
				<div className='bg-white rounded-xl shadow-2xl p-4 md:p-6 mb-8'>
					<div className='flex flex-col md:flex-row gap-4'>
						{/* Search Input */}
						<div className='flex-1 relative'>
							<Search
								className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'
								size={20}
							/>
							<input
								type='text'
								placeholder='Search places, cities, or categories...'
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								className='w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200'
							/>
						</div>

						{/* Filter Button */}
						<button
							onClick={() => setShowFilters(!showFilters)}
							className='bg-linear-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 hover:scale-105 shadow-md flex items-center justify-center gap-2'
						>
							<SlidersHorizontal size={20} />
							Filters
						</button>
					</div>

					{/* Filters Panel */}
					{showFilters && (
						<div className='mt-6 pt-6 border-t border-gray-200'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								{/* Rating Filter */}
								<div>
									<label className='block text-sm font-semibold text-gray-700 mb-3'>
										Minimum Rating
									</label>
									<div className='flex gap-2'>
										{['All', '4.0+', '4.5+'].map(rating => (
											<button
												key={rating}
												onClick={() => setSelectedRating(rating)}
												className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
													selectedRating === rating
														? 'bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-md'
														: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
												}`}
											>
												{rating}
											</button>
										))}
									</div>
								</div>

								{/* Clear Filters */}
								<div className='flex items-end'>
									<button
										onClick={() => {
											setSelectedRating('All')
											setSelectedCategory('All')
											setSearchQuery('')
										}}
										className='text-red-600 hover:text-red-700 font-semibold flex items-center gap-2'
									>
										<X size={18} />
										Clear All Filters
									</button>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Categories */}
				<div className='mb-8'>
					<div className='flex gap-3 overflow-x-auto pb-4 scrollbar-hide'>
						{categories.map(category => (
							<button
								key={category}
								onClick={() => setSelectedCategory(category)}
								className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 ${
									selectedCategory === category
										? 'bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
										: 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
								}`}
							>
								{category}
							</button>
						))}
					</div>
				</div>

				{/* Results Count */}
				<div className='mb-6'>
					<p className='text-gray-600 font-medium'>
						Found{' '}
						<span className='text-purple-600 font-bold'>
							{filteredPlaces.length}
						</span>{' '}
						places
					</p>
				</div>

				{/* Places Grid */}
				{filteredPlaces.length > 0 ? (
					<div className='flex flex-col gap-6 pb-12'>
						{filteredPlaces.map(place => (
							<div
								key={place.id}
								className='bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 group flex flex-col md:flex-row'
							>
								<div className='md:w-1/3 h-64 md:h-auto relative overflow-hidden'>
									<img
										src={place.image}
										alt={place.name}
										className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
									/>
									<div className='absolute top-4 left-4 bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-md'>
										{place.category}
									</div>
								</div>
								<div className='p-6 md:p-8 flex-1 flex flex-col justify-between'>
									<div>
										<h3 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors'>
											{place.name}
										</h3>
										<p className='text-gray-600 mb-3 flex items-center gap-2'>
											<MapPin size={18} />
											{place.location}
										</p>
										<p className='text-gray-600 mb-4'>{place.description}</p>
									</div>
									<div className='flex items-center justify-between'>
										<div className='flex items-center gap-2'>
											<Star
												size={20}
												className='text-yellow-500 fill-yellow-500'
											/>
											<span className='font-bold text-xl text-gray-800'>
												{place.rating}
											</span>
											<span className='text-gray-500'>
												({place.reviews} reviews)
											</span>
										</div>
										<button className='bg-linear-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 hover:scale-105 shadow-md'>
											View Details
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className='text-center py-16'>
						<div className='text-gray-400 mb-4'>
							<Filter size={64} className='mx-auto' />
						</div>
						<h3 className='text-2xl font-bold text-gray-800 mb-2'>
							No places found
						</h3>
						<p className='text-gray-600 mb-6'>
							Try adjusting your filters or search query
						</p>
						<button
							onClick={() => {
								setSelectedRating('All')
								setSelectedCategory('All')
								setSearchQuery('')
							}}
							className='bg-linear-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 hover:scale-105 shadow-lg'
						>
							Clear Filters
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
