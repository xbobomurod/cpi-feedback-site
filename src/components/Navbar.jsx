import { Compass, LogOut, Menu, Plus, Settings, User, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
	const [loggedIn, setLoggedIn] = useState(false)
	const [menuOpen, setMenuOpen] = useState(false)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const menuRef = useRef(null)

	const handleNavigation = path => {
		console.log(`Navigating to: ${path}`)
		setMobileMenuOpen(false)
	}

	// Menyu tashqarisiga bosilganda yopish
	useEffect(() => {
		const handleClickOutside = event => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setMenuOpen(false)
			}
		}

		if (menuOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [menuOpen])

	// Mobile menu ochiq bo'lganda scroll bloklash
	useEffect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
	}, [mobileMenuOpen])

	return (
		<>
			<nav className='w-full bg-white shadow-lg px-4 md:px-6 py-4 flex items-center justify-between relative z-50'>
				{/* Logo */}
				<a
					href='/'
					onClick={e => {
						e.preventDefault()
						handleNavigation('/')
					}}
					className='flex items-center gap-2 cursor-pointer group'
				>
					<div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
						<span className='text-white font-bold text-xl'>PR</span>
					</div>
					<h1 className='text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
						Place Rank
					</h1>
				</a>

				{/* Desktop Nav links */}
				<div className='hidden md:flex items-center gap-4'>
					<a
						href='/explore'
						onClick={e => {
							e.preventDefault()
							handleNavigation('/explore')
						}}
						className='text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-purple-50 cursor-pointer flex items-center gap-2'
					>
						<Compass size={18} />
						Explore
					</a>

					{!loggedIn ? (
						<>
							<a
								href='/login'
								onClick={e => {
									e.preventDefault()
									handleNavigation('/login')
								}}
								className='text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-purple-50 cursor-pointer'
							>
								Login
							</a>
							<a
								href='/signup'
								onClick={e => {
									e.preventDefault()
									handleNavigation('/signup')
								}}
								className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium cursor-pointer hover:scale-105'
							>
								Sign Up
							</a>
						</>
					) : (
						<>
							{/* Add Place */}
							<a
								href='/add-place'
								onClick={e => {
									e.preventDefault()
									handleNavigation('/add-place')
								}}
								className='bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium flex items-center gap-2 cursor-pointer hover:scale-105'
							>
								<Plus size={18} />
								Add Place
							</a>

							{/* Profile Dropdown */}
							<div className='relative' ref={menuRef}>
								<button
									onClick={() => setMenuOpen(!menuOpen)}
									className='w-11 h-11 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110'
								>
									B
								</button>

								{menuOpen && (
									<div className='absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200'>
										<div className='flex items-center gap-3 mb-3'>
											<div className='w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold'>
												B
											</div>
											<div>
												<p className='font-semibold text-gray-800'>Bob Uz</p>
												<p className='text-sm text-gray-500'>bob@gmail.com</p>
											</div>
										</div>
										<hr className='my-3 border-gray-200' />
										<a
											href='/profile'
											onClick={e => {
												e.preventDefault()
												handleNavigation('/profile')
											}}
											className='flex items-center gap-3 w-full text-left py-2 px-3 hover:bg-purple-50 text-gray-700 hover:text-purple-600 rounded-lg transition-colors duration-150 font-medium cursor-pointer'
										>
											<User size={18} />
											Profile
										</a>
										<a
											href='/settings'
											onClick={e => {
												e.preventDefault()
												handleNavigation('/settings')
											}}
											className='flex items-center gap-3 w-full text-left py-2 px-3 hover:bg-purple-50 text-gray-700 hover:text-purple-600 rounded-lg transition-colors duration-150 font-medium cursor-pointer'
										>
											<Settings size={18} />
											Settings
										</a>
										<hr className='my-2 border-gray-200' />
										<button
											className='flex items-center gap-3 w-full text-left py-2 px-3 hover:bg-red-50 text-red-600 rounded-lg transition-colors duration-150 font-medium'
											onClick={() => {
												setLoggedIn(false)
												setMenuOpen(false)
											}}
										>
											<LogOut size={18} />
											Sign Out
										</button>
									</div>
								)}
							</div>
						</>
					)}
				</div>

				{/* Mobile Menu Button */}
				<button
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					className='md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-purple-50 transition-colors duration-200'
				>
					{mobileMenuOpen ? (
						<X size={24} className='text-gray-700' />
					) : (
						<Menu size={24} className='text-gray-700' />
					)}
				</button>
			</nav>

			{/* Mobile Menu Overlay */}
			{mobileMenuOpen && (
				<div
					className='fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden'
					onClick={() => setMobileMenuOpen(false)}
				/>
			)}

			{/* Mobile Menu */}
			<div
				className={`fixed top-[72px] right-0 h-[calc(100vh-72px)] w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
					mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<div className='p-6 flex flex-col gap-4 h-full'>
					{loggedIn && (
						<div className='flex items-center gap-3 pb-4 border-b border-gray-200'>
							<div className='w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-xl'>
								B
							</div>
							<div>
								<p className='font-semibold text-gray-800'>Bob Uz</p>
								<p className='text-sm text-gray-500'>bob@gmail.com</p>
							</div>
						</div>
					)}

					<div className='flex flex-col gap-2'>
						<a
							href='/explore'
							onClick={e => {
								e.preventDefault()
								handleNavigation('/explore')
							}}
							className='flex items-center gap-3 text-gray-700 hover:text-purple-600 font-medium transition-all duration-200 px-4 py-3 rounded-lg hover:bg-purple-50 cursor-pointer'
						>
							<Compass size={20} />
							Explore
						</a>

						{loggedIn ? (
							<>
								<a
									href='/add-place'
									onClick={e => {
										e.preventDefault()
										handleNavigation('/add-place')
									}}
									className='flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium px-4 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md cursor-pointer'
								>
									<Plus size={20} />
									Add Place
								</a>

								<hr className='my-2 border-gray-200' />

								<a
									href='/profile'
									onClick={e => {
										e.preventDefault()
										handleNavigation('/profile')
									}}
									className='flex items-center gap-3 text-gray-700 hover:text-purple-600 font-medium transition-all duration-200 px-4 py-3 rounded-lg hover:bg-purple-50 cursor-pointer'
								>
									<User size={20} />
									Profile
								</a>

								<a
									href='/settings'
									onClick={e => {
										e.preventDefault()
										handleNavigation('/settings')
									}}
									className='flex items-center gap-3 text-gray-700 hover:text-purple-600 font-medium transition-all duration-200 px-4 py-3 rounded-lg hover:bg-purple-50 cursor-pointer'
								>
									<Settings size={20} />
									Settings
								</a>

								<hr className='my-2 border-gray-200' />

								<button
									onClick={() => {
										setLoggedIn(false)
										setMobileMenuOpen(false)
									}}
									className='flex items-center gap-3 text-red-600 font-medium transition-all duration-200 px-4 py-3 rounded-lg hover:bg-red-50 cursor-pointer'
								>
									<LogOut size={20} />
									Sign Out
								</button>
							</>
						) : (
							<>
								<a
									href='/login'
									onClick={e => {
										e.preventDefault()
										handleNavigation('/login')
									}}
									className='text-gray-700 hover:text-purple-600 font-medium transition-all duration-200 px-4 py-3 rounded-lg hover:bg-purple-50 cursor-pointer text-center'
								>
									Login
								</a>
								<a
									href='/signup'
									onClick={e => {
										e.preventDefault()
										handleNavigation('/signup')
									}}
									className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md font-medium cursor-pointer text-center'
								>
									Sign Up
								</a>
							</>
						)}
					</div>
				</div>
			</div>

			{/* Temporary Test Button
			<div className='p-4 flex justify-center'>
				<button
					onClick={() => setLoggedIn(!loggedIn)}
					className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105'
				>
					{loggedIn ? '🔓 Test Logout' : '🔐 Test Login'}
				</button>
			</div> */}
		</>
	)
}
