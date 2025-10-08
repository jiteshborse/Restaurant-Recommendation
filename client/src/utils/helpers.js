// Format price range to display
export const formatPriceRange = (priceRange) => {
  const priceMap = {
    '$': 'Budget-friendly',
    '$$': 'Moderate',
    '$$$': 'Expensive',
    '$$$$': 'Very Expensive'
  };
  return priceMap[priceRange] || priceRange;
};

// Generate star rating array for display
export const generateStarRating = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push('full');
    } else if (i === fullStars && hasHalfStar) {
      stars.push('half');
    } else {
      stars.push('empty');
    }
  }

  return stars;
};

// Format phone number
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';

  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');

  // Format as (XXX) XXX-XXXX
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  return phone;
};

// Debounce function
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Generate cache key for API calls
export const generateCacheKey = (filters, pagination, sort) => {
  const key = {
    ...filters,
    page: pagination?.page || 1,
    limit: pagination?.limit || 20,
    sort: sort?.field || 'rating',
    sortOrder: sort?.order || 'desc'
  };

  // Remove null/undefined values
  Object.keys(key).forEach(k => {
    if (key[k] == null || key[k] === '' ||
      (Array.isArray(key[k]) && key[k].length === 0)) {
      delete key[k];
    }
  });

  return JSON.stringify(key);
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Truncate text to specified length
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

// Convert query params object to URL string
export const buildQueryString = (params) => {
  const filteredParams = Object.entries(params)
    .filter(([_, value]) => value !== null && value !== undefined && value !== '')
    .reduce((acc, [key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        acc[key] = value.join(',');
      } else if (!Array.isArray(value)) {
        acc[key] = value;
      }
      return acc;
    }, {});

  return new URLSearchParams(filteredParams).toString();
};

// Check if object is empty
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

// Calculate reading time (approximate)
export const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const wordCount = text?.split(' ').length || 0;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes === 1 ? '1 min read' : `${minutes} min read`;
};

// Format number with commas
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};