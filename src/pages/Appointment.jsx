// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// import { assets } from '../assets/assets'
// import RelatedDoctors from '../components/RelatedDoctors'
// import { toast } from 'react-toastify'
// import axios from 'axios'

// const Appointment = () => {
//   const { docId } = useParams()
//   const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
//   const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

//   const navigate = useNavigate()
//   const [docInfo, setDocInfo] = useState(null)
//   const [docSlots, setDocSlots] = useState([])
//   const [slotIndex, setSlotIndex] = useState(0)
//   const [slotTime, setSlotTime] = useState('')

//   // 🩺 Find selected doctor by ID
//   useEffect(() => {
//     const doc = doctors?.find(d => d._id === docId) || null
//     setDocInfo(doc)
//   }, [doctors, docId])

//   // 🕒 Generate slots when doctor info changes
//   useEffect(() => {
//     if (docInfo) {
//       getAvailableSlots()
//     }
//   }, [docInfo])

//   // 📅 Generate available slots for next 7 days
//   const getAvailableSlots = () => {
//     const today = new Date()
//     const slotsForWeek = []

//     for (let i = 0; i < 7; i++) {
//       const currentDate = new Date(today)
//       currentDate.setDate(today.getDate() + i)

//       // set daily working hours (10 AM - 9 PM)
//       const startTime = new Date(currentDate)
//       const endTime = new Date(currentDate)
//       endTime.setHours(21, 0, 0, 0)

//       if (i === 0) {
//         const now = new Date()
//         const startHour = Math.max(10, now.getHours() + (now.getMinutes() >= 30 ? 1 : 0))
//         const startMinutes = now.getMinutes() >= 30 ? 0 : 30
//         startTime.setHours(startHour, startMinutes, 0, 0)
//         if (startTime >= endTime) continue // skip today if past working hours
//       } else {
//         startTime.setHours(10, 0, 0, 0)
//       }

//       const daySlots = []
//       const iter = new Date(startTime)
//       while (iter < endTime) {
//         const dt = new Date(iter)
//         const timeLabel = dt.toLocaleTimeString([], {
//           hour: '2-digit',
//           minute: '2-digit',
//           hour12: true,
//         })
//         daySlots.push({ datetime: dt, time: timeLabel })
//         iter.setMinutes(iter.getMinutes() + 30)
//       }

//       slotsForWeek.push(daySlots)
//     }

//     setDocSlots(slotsForWeek)
//     setSlotIndex(0)
//     setSlotTime('')
//   }

//   // 🧾 Book appointment
//   const bookAppointment = async () => {
//     if (!token) {
//       toast.warn('Login to book appointment')
//       return navigate('/login')
//     }

//     try {
//       const selectedSlot = docSlots[slotIndex]?.find(s => s.time === slotTime)
//       if (!selectedSlot) return toast.error('Please select a valid slot')

//       const date = selectedSlot.datetime
//       const slotDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

//       const { data } = await axios.post(
//         `${backendUrl}/user/book-appointment`,
//         { docId, slotDate, slotTime },
//         { headers: { token } }
//       )

//       if (data.success) {
//         toast.success(data.message)
//         getDoctorsData()
//         navigate('/my-appointments')
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       console.error(error)
//       toast.error(error.message || 'Something went wrong')
//     }
//   }

//   // 🔁 Reset slot selection if slots change
//   useEffect(() => {
//     if (!docSlots || docSlots.length === 0 || slotIndex >= docSlots.length) {
//       setSlotIndex(0)
//       setSlotTime('')
//     }
//   }, [docSlots, slotIndex])

//   if (!docInfo) {
//     return <div className="p-6 text-center">Loading...</div>
//   }

//   const selectedSlots = docSlots[slotIndex] || []

//   return (
//     <div>
//       {/* Doctor Details */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div>
//           <img
//             className="bg-primary w-full sm:max-w-72 rounded-lg"
//             src={docInfo.image}
//             alt={docInfo.name}
//           />
//         </div>
//         <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
//           <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
//             {docInfo.name}
//             <img className="w-5" src={assets.verified_icon} alt="verified" />
//           </p>
//           <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
//             <p>
//               {docInfo.degree} - {docInfo.speciality}
//             </p>
//             <button className="py-0.5 px-2 border text-xs rounded-full">
//               {docInfo.experience}
//             </button>
//           </div>

//           <div className="mt-3">
//             <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
//               <span>About</span>
//               <img src={assets.info_icon} alt="info" />
//             </div>
//             <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
//           </div>

//           <p className="text-gray-500 font-medium mt-4">
//             Appointment Fee:{' '}
//             <span className="text-gray-600">
//               {currencySymbol}
//               {docInfo.fees}
//             </span>
//           </p>
//         </div>
//       </div>

//       {/* Booking Slots */}
//       <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
//         <p>Booking Slots</p>

//         {/* Days */}
//         <div className="flex gap-3 items-center w-full overflow-x-auto py-4">
//           {docSlots.length > 0 ? (
//             docSlots.map((daySlots, index) => {
//               const first = daySlots[0]
//               if (!first) return null
//               const dayLabel = daysOfWeek[first.datetime.getDay()]
//               const dateLabel = first.datetime.getDate()
//               return (
//                 <div
//                   key={index}
//                   onClick={() => {
//                     setSlotIndex(index)
//                     setSlotTime('')
//                   }}
//                   className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
//                     slotIndex === index
//                       ? 'bg-primary text-white'
//                       : 'border border-gray-200'
//                   }`}
//                 >
//                   <p>{dayLabel}</p>
//                   <p>{dateLabel}</p>
//                 </div>
//               )
//             })
//           ) : (
//             <p className="text-sm text-gray-500">No slots available</p>
//           )}
//         </div>

//         {/* Times */}
//         <div className="flex items-center gap-3 w-full overflow-x-auto mt-4">
//           {selectedSlots.length > 0 ? (
//             selectedSlots.map((item, idx) => (
//               <p
//                 key={idx}
//                 onClick={() => setSlotTime(item.time)}
//                 className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
//                   item.time === slotTime
//                     ? 'bg-primary text-white'
//                     : 'text-gray-400 border border-gray-300'
//                 }`}
//               >
//                 {item.time.toLowerCase()}
//               </p>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500">Select a day to see slots</p>
//           )}
//         </div>

//         {/* Book button */}
//         <button
//           onClick={bookAppointment}
//           disabled={!slotTime}
//           className={`bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 ${
//             !slotTime ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//         >
//           Book An Appointment
//         </button>
//       </div>

//       {/* Related Doctors */}
//       <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
//     </div>
//   )
// }

// export default Appointment





import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [bookedSlots, setBookedSlots] = useState(
    JSON.parse(localStorage.getItem('bookedAppointments') || '{}')
  );

  // Find doctor info
  useEffect(() => {
    const doc = doctors?.find(d => d._id === docId) || null;
    setDocInfo(doc);
  }, [doctors, docId]);

  // Generate slots
  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  const getAvailableSlots = () => {
    const today = new Date();
    const slotsForWeek = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const startTime = new Date(currentDate);
      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        const now = new Date();
        const startHour = Math.max(10, now.getHours() + (now.getMinutes() >= 30 ? 1 : 0));
        const startMinutes = now.getMinutes() >= 30 ? 0 : 30;
        startTime.setHours(startHour, startMinutes, 0, 0);
        if (startTime >= endTime) continue;
      } else {
        startTime.setHours(10, 0, 0, 0);
      }

      const daySlots = [];
      const iter = new Date(startTime);
      while (iter < endTime) {
        const dt = new Date(iter);
        const timeLabel = dt.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
        daySlots.push({ datetime: dt, time: timeLabel });
        iter.setMinutes(iter.getMinutes() + 30);
      }

      slotsForWeek.push(daySlots);
    }

    setDocSlots(slotsForWeek);
    setSlotIndex(0);
    setSlotTime('');
  };

  // Check if slot is booked
  const isSlotBooked = (datetime, time) => {
    const slotDate = datetime.toISOString().split('T')[0];
    return bookedSlots[docId]?.some(
      s => s.slotDate === slotDate && s.slotTime.toLowerCase() === time.toLowerCase()
    );
  };

  // Book appointment
  const bookAppointment = () => {
    if (!slotTime) return toast.error('Please select a slot');

    const selectedSlot = docSlots[slotIndex]?.find(s => s.time === slotTime);
    if (!selectedSlot) return toast.error('Invalid slot');

    if (isSlotBooked(selectedSlot.datetime, slotTime)) {
      return toast.error('Slot already booked! Choose another one.');
    }

    // Save booking in localStorage
    const slotDate = selectedSlot.datetime.toISOString().split('T')[0];
    const newBooked = { docId, slotDate, slotTime };
    const updatedBookings = { ...bookedSlots };
    if (!updatedBookings[docId]) updatedBookings[docId] = [];
    updatedBookings[docId].push(newBooked);

    localStorage.setItem('bookedAppointments', JSON.stringify(updatedBookings));
    setBookedSlots(updatedBookings);

    toast.success('Appointment booked successfully!');
    setSlotTime('');
  };

  // Reset slot selection if slots change
  useEffect(() => {
    if (!docSlots || docSlots.length === 0 || slotIndex >= docSlots.length) {
      setSlotIndex(0);
      setSlotTime('');
    }
  }, [docSlots, slotIndex]);

  if (!docInfo) return <div className="p-6 text-center">Loading...</div>;

  const selectedSlots = docSlots[slotIndex] || [];

  return (
    <div>
      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="verified" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
              <span>About</span>
              <img src={assets.info_icon} alt="info" />
            </div>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment Fee: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking Slots</p>

        {/* Days */}
        <div className="flex gap-3 items-center w-full overflow-x-auto py-4">
          {docSlots.length > 0 ? docSlots.map((daySlots, index) => {
            const first = daySlots[0];
            if (!first) return null;
            const dayLabel = daysOfWeek[first.datetime.getDay()];
            const dateLabel = first.datetime.getDate();
            return (
              <div
                key={index}
                onClick={() => { setSlotIndex(index); setSlotTime(''); }}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'
                }`}
              >
                <p>{dayLabel}</p>
                <p>{dateLabel}</p>
              </div>
            );
          }) : <p className="text-sm text-gray-500">No slots available</p>}
        </div>

        {/* Times */}
        <div className="flex items-center gap-3 w-full overflow-x-auto mt-4">
          {selectedSlots.length > 0 ? selectedSlots.map((item, idx) => {
            const booked = isSlotBooked(item.datetime, item.time);
            return (
              <p
                key={idx}
                onClick={() => !booked && setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full ${
                  booked
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : item.time === slotTime
                      ? 'bg-primary text-white cursor-pointer'
                      : 'text-gray-400 border border-gray-300 cursor-pointer'
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            );
          }) : <p className="text-sm text-gray-500">Select a day to see slots</p>}
        </div>

        {/* Book Button */}
        <button
          onClick={bookAppointment}
          disabled={!slotTime}
          className={`bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 ${!slotTime ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Book An Appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
