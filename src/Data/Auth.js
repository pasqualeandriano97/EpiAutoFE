export const register = (payload) => {
  return fetch("http://localhost:3001/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
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
      alert(error.message);
    });
};

export const login = (payload) => {
  return fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
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
      alert(error.message);
    });
};
