// import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';

// const Doctors = () => {
//   const { speciality } = useParams();
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const navigate = useNavigate();
//   const { doctors = [] } = useContext(AppContext);

//   useEffect(() => {
//     // Filter doctors based on speciality (case-insensitive)
//     const filtered = speciality
//       ? doctors.filter(
//           (doc) =>
//             doc.speciality?.toLowerCase() === speciality.toLowerCase()
//         )
//       : doctors;
//     setFilteredDoctors(filtered);
//   }, [doctors, speciality]);

//   const specialities = [
//     'General Physician',
//     'Gynecologist',
//     'Dermatologist',
//     'Pediatricians',
//     'Neurologist',
//     'Gastroenterologist',
//   ];

//   return (
//     <div className="p-4">
//       <p className="text-gray-600 mb-4">Browse through the Doctors Specialist</p>

//       <div className="flex flex-col sm:flex-row gap-5">
//         {/* Sidebar: Specialities */}
//         <div className="flex flex-col gap-3 text-sm text-gray-600">
//           {specialities.map((spec) => (
//             <p
//               key={spec}
//               onClick={() =>
//                 navigate(
//                   spec === 'General Physician'
//                     ? '/doctors'
//                     : `/doctors/${spec}`
//                 )
//               }
//               className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
//                 speciality?.toLowerCase() === spec.toLowerCase()
//                   ? 'bg-indigo-100 text-black'
//                   : ''
//               }`}
//             >
//               {spec}
//             </p>
//           ))}
//         </div>

//         {/* Doctors Grid */}
//         <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
//           {filteredDoctors.length > 0 ? (
//             filteredDoctors.map((doctor) => (
//               <div
//                 key={doctor._id}
//                 onClick={() => navigate(`/appointment/${doctor._id}`)}
//                 className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
//               >
//                 <img
//                   className="bg-blue-50 w-full h-48 object-cover"
//                   src={doctor.image || '/placeholder-doctor.png'}
//                   alt={doctor.name}
//                 />
//                 <div className="p-4">
//                   <div className="flex items-center gap-2 text-sm text-green-500 mb-2">
//                     <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                     <span>{doctor.available ? 'Available' : 'Unavailable'}</span>
//                   </div>
//                   <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
//                   <p className="text-gray-600 text-sm">{doctor.speciality}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 col-span-full">No doctors found for this speciality.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Doctors;


import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const navigate = useNavigate();
  const { doctors = [] } = useContext(AppContext);

  useEffect(() => {
    // Filter doctors based on speciality (case-insensitive)
    const filtered = speciality
      ? doctors.filter(
          (doc) => doc.speciality?.toLowerCase() === speciality.toLowerCase()
        )
      : doctors;
    setFilteredDoctors(filtered);
  }, [doctors, speciality]);

  const specialities = [
    'General Physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
  ];

  return (
    <div className="p-4">
      <p className="text-gray-600 mb-4">Browse through the Doctors by Specialty</p>

      <div className="flex flex-col sm:flex-row gap-5">
        {/* Sidebar: Specialities */}
        <div className="flex flex-col gap-3 text-sm text-gray-600 w-full sm:w-60">
          {specialities.map((spec) => (
            <p
              key={spec}
              onClick={() =>
                navigate(
                  spec === 'General Physician'
                    ? '/doctors'
                    : `/doctors/${spec}`
                )
              }
              className={`pl-3 py-1.5 border border-gray-300 rounded cursor-pointer transition-all ${
                speciality?.toLowerCase() === spec.toLowerCase()
                  ? 'bg-indigo-100 text-black font-semibold'
                  : 'hover:bg-gray-100'
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                onClick={() => navigate(`/appointment/${doctor._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <img
                  className="bg-blue-50 w-full h-48 object-cover"
                  src={doctor.image || '/placeholder-doctor.png'}
                  alt={doctor.name}
                />
                <div className="p-4">
                  {/* Always show Available in green */}
                  <div className="flex items-center gap-2 text-sm text-green-500 mb-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Available</span>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
                  <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                  <p className="text-sm text-gray-700 mt-1">🎓 Degree: {doctor.degree}</p>
                  <p className="text-sm text-gray-700">🧑‍⚕️ Experience: {doctor.experience}</p>
                  <p className="text-sm font-semibold text-gray-800 mt-2">💰 Fees: ₹{doctor.fees}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No doctors found for this speciality.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
