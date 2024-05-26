const config = {
    env:{
        apiUrl: import.meta.env.VITE_API_PORT,
        socketUrl: import.meta.env.VITE_SOCKET_PORT,
        mapApi: import.meta.env.VITE_MAP_API,
    },
    urls:{
        login:`/api/v1/auth/sign/signin`,
        register:`/api/v1/auth/sign/signup`,
    }
};

export default config;
