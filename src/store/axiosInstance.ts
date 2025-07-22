import axios from 'axios';

const BASE_API_URL = 'http://iskcon-vesu-cms.azurewebsites.net/api';

export const axiosInstance = axios.create({
    baseURL: BASE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        console.log(`[Request] ${config?.method?.toUpperCase()} ${config.url}`);

        // added required headers
        config.headers['subscription-key'] = 'thisismysubscriptionkey';
        config.headers['app-id'] = 'MOBILEAPP';

        return config;
    },
    (error) => {
        console.error('[Request Error]', error);
        return Promise?.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('[Response]', response);
        return response;
    },
    (error) => {
        console.error('[Response Error]', error);
        return Promise?.reject(error);
    }
);