import { Edit, MapPin, Star, Trash2 } from 'lucide-react'

export default function PlaceCard({
	place,
	onEdit,
	onDelete,
	showActions = false,
}) {
	return (
		<div className='bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 group flex flex-col md:flex-row'>
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
					{place.description && (
						<p className='text-gray-600 mb-4'>{place.description}</p>
					)}
				</div>

				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<Star size={20} className='text-yellow-500 fill-yellow-500' />
						<span className='font-bold text-xl text-gray-800'>
							{place.rating}
						</span>
						<span className='text-gray-500'>({place.reviews} reviews)</span>
					</div>

					{showActions ? (
						<div className='flex items-center gap-2'>
							<button
								onClick={() => onEdit(place)}
								className='bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-md flex items-center gap-2'
							>
								<Edit size={18} />
								Edit
							</button>
							<button
								onClick={() => onDelete(place.id)}
								className='bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 hover:scale-105 shadow-md flex items-center gap-2'
							>
								<Trash2 size={18} />
								Delete
							</button>
						</div>
					) : (
						<button className='bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 hover:scale-105 shadow-md'>
							View Details
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
