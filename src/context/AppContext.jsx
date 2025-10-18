// import React, { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";

// // Create the context
// export const AppContext = createContext();

// // Create the provider component
// const AppContextProvider = (props) => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   // const [doctors, setDoctors] = useState([])

//   // even when we refresh the page it wont logout
//   const [token, setToken] = useState(
//     localStorage.getItem("token") ? localStorage.getItem("token") : false
//   );
//   const [userData, setUserData] = useState(false);

//   const loadUserProfileData = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/user/get-profile", {
//         headers: { token },
//       });
//       if (data.success) {
//         setUserData(data.userData);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "Failed to load user data");
//     }
//   };

//   // ✅ Corrected value object
//   const value = {
//     doctors, // from assets
//     // getDoctorsData, // uncomment later if needed
//     token,
//     setToken,
//     backendUrl,
//     userData,
//     setUserData,
//     loadUserProfileData,
//     // currencySymbol
//   };

//   useEffect(() => {
//     if (token) {
//       loadUserProfileData();
//     } else {
//       setUserData(false);
//     }
//   }, [token]);

//   // const getDoctorsData = async () => {
//   //   try {
//   //     const { data } = await axios.get(backendUrl + '/doctor/list');
//   //     if (data.success) {
//   //       setDoctors(data.doctors);
//   //     } else {
//   //       toast.error(data.message);
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //     toast.error(error.message);
//   //   }
//   // };

//   // useEffect(() => {
//   //   getDoctorsData();
//   // }, []);

//   return (
//     <AppContext.Provider value={value}>
//       {props.children}
//     </AppContext.Provider>
//   );
// };

// export default AppContextProvider;



//NEEW


import React, { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(null);

  // Load user profile if token exists
  const loadUserProfileData = async () => {
    if (!token) return;

    try {
      const { data } = await axios.get(`${backendUrl}/user/get-profile`, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Correct header
      });

      if (data.success) setUserData(data.userData);
      else {
        setUserData(null);
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      setUserData(null);
      toast.error(err.response?.data?.message || "Failed to load user data");
    }
  };

  useEffect(() => {
    loadUserProfileData();
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        doctors,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
