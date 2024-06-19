import { baseUrl } from "./apiUrl";

export const requestResetPassword = async (email) => {
  return fetch(`${baseUrl}auth/request-password-reset?email=${email}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert(
          "Controlla la tua posta elettronica! Abbiamo inviato un link per reimpostare la password."
        );
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

export const resetPassword = async (token, newPassword) => {
  return fetch(
    `${baseUrl}auth/reset-password?token=${token}&newPassword=${newPassword}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        alert("Password reimpostata con successo");

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
