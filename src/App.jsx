import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import './index.css'

import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import AddPlace from './pages/AddPlace'
import CompanyProfile from './pages/CompanyProfile'
import Explore from './pages/Explore'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'

// Router to show correct profile based on user role
import { useAuth } from './context/AuthContext'

const ProfileRouter = () => {
	const { isCompany } = useAuth()
	return isCompany() ? <CompanyProfile /> : <UserProfile />
}

function App() {
	return (
		<Router>
			<AuthProvider>
				<Navbar />
				<Routes>
					{/* Public Routes */}
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Register />} />
					<Route path='/explore' element={<Explore />} />

					{/* Protected Routes - Login required */}
					<Route
						path='/profile'
						element={
							<ProtectedRoute>
								<ProfileRouter />
							</ProtectedRoute>
						}
					/>

					{/* Protected Routes - Company only */}
					<Route
						path='/add-place'
						element={
							<ProtectedRoute requireCompany={true}>
								<AddPlace />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</AuthProvider>
		</Router>
	)
}

export default App
