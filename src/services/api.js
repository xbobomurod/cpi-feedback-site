const API_BASE_URL = 'http://localhost:3000/api'

// Auth APIs
export const authAPI = {
	// User login
	loginUser: async (email, password) => {
		const response = await fetch(`${API_BASE_URL}/auth/user/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		})
		if (!response.ok) throw new Error('Login failed')
		return response.json()
	},

	// Company login
	loginCompany: async (email, password) => {
		const response = await fetch(`${API_BASE_URL}/auth/company/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		})
		if (!response.ok) throw new Error('Login failed')
		return response.json()
	},

	// User register
	registerUser: async data => {
		const response = await fetch(`${API_BASE_URL}/auth/user/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
		if (!response.ok) throw new Error('Registration failed')
		return response.json()
	},

	// Company register
	registerCompany: async data => {
		const response = await fetch(`${API_BASE_URL}/auth/company/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
		if (!response.ok) throw new Error('Registration failed')
		return response.json()
	},
}

// User APIs
export const userAPI = {
	// Get user profile
	getProfile: async userId => {
		const response = await fetch(`${API_BASE_URL}/users/${userId}`)
		if (!response.ok) throw new Error('Failed to fetch profile')
		return response.json()
	},

	// Update user profile
	updateProfile: async (userId, data) => {
		const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
		if (!response.ok) throw new Error('Failed to update profile')
		return response.json()
	},

	// Get user ratings
	getUserRatings: async userId => {
		const response = await fetch(`${API_BASE_URL}/users/${userId}/ratings`)
		if (!response.ok) throw new Error('Failed to fetch ratings')
		return response.json()
	},

	// Get user comments
	getUserComments: async userId => {
		const response = await fetch(`${API_BASE_URL}/users/${userId}/comments`)
		if (!response.ok) throw new Error('Failed to fetch comments')
		return response.json()
	},
}

// Company APIs
export const companyAPI = {
	// Get company profile
	getProfile: async companyId => {
		const response = await fetch(`${API_BASE_URL}/companies/${companyId}`)
		if (!response.ok) throw new Error('Failed to fetch profile')
		return response.json()
	},

	// Update company profile
	updateProfile: async (companyId, data) => {
		const response = await fetch(`${API_BASE_URL}/companies/${companyId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
		if (!response.ok) throw new Error('Failed to update profile')
		return response.json()
	},

	// Get company places
	getPlaces: async companyId => {
		const response = await fetch(
			`${API_BASE_URL}/companies/${companyId}/places`
		)
		if (!response.ok) throw new Error('Failed to fetch places')
		return response.json()
	},
}

// Place APIs
export const placeAPI = {
	// Get all places
	getAll: async (filters = {}) => {
		const query = new URLSearchParams(filters).toString()
		const response = await fetch(`${API_BASE_URL}/places?${query}`)
		if (!response.ok) throw new Error('Failed to fetch places')
		return response.json()
	},

	// Get single place
	getById: async placeId => {
		const response = await fetch(`${API_BASE_URL}/places/${placeId}`)
		if (!response.ok) throw new Error('Failed to fetch place')
		return response.json()
	},

	// Create place (Company only)
	create: async data => {
		const response = await fetch(`${API_BASE_URL}/places`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
		if (!response.ok) throw new Error('Failed to create place')
		return response.json()
	},

	// Update place (Company only)
	update: async (placeId, data) => {
		const response = await fetch(`${API_BASE_URL}/places/${placeId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
		if (!response.ok) throw new Error('Failed to update place')
		return response.json()
	},

	// Delete place (Company only)
	delete: async placeId => {
		const response = await fetch(`${API_BASE_URL}/places/${placeId}`, {
			method: 'DELETE',
		})
		if (!response.ok) throw new Error('Failed to delete place')
		return response.json()
	},

	// Add rating
	addRating: async (placeId, rating, userId) => {
		const response = await fetch(`${API_BASE_URL}/places/${placeId}/ratings`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ rating, userId }),
		})
		if (!response.ok) throw new Error('Failed to add rating')
		return response.json()
	},

	// Add comment
	addComment: async (placeId, comment, userId) => {
		const response = await fetch(`${API_BASE_URL}/places/${placeId}/comments`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ comment, userId }),
		})
		if (!response.ok) throw new Error('Failed to add comment')
		return response.json()
	},
}
