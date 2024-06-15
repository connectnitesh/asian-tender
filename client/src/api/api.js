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
    const categoryParam = selectedCategories.length > 0 ? `&category=${selectedCategories.join(',')}` : '';
    const stateParam = selectedStates.length > 0 ? `&state=${selectedStates.join(',')}` : '';
    const sortParam = `&value=${sortValue}`;
    const response = await api.get(`/tender/filters/query?${categoryParam}${stateParam}${sortParam}&limit=${limit}&page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const customerLogin = async (email, password) => {
  try {
    const response = await api.post(`/auth/customer/login`, { email, password });
    return response.data;

  } catch (error) {
    throw error;
  }
};


export const customerSignup = async (name, email, contact, company, password) => {
  try {
    const response = await api.post(`/auth/customer/signup`, { name, email, contact, company, password });
    return response.data;

  } catch (error) {
    throw error;
  }
};


export const searchTender = async (searchTerm, page, limit) => {
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


export const downloadTenderDoc = async (tID, authorization) => {
  try {
    const response = await api.post(
      `/tender/download-tender/${tID}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authorization}`
        },
        responseType: 'blob'
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


export const asyncCreateTender = async (formData, authorization) => {
  try {

    const response = await api.post('/tender/create-tender', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authorization}`
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};


export const asyncUpdateTender = async (formData, authorization) => {
  try {
    const tID = formData.get('tID');

    const response = await api.post(`/tender/update-tender/${tID}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authorization}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const asyncDeleteTender = async (tID, authorization) => {
  try {
    const response = await api.post(`/tender/delete-tender/${tID}`,
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

export const asyncCheckout = async (email,amount,pack_duration) => {
  try {
    const response = await api.post(`/subscribe/checkout`,
      {email, amount, pack_duration });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getrazorPayKey = async (amount) => {
  try {
    const response = await api.get(`/subscribe/getapiKey`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const paymentVerify = async (data) => {
  try {
    const response = await api.post(`/subscribe/paymentVerification`, { data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const orderVerify = async (order_ref_no) => {
  try {
    const response = await api.post(`/subscribe/verifyorder`, { order_ref_no });
    return response.data;
  } catch (error) {
    throw error;
  }
};




export default api;
