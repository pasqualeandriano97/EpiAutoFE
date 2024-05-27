const baseUrl = "https://andrianopasquale-andrianopasquale-13cce7cc.koyeb.app/";

export const allVehicles = (token, page) => {
  return fetch(baseUrl + `vehicle?page=${page}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then((data) => {
          throw new Error(data.message);
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};
