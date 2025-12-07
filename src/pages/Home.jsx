import {
	ArrowRight,
	MapPin,
	Search,
	Star,
	TrendingUp,
	Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
	const featuredPlaces = [
		{
			id: 1,
			name: 'Registan Square',
			location: 'Samarkand, Uzbekistan',
			rating: 4.9,
			reviews: 1250,
			image:
				'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=800&q=80',
			category: 'Historical',
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
		},
		{
			id: 3,
			name: 'Amir Timur Museum',
			location: 'Tashkent, Uzbekistan',
			rating: 4.8,
			reviews: 654,
			image:
				'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80',
			category: 'Museum',
		},
	]

	const categories = [
		{ name: 'Restaurants', icon: '🍽️', count: 234 },
		{ name: 'Historical Sites', icon: '🏛️', count: 156 },
		{ name: 'Parks', icon: '🌳', count: 89 },
		{ name: 'Museums', icon: '🎨', count: 67 },
		{ name: 'Shopping', icon: '🛍️', count: 198 },
		{ name: 'Entertainment', icon: '🎭', count: 145 },
	]

	const stats = [
		{ label: 'Places', value: '10K+', icon: MapPin },
		{ label: 'Reviews', value: '50K+', icon: Star },
		{ label: 'Active Users', value: '5K+', icon: Users },
		{ label: 'Cities', value: '100+', icon: TrendingUp },
	]

	return (
		<div className='min-h-screen bg-linear-to-r from-blue-50 via-purple-50 to-pink-50'>
			{/* Hero Section */}
			<div className='relative overflow-hidden bg-linear-to-r from-blue-600 to-purple-600 text-white'>
				<div className='absolute inset-0 bg-black opacity-10'></div>
				<div className='relative max-w-7xl mx-auto px-6 py-20 md:py-28'>
					<div className='text-center'>
						<h1 className='text-4xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700'>
							Discover Amazing Places
						</h1>
						<p className='text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150'>
							Explore, rate, and share your favorite locations with a community
							of travelers and locals
						</p>

						{/* Search Bar */}
						<div className='max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300'>
							<div className='bg-white rounded-full shadow-2xl p-2 flex items-center gap-2'>
								<Search className='ml-4 text-gray-400' size={20} />
								<input
									type='text'
									placeholder='Search for places, restaurants, museums...'
									className='flex-1 px-4 py-3 bg-transparent text-gray-800 outline-none'
								/>
								<button className='bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg'>
									Search
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Wave Divider */}
				<div className='absolute bottom-0 left-0 right-0'>
					<svg
						viewBox='0 0 1440 120'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z'
							fill='#EFF6FF'
						/>
					</svg>
				</div>
			</div>

			{/* Stats Section */}
			<div className='max-w-7xl mx-auto px-6 -mt-8 relative z-10'>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
					{stats.map((stat, index) => (
						<div
							key={index}
							className='bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in zoom-in duration-700'
							style={{ animationDelay: `${index * 100 + 500}ms` }}
						>
							<stat.icon className='mx-auto mb-2 text-purple-600' size={28} />
							<h3 className='text-3xl font-bold text-gray-800 mb-1'>
								{stat.value}
							</h3>
							<p className='text-gray-600 text-sm'>{stat.label}</p>
						</div>
					))}
				</div>
			</div>

			{/* Categories Section */}
			<div className='max-w-7xl mx-auto px-6 py-16'>
				<h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
					Browse by Category
				</h2>
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
					{categories.map((category, index) => (
						<div
							key={index}
							className='bg-white rounded-xl shadow-md p-6 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group'
						>
							<div className='text-4xl mb-3 group-hover:scale-110 transition-transform duration-300'>
								{category.icon}
							</div>
							<h3 className='font-semibold text-gray-800 mb-1'>
								{category.name}
							</h3>
							<p className='text-sm text-gray-500'>{category.count} places</p>
						</div>
					))}
				</div>
			</div>

			{/* Featured Places */}
			<div className='max-w-7xl mx-auto px-6 py-16'>
				<div className='flex items-center justify-between mb-8'>
					<h2 className='text-3xl font-bold text-gray-800'>Featured Places</h2>

					<Link
						to='/explore'
						className='text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-2 group'
					>
						View All
						<ArrowRight
							size={20}
							className='group-hover:translate-x-1 transition-transform'
						/>
					</Link>
				</div>

				<div className='flex flex-col gap-6'>
					{featuredPlaces.map(place => (
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
									<h3 className='text-2xl md:text-3xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors'>
										{place.name}
									</h3>
									<p className='text-gray-600 text-base mb-4 flex items-center gap-2'>
										<MapPin size={18} />
										{place.location}
									</p>
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
			</div>

			{/* CTA Section */}
			{/* <div className='max-w-7xl mx-auto px-6 py-16'>
				<div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-center text-white relative overflow-hidden'>
					<div className='absolute inset-0 bg-black opacity-10'></div>
					<div className='relative z-10'>
						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
							Share Your Favorite Places
						</h2>
						<p className='text-blue-100 text-lg mb-8 max-w-2xl mx-auto'>
							Join our community and help others discover amazing locations
							around the world
						</p>
						<button className='bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg'>
							Get Started Now
						</button>
					</div>
				</div>
			</div> */}
		</div>
	)
}
