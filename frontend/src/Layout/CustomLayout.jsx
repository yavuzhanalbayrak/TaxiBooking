import React from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import api from "../utils/api";
import config from "../config";

export default function CustomLayout({
  children,
  setTravel,
  setDistance,
  setSource,
  setDestination,
  source,
  destination,
  setTaxiBooking,
  setIsLocationClicked,
  setIsPersonSearching,
  setPerson,
  setIsPersonApproved,
  person
}) {
  const user = useAuthUser();

  React.useEffect(() => {
    if (user && user.role === "USER" && !destination && !source) {
      getActiveTravelForUser();
    } else if (user && user.role === "DRIVER" && !person) {
      getActiveTravelForDriver();
    }
  }, [user]);

  const getActiveTravelForUser = async () => {
    const taxiBooking = await api.get(
      `${config.urls.taxiBookingRideStatus}/${user.id}`
    );
    console.log("hansolo55: ", taxiBooking.data);
    setTaxiBooking(taxiBooking.data);
    setDestination({
      lat: taxiBooking.data.route[0].latitude,
      lng: taxiBooking.data.route[0].longitude,
      label: taxiBooking.data.route[0].address,
    });
    setSource({
      lat: taxiBooking.data.route[1].latitude,
      lng: taxiBooking.data.route[1].longitude,
      label: taxiBooking.data.route[1].address,
    });
    setTravel({
      name:
        taxiBooking.data.driver.user.firstName +
        " " +
        taxiBooking.data.driver.user.lastName,
      email: taxiBooking.data.driver.user.email,
      phone: "+" + taxiBooking.data.driver.user.mobileNumber,
      car: {
        brand: "Honda",
        model: "pcx",
        year: "2021",
      },
      rating: 3,
      destination: {
        label: taxiBooking.data.route[0].address,
      },
      distance:
        parseFloat(taxiBooking.data.totalDistanceMeters).toFixed(1) + " km",
      source: {
        label: taxiBooking.data.route[1].address,
      },
      price: taxiBooking.data.amount,
      currency: "TRY",
    });
  };

  const getActiveTravelForDriver = async () => {
    const driver = await api.get(
      `${config.urls.changeDriverStatus}/${user.id}`
    );
    const driverId = driver.data.id;

    const taxiBooking = await api.get(
      `${config.urls.taxiBookingRideDriverStatus}/${driverId}`
    );
    setTaxiBooking(taxiBooking.data);
    console.log("HANSI",taxiBooking);
    setPerson({
        lat: taxiBooking.data.route[1].latitude,
        lng: taxiBooking.data.route[1].longitude,
        label: taxiBooking.data.route[1].address,
        destination: {
          lat: taxiBooking.data.route[0].latitude,
          lng: taxiBooking.data.route[0].longitude,
          label: taxiBooking.data.route[0].address,
        },
        user: taxiBooking.data.customer.user.id,
      });
      setIsLocationClicked(false);
      setIsPersonSearching(false);
      setIsPersonApproved(true);

    setTravel({
      name:
        taxiBooking.data.customer.user.firstName +
        " " +
        taxiBooking.data.customer.user.lastName,
      email: taxiBooking.data.customer.user.email,
      phone: "+" + taxiBooking.data.customer.user.mobileNumber,
      car: {
        brand: "Honda",
        model: "pcx",
        year: "2021",
      },
      rating: 3,
      destination: {
        label: taxiBooking.data.route[0].address,
      },
      distance:
        parseFloat(taxiBooking.data.totalDistanceMeters).toFixed(1) + " km",
      source: {
        label: taxiBooking.data.route[1].address,
      },
      price: taxiBooking.data.amount,
      currency: "TRY",
    });
  };
  return <>{children}</>;
}
