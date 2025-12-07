// src/data/mockData.js

// Default User Profile Data
export const defaultUserProfile = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'user',
  avatar: null,
  bio: 'Travel enthusiast and food lover. Always exploring new places!',
  joinDate: '2024-01-15',
  location: 'Tashkent, Uzbekistan',
  
  // User statistics
  stats: {
    ratingsCount: 12,
    commentsCount: 8,
    placesVisited: 25
  },

  // User ratings
  ratings: [
    {
      id: 1,
      placeId: 1,
      placeName: 'Registan Square',
      placeImage: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=400&q=80',
      rating: 5,
      date: '2024-11-20',
      location: 'Samarkand, Uzbekistan'
    },
    {
      id: 2,
      placeId: 2,
      placeName: 'Chorsu Bazaar',
      placeImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80',
      rating: 4,
      date: '2024-11-15',
      location: 'Tashkent, Uzbekistan'
    },
    {
      id: 3,
      placeId: 3,
      placeName: 'Amir Timur Museum',
      placeImage: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&q=80',
      rating: 5,
      date: '2024-11-10',
      location: 'Tashkent, Uzbekistan'
    }
  ],

  // User comments
  comments: [
    {
      id: 1,
      placeId: 1,
      placeName: 'Registan Square',
      text: 'Absolutely stunning architecture! The best place to visit in Samarkand. The blue tiles are mesmerizing, especially during sunset.',
      date: '2024-11-20',
      likes: 15
    },
    {
      id: 2,
      placeId: 2,
      placeName: 'Chorsu Bazaar',
      text: 'Great place to experience local culture and buy fresh produce. The vendors are very friendly!',
      date: '2024-11-15',
      likes: 8
    },
    {
      id: 3,
      placeId: 3,
      placeName: 'Amir Timur Museum',
      text: 'Very informative museum with great historical artifacts. Learned a lot about Uzbek history.',
      date: '2024-11-10',
      likes: 12
    }
  ]
};

// Default Company Profile Data
export const defaultCompanyProfile = {
  id: 2,
  name: 'Heritage Tours Uzbekistan',
  email: 'info@heritagetours.uz',
  role: 'company',
  logo: null,
  description: 'Leading tourism company in Uzbekistan, specializing in cultural and historical tours. We showcase the best places in Central Asia.',
  address: '123 Amir Timur Street, Tashkent, Uzbekistan',
  phone: '+998 71 123 4567',
  website: 'www.heritagetours.uz',
  joinDate: '2023-05-10',
  verified: true,

  // Company statistics
  stats: {
    totalPlaces: 6,
    totalReviews: 245,
    averageRating: 4.7,
    totalViews: 15420
  },

  // Company places
  places: [
    {
      id: 1,
      name: 'Registan Square',
      location: 'Samarkand, Uzbekistan',
      rating: 4.9,
      reviews: 1250,
      image: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=800&q=80',
      category: 'Historical Sites',
      description: 'A stunning example of Islamic architecture with three madrasahs - Ulugbek, Tilya-Kori, and Sher-Dor. One of the most iconic landmarks in Central Asia.',
      views: 5420,
      createdAt: '2023-06-15'
    },
    {
      id: 2,
      name: 'Chorsu Bazaar',
      location: 'Tashkent, Uzbekistan',
      rating: 4.7,
      reviews: 890,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      category: 'Shopping',
      description: 'Traditional market with fresh produce, spices, dried fruits, and local crafts. A must-visit for experiencing authentic Uzbek culture.',
      views: 3200,
      createdAt: '2023-07-20'
    },
    {
      id: 3,
      name: 'Amir Timur Museum',
      location: 'Tashkent, Uzbekistan',
      rating: 4.8,
      reviews: 654,
      image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80',
      category: 'Museums',
      description: 'Museum dedicated to the history of Amir Timur and his empire. Features historical artifacts, documents, and interactive exhibits.',
      views: 2100,
      createdAt: '2023-08-10'
    },
    {
      id: 4,
      name: 'Shah-i-Zinda Necropolis',
      location: 'Samarkand, Uzbekistan',
      rating: 4.9,
      reviews: 980,
      image: 'https://images.unsplash.com/photo-1581974206650-2e99c5f5c3e5?w=800&q=80',
      category: 'Historical Sites',
      description: 'Ancient necropolis featuring stunning mausoleums with intricate tile work. One of the most sacred sites in Uzbekistan.',
      views: 2850,
      createdAt: '2023-09-05'
    },
    {
      id: 5,
      name: 'Khast Imam Complex',
      location: 'Tashkent, Uzbekistan',
      rating: 4.6,
      reviews: 420,
      image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80',
      category: 'Historical Sites',
      description: 'Religious complex housing several mosques, mausoleums, and the famous Othman Quran - one of the oldest Qurans in the world.',
      views: 1350,
      createdAt: '2023-10-12'
    },
    {
      id: 6,
      name: 'Bukhara Old City',
      location: 'Bukhara, Uzbekistan',
      rating: 4.9,
      reviews: 1580,
      image: 'https://images.unsplash.com/photo-1597074461450-87f73e2ae725?w=800&q=80',
      category: 'Historical Sites',
      description: 'UNESCO World Heritage site featuring well-preserved medieval architecture, ancient madrasahs, and the iconic Kalyan Minaret.',
      views: 4500,
      createdAt: '2023-06-25'
    }
  ],

  // Recent reviews on company places
  recentReviews: [
    {
      id: 1,
      userName: 'Sarah Johnson',
      userAvatar: null,
      placeName: 'Registan Square',
      rating: 5,
      comment: 'Amazing place! The company organized everything perfectly.',
      date: '2024-11-25'
    },
    {
      id: 2,
      userName: 'Michael Chen',
      userAvatar: null,
      placeName: 'Bukhara Old City',
      rating: 5,
      comment: 'Excellent historical site. Very well maintained.',
      date: '2024-11-23'
    },
    {
      id: 3,
      userName: 'Emma Davis',
      userAvatar: null,
      placeName: 'Shah-i-Zinda Necropolis',
      rating: 4,
      comment: 'Beautiful architecture and rich history. Highly recommended!',
      date: '2024-11-20'
    }
  ]
};

// Mock API functions
export const mockAPI = {
  // Get user profile
  getUserProfile: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(defaultUserProfile);
      }, 500);
    });
  },

  // Get company profile
  getCompanyProfile: async (companyId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(defaultCompanyProfile);
      }, 500);
    });
  },

  // Get user ratings
  getUserRatings: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(defaultUserProfile.ratings);
      }, 300);
    });
  },

  // Get user comments
  getUserComments: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(defaultUserProfile.comments);
      }, 300);
    });
  },

  // Get company places
  getCompanyPlaces: async (companyId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(defaultCompanyProfile.places);
      }, 500);
    });
  },

  // Update user profile
  updateUserProfile: async (userId, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...defaultUserProfile, ...data });
      }, 300);
    });
  },

  // Update company profile
  updateCompanyProfile: async (companyId, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...defaultCompanyProfile, ...data });
      }, 300);
    });
  }
};