const config = {
  env: {
    apiUrl: import.meta.env.VITE_API_PORT,
    socketUrl: import.meta.env.VITE_SOCKET_PORT,
    mapApi: import.meta.env.VITE_MAP_API,
  },
  urls: {
    login: `/api/v1/auth/sign/signin`,
    register: `/api/v1/auth/sign/signup`,
    changeDriverStatus: `/api/v1/Driver/user`,
    setDriverAvailable: `/api/v1/Driver/avilable`,
    driver: `/api/v1/Driver`,
    setDriverUnAvailable: `/api/v1/Driver/notavilable`,
    taxiBooking: `/api/v1/TaxiBooking`,
    getImage: `/api/v1/User/downloadImage`,
    setImage: `/api/v1/User/uploadImage`,
    findDriver: `/api/v1/TaxiBooking/driver/find`,
    user: `/api/v1/User`,
    paymentCharge: `/api/payment/charge`,
    driverDeliver: `/api/v1/TaxiBooking/driver/deliver`,
    taxiBookingGetById: `/api/v1/TaxiBooking/get`,
    taxiBookingPayment: `/api/v1/TaxiBooking/payment`,
    taxiBookingRideStatus: `/api/v1/TaxiBooking/ridestatus`,
    setTaxiBookingStatus: `/api/v1/TaxiBooking/settaxibookingstatus`,
    endBooking: `/api/v1/TaxiBooking/endbooking`,
    getUserTravelHistory: `/api/v1/TaxiBooking/rideComplotedCancelledCustomer`,
    getDriverTravelHistory: `/api/v1/TaxiBooking/rideComplotedCancelledDriver`
  },
};

export default config;
