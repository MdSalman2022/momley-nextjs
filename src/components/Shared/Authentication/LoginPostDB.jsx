const sendToServer = (data) => {
  // try post api
  fetch(`${process.env.VITE_SERVER_URL}/api/users/add`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.acknowledged) {
        return data;
      } else {
        return false;
      }
    });

  //
};

export { sendToServer };
