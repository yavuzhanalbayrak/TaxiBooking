const config = {
    env:{
        apiUrl: import.meta.env.VITE_API_PORT,
        mapApi: import.meta.env.VITE_MAP_API,
    },
    urls:{
        login:`/api/users/login`,
    }
};

export default config;
