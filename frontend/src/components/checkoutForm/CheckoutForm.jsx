import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { Button } from 'antd';
import React from 'react';

const CheckoutForm = ({t}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });


    if (result.error) {
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form>
      <PaymentElement />
      <Button type='primary' size='large' style={{width:"100%", marginTop:"20px"}} onClick={handleSubmit} disabled={!stripe}>{t("travelpage.pay")}</Button>
    </form>
  )
};

export default CheckoutForm;