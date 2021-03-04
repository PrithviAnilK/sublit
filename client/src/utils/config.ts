export const BASEURL =
    process.env.NODE_ENV === 'production' &&
    process.env.REACT_APP_PROD_BASE_URL !== undefined
        ? process.env.REACT_APP_PROD_BASE_URL
        : 'http://localhost:5000/';
