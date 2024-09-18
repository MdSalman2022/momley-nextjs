const usePayment = () => {
  const getPaymentMethods = async (id) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/paymentKeys/get-all-payment-methods`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const profile = await response.json();

    return profile.data;
  };

  const getPayments = async (id) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/paymentKeys/get-all-payment-keys?storeId=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const profile = await response.json();

    return profile.data;
  };

  const getPayment = async (id, paymentKeyId) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/paymentKeys/get-payment-key?storeId=${id}&id=${paymentKeyId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const profile = await response.json();

    return profile;
  };

  const createPaymentKeys = async (payload) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/paymentKeys/create-payment-key`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();

    return data;
  };

  const updatePaymentKeyStatus = async (payload) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/paymentKeys/update-payment-status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();

    return data;
  };

  return {
    getPaymentMethods,
    getPayments,
    getPayment,
    createPaymentKeys,
    updatePaymentKeyStatus,
  };
};

export default usePayment;
