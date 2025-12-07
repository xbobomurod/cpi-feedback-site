import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider')
	}
	return context
}

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// Check if user is logged in (from localStorage)
		const storedUser = localStorage.getItem('user')
		if (storedUser) {
			setUser(JSON.parse(storedUser))
		}
		setLoading(false)
	}, [])

	const login = userData => {
		setUser(userData)
		localStorage.setItem('user', JSON.stringify(userData))
	}

	const logout = () => {
		setUser(null)
		localStorage.removeItem('user')
	}

	const updateUser = updatedData => {
		const newUserData = { ...user, ...updatedData }
		setUser(newUserData)
		localStorage.setItem('user', JSON.stringify(newUserData))
	}

	const isUser = () => user?.role === 'user'
	const isCompany = () => user?.role === 'company'
	const isAuthenticated = () => !!user

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				login,
				logout,
				updateUser,
				isUser,
				isCompany,
				isAuthenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext
