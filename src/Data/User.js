import { baseUrl } from "./apiUrl";

export const userDetails = (token) => {
  return fetch(baseUrl + `user/me`, {
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

export const updateUser = (token, user) => {
  return fetch(baseUrl + `user/me`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        alert("Dettagli utente modificati con successo");
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

export const deleteUser = (token) => {
  return fetch(baseUrl + `user/me`, {
    method: "DELETE",
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
