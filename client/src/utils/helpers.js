export const formatPriceRange = (priceRange) => {
  const priceMap = {
    '$': 'Budget-friendly',
    '$$': 'Moderate',
    '$$$': 'Expensive',
    '$$$$': 'Very Expensive'
  };
  return priceMap[priceRange] || priceRange;
};

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

export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  const digits = phone.replace(/\D/g, '');
  
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  
  return phone;
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

export const generateCacheKey = (filters, pagination, sort) => {
  const key = {
    ...filters,
    page: pagination?.page || 1,
    limit: pagination?.limit || 20,
    sort: sort?.field || 'rating',
    sortOrder: sort?.order || 'desc'
  };
  
  Object.keys(key).forEach(k => {
    if (key[k] == null || key[k] === '' || 
       (Array.isArray(key[k]) && key[k].length === 0)) {
      delete key[k];
    }
  });
  
  return JSON.stringify(key);
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

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

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const wordCount = text?.split(' ').length || 0;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes === 1 ? '1 min read' : `${minutes} min read`;
};

export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};