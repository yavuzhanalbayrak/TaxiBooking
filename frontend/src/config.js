const config = {
    env:{
        apiUrl: import.meta.env.VITE_API_PORT,
        socketUrl: import.meta.env.VITE_SOCKET_PORT,
        mapApi: import.meta.env.VITE_MAP_API,
    },
    urls:{
        login:`/api/v1/auth/sign/signin`,
        register:`/api/v1/auth/sign/signup`,
        changeDriverStatus:`/api/v1/Driver/user`,
        setDriverAvailable:`/api/v1/Driver/avilable`,
        setDriverUnAvailable:`/api/v1/Driver/notavilable`,
        taxiBooking:`/api/v1/TaxiBooking`,
        getImage:``,
        setImage:`/api/v1/User/uploadImage`,
        findDriver:`/api/v1/TaxiBooking/driver/find`,
    }
};

export default config;
