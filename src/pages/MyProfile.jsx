// import React, { useEffect, useState } from "react";
// import { assets } from "../assets/assets";

// const MyProfile = () => {
//   // 🧠 Load from localStorage if exists, otherwise fallback to default data
//   const storedUserData = JSON.parse(localStorage.getItem("userData")) || {
//     name: "Surya",
//     image: assets.profile_pic,
//     email: "surya1@gmail.com",
//     phone: "1278937",
//     address: {
//       line1: "7th road",
//       line2: "Vijayawada",
//     },
//     gender: "Male",
//     dob: "2000-01-20",
//   };

//   const [userData, setUserData] = useState(storedUserData);
//   const [isEdit, setIsEdit] = useState(false);
//   const [image, setImage] = useState(false);

//   // 🧩 Save data to localStorage whenever userData changes
//   useEffect(() => {
//     localStorage.setItem("userData", JSON.stringify(userData));
//   }, [userData]);

//   // 🧩 Optional: when user selects a new image
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setUserData((prev) => ({ ...prev, image: imageUrl }));
//       setImage(file);
//     }
//   };

//   // 🧩 Save Info (you can later connect this to backend)
//   const updateUserProfileData = async () => {
//     setIsEdit(false);
//     alert("Profile info saved locally! (Connect backend later if needed)");
//   };

//   return (
//     <div className="max-w-lg flex flex-col gap-2 text-sm">
//       {/* Profile Image */}
//       <div className="relative">
//         <img className="w-36 h-36 rounded object-cover" src={userData.image} alt="profile" />
//         {isEdit && (
//           <input
//             type="file"
//             className="absolute top-0 left-0 opacity-0 w-36 h-36 cursor-pointer"
//             onChange={handleImageChange}
//           />
//         )}
//       </div>

//       {/* Name */}
//       {isEdit ? (
//         <input
//           className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
//           type="text"
//           value={userData.name}
//           onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
//         />
//       ) : (
//         <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
//       )}

//       <hr className="bg-zinc-400 h-[1px] border-none" />

//       {/* Contact Info */}
//       <div>
//         <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>

//         <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
//           <p className="font-medium">Email id:</p>
//           <p className="text-blue-500">{userData.email}</p>

//           <p className="font-medium">Phone:</p>
//           {isEdit ? (
//             <input
//               className="bg-gray-100 max-w-52"
//               type="text"
//               value={userData.phone}
//               onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
//             />
//           ) : (
//             <p className="text-blue-400">{userData.phone}</p>
//           )}

//           <p className="font-medium">Address:</p>
//           {isEdit ? (
//             <p>
//               <input
//                 className="bg-gray-50"
//                 type="text"
//                 value={userData.address.line1}
//                 onChange={(e) =>
//                   setUserData((prev) => ({
//                     ...prev,
//                     address: { ...prev.address, line1: e.target.value },
//                   }))
//                 }
//               />
//               <br />
//               <input
//                 className="bg-gray-50"
//                 type="text"
//                 value={userData.address.line2}
//                 onChange={(e) =>
//                   setUserData((prev) => ({
//                     ...prev,
//                     address: { ...prev.address, line2: e.target.value },
//                   }))
//                 }
//               />
//             </p>
//           ) : (
//             <p className="text-gray-500">
//               {userData.address.line1}
//               <br />
//               {userData.address.line2}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Basic Info */}
//       <div>
//         <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
//         <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
//           <p className="font-medium">Gender:</p>
//           {isEdit ? (
//             <select
//               className="max-w-20 bg-gray-100"
//               value={userData.gender}
//               onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
//             >
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//           ) : (
//             <p className="text-gray-400">{userData.gender}</p>
//           )}

//           <p className="font-medium">Birthday :</p>
//           {isEdit ? (
//             <input
//               className="max-w-28 bg-gray-100"
//               type="date"
//               value={userData.dob}
//               onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
//             />
//           ) : (
//             <p className="text-gray-400">{userData.dob}</p>
//           )}
//         </div>
//       </div>

//       {/* Edit / Save Button */}
//       <div className="mt-10">
//         {isEdit ? (
//           <button
//             className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
//             onClick={updateUserProfileData}
//           >
//             Save information
//           </button>
//         ) : (
//           <button
//             className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
//             onClick={() => setIsEdit(true)}
//           >
//             Edit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyProfile;





import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  // ✅ Safe parse from localStorage
  const getStoredUserData = () => {
    try {
      const data = localStorage.getItem("userData");
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.warn("Invalid userData in localStorage, resetting it.");
      localStorage.removeItem("userData");
      return null;
    }
  };

  const [userData, setUserData] = useState(
    getStoredUserData() || {
      name: "Surya",
      image: assets.profile_pic,
      email: "surya1@gmail.com",
      phone: "1278937",
      address: {
        line1: "7th road",
        line2: "Vijayawada",
      },
      gender: "Male",
      dob: "2000-01-20",
    }
  );

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  // ✅ Always store changes to localStorage
  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  // ✅ Handle new image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData((prev) => ({ ...prev, image: imageUrl }));
      setImage(file);
    }
  };

  // ✅ Save info (local only)
  const updateUserProfileData = () => {
    setIsEdit(false);
    alert("Profile edited");
  };

  if (!userData) return <p>Loading user data...</p>;

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm p-4 border rounded-xl shadow-md bg-white">
      {/* Profile Image */}
      <div className="relative">
        <img
          className="w-36 h-36 rounded object-cover"
          src={userData.image || assets.profile_pic}
          alt="profile"
        />
        {isEdit && (
          <input
            type="file"
            className="absolute top-0 left-0 opacity-0 w-36 h-36 cursor-pointer"
            onChange={handleImageChange}
          />
        )}
      </div>

      {/* Name */}
      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none" />

      {/* Contact Info */}
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>

        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email:</p>
          <p className="text-blue-500">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52"
              type="text"
              value={userData.phone}
              onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <>
              <input
                className="bg-gray-50 mb-1"
                type="text"
                value={userData.address?.line1 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <input
                className="bg-gray-50"
                type="text"
                value={userData.address?.line2 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </>
          ) : (
            <p className="text-gray-500">
              {userData.address?.line1}
              <br />
              {userData.address?.line2}
            </p>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-100"
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="max-w-28 bg-gray-100"
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Edit / Save Button */}
      <div className="mt-10">
        {isEdit ? (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={updateUserProfileData}
          >
            Save information
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
