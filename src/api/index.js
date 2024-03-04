import axios from "axios";

const Base_Url = process.env.REACT_APP_API_KEY;

const GetApi = async (tag = '', isHeader = false, searchTerm, limit = 5) => {  
    const config = {
      params: {
        countryIds: 'IN',
        namePrefix: searchTerm,
        limit: limit,
      },
    };
  
    if (isHeader) {
      config.headers = {
        'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
        'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
      };
    }
  
    try {
      const response = await axios.get(`${Base_Url}${tag}`, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
export const Api = {
  getCities: (url, searchTerm, limit) => GetApi(url, true, searchTerm, limit),
};
