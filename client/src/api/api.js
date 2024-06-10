import axios from 'axios';

const baseURL = 'http://localhost:8000/';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTenders = async (page, limit) => {
  try {
    const response = await api.get(`/tender?page=${page}&limit=${limit}`);
    return response.data;

  } catch (error) {
    throw error;
  }
};

export const getTenderById = async (tID) => {
  try {
    const response = await api.get(`/tender/${tID}`);
    return response.data;

  } catch (error) {
    throw error;
  }
};

export const filterTender = async (page, limit, selectedCategories, selectedStates, sortValue, iscloseDate) => {
  try {
    console.log(page,limit,selectedCategories,selectedStates, sortValue)
    const categoryParam = selectedCategories.length > 0 ? `&category=${selectedCategories.join(',')}` : '';
    const stateParam = selectedStates.length > 0 ? `&state=${selectedStates.join(',')}` : '';
    const sortParam = `&value=${sortValue}`;
    const response = await api.get(`/tender/filters/query?${categoryParam}${stateParam}${sortParam}&limit=${limit}&page=${page}`);
    console.log("response", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const customerLogin = async (email, password) => {
  try {
    const response = await api.post(`/auth/customer/login`,{ email, password });
    return response.data;

  } catch (error) {
    throw error;
  }
};


export const customerSignup = async (name,email,contact,company,password) => {
  try {
    const response = await api.post(`/auth/customer/signup`,{ name,email,contact,company, password });
    return response.data;

  } catch (error) {
    throw error;
  }
};


export const searchTender = async (searchTerm,page,limit) => {
  try {
    const response = await api.get(`/tender/search/query?text=${searchTerm}&page=${page}&limit=${limit}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getUserProfile = async (authorization) => {
  try {
    const response = await api.post(
      `/auth/customer/profile`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authorization}`
        }
      }
    );

    return response.data;


  } catch (error) {
    throw error;
  }
};

export const AdminSignup = async (email, password, secret) => {
  try {
    const response = await api.post('/auth/admin/signup', { email, password, secret });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AdminLogin = async (email, password) => {
  try {
    const response = await api.post('/auth/admin/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getAsianAdmin = async (authorization) => {
  try {
    const response = await api.post(
      `/auth/admin/profile`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authorization}`
        }
      }
    );

    return response.data;


  } catch (error) {
    throw error;
  }
};

export const CreateTender = async (title, state, category, value, closeDate, document) => {
  try {
    const response = await api.post('/tender', { title, state, category, value, closeDate, document });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateTender = async (tID, title, state, category, value, closeDate, document) => {
  try {
    const response = await api.put(`/tender/${tID}`, { title, state, category, value, closeDate, document });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteTender = async (tID) => {
  try {
    const response = await api.delete(`/tender/${tID}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};




export default api;
