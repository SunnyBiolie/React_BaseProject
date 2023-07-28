import axios from 'axios';

// instance axios
const request = axios.create({
    //lấy url từ file cấu hình môi trường env
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export default request;
