const origin = process.env.NEXT_PUBLIC_BASE_URL;

export const AuthLogin = async (info) => {
  const loginUrl = `${origin}/user/login`;
  const user = {
    email: info.email,
    password: info.password,
  };
  try {
    return await fetch(loginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include",
      cache: "no-store",
    })
      .then((resp) => {
        return resp.json();
      })
      .catch((error) => {
        console.log("AuthLogin page Error: ", error);
        return { ok: false, message: "Something went wrong! Try again later" };
      });
  } catch (error) {
    console.log("AuthLogin page Error: ", error);
    return { ok: false, message: "Something went wrong! Try again later" };
  }
};
export const AuthRegister = async (info) => {
  const registerUrl = `${origin}/user/register`;
  const user = {
    fullname: {
      firstname: info.firstname,
      lastname: info.lastname,
    },
    email: info.email,
    password: info.password,
  };
  try {
    return await fetch(registerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include",
      cache: "no-store",
    })
      .then((resp) => {
        return resp.json();
      })
      .catch((error) => {
        console.log("AuthRegister page Error: ", error);
        return {
          ok: false,
          message: "Something went wrong! Try again later",
        };
      });
  } catch (error) {
    console.log("AuthRegister page Error: ", error);
    return {
      ok: false,
      message: "Somthing went wrong! Try again later",
    };
  }
};
export const AuthenticateUser = async () => {
  const authenticateUserUrl = `${origin}/user/auth`;
  try {
    return await fetch(authenticateUserUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((resp) => {
        return resp.json();
      })
      .catch((error) => {
        console.log("User Authenticate Error: ", error);
        return {
          ok: false,
          message: "Somthing went wrong! Try again later",
        };
      });
  } catch (error) {
    console.log("User Authenticate Error: ", error);
    return {
      ok: false,
      message: "Somthing went wrong! Try again later",
    };
  }
};
export const AuthLogout = async () => {
  const logoutUrl = `${origin}/user/logout`;
  try {
    return await fetch(logoutUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((resp) => {
        return resp.json();
      })
      .catch((error) => {
        console.log("logout page Error: ", error);
        return {
          ok: false,
          message: "Something went wrong! Try again Later",
        };
      });
  } catch (error) {
    console.log("logout page Error: ", error);
    return {
      ok: false,
      message: "Something went wrong! Try again Later",
    };
  }
};
