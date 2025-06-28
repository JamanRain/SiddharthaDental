import React, { useState, useEffect } from 'react';

// Define the API base URL using the environment variable
// This will be 'https://siddharthadental.onrender.com' in production
// and 'http://localhost:5000' during local development if not set.
const API_BASE_URL = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

const UserForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Dental Check-up', // Default service
  });
  const [status, setStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null); // { date: 'YYYY-MM-DD', time: 'HH:MM' }

  const dentalServices = [
    'Dental Check-up',
    'Root Canal',
    'Dental Implant',
    'Smile Design',
    'Teeth Whitening',
    'Orthodontics(braces)',
    'Crowns and Bridges',
    'Fillings',
  ];

  // Clinic timings
  const CLINIC_START_HOUR = 10; // 10 AM
  const CLINIC_END_HOUR = 20;   // 8 PM (exclusive, so last slot starts at 7:30 PM)

  // Function to generate dates for the next 3 days
  const generateAvailableDates = () => {
    const dates = [];
    for (let i = 0; i < 3; i++) { // Today + next 2 days = 3 days
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().split('T')[0]); // YYYY-MM-DD
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  // Effect to fetch slots when selectedDate changes
  useEffect(() => {
    const fetchSlots = async () => {
      if (selectedDate) {
        setStatus('Fetching available slots...');
        try {
          // Use API_BASE_URL here
          const res = await fetch(`${API_BASE_URL}/get-available-slots/${selectedDate}`);
          const data = await res.json();
          if (data.success === false) { // Handle error from backend
            setStatus(data.message || 'Failed to fetch slots.');
            setAvailableSlots({});
          } else {
            setAvailableSlots(data);
            setStatus('');
          }
        } catch (err) {
          console.error('Error fetching slots:', err);
          setStatus('Error fetching slots. Please try again.');
          setAvailableSlots({});
        }
      }
    };
    fetchSlots();
  }, [selectedDate]); // Dependency array: re-run when selectedDate changes

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = e => {
    setSelectedDate(e.target.value);
    setSelectedSlot(null); // Reset selected slot when date changes
    setAvailableSlots({}); // Clear slots when date changes
  };

  const handleSlotClick = (time) => {
    // Only allow selection if the slot is not fully booked and a date is selected
    if (selectedDate && availableSlots[time] && availableSlots[time].available) {
      setSelectedSlot({ date: selectedDate, time: time });
      setStatus(`Selected slot: ${selectedDate} at ${time}. Click 'Book Appointment' to confirm.`);
    } else if (selectedDate && availableSlots[time] && !availableSlots[time].available) {
      setStatus('This slot is fully booked. Please choose another.');
    } else {
      setStatus('Please select a date first to see available slots.');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!selectedSlot) {
      setStatus('Please select an appointment slot.');
      return;
    }

    if (!form.name || !form.email || !form.phone || !form.service) {
        setStatus('Please fill in all your details before booking.');
        return;
    }

    setStatus('Submitting booking request...');
    try {
      // Use API_BASE_URL here
      const res = await fetch(`${API_BASE_URL}/book-appointment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Combine form data with selected slot details
          ...form,
          date: selectedSlot.date,
          time: selectedSlot.time
        })
      });
      const data = await res.json();

      if (data.success) {
        setStatus('Booking request submitted! We will contact you soon for confirmation.');
        // Optimistically update the UI to reflect the new booking
        const updatedSlots = { ...availableSlots };
        if (updatedSlots[selectedSlot.time]) {
          updatedSlots[selectedSlot.time].totalBookings++;
          // A slot becomes unavailable if 2 bookings are made
          if (updatedSlots[selectedSlot.time].totalBookings >= 2) {
            updatedSlots[selectedSlot.time].available = false;
          }
        }
        setAvailableSlots(updatedSlots);
        setSelectedSlot(null); // Clear selected slot after successful booking
        setForm({ // Clear form fields
          name: '', email: '', phone: '', service: 'Dental Check-up', // Changed default service back to Dental Check-up for form clear
        });
      } else {
        setStatus(data.message || 'Booking failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during booking process:', err);
      setStatus('Error during booking process. Please check console.');
    }
  };

  // Function to generate 30-minute time slots for the day
  const generateTimeSlots = () => {
    const slots = [];
    for (let h = CLINIC_START_HOUR; h < CLINIC_END_HOUR; h++) { // 10 AM to 7 PM (clinic closes at 8 PM, so last slot starts at 7:30 PM)
      slots.push(`${h.toString().padStart(2, '0')}:00`);
      slots.push(`${h.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <section className="booking-section">
      <h2>Book Your Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          required
        >
          {dentalServices.map(service => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>

        {/* Date Selection */}
        <label htmlFor="booking-date">Select Date (Today + 2 Days):</label>
        <select
          id="booking-date"
          name="date"
          value={selectedDate}
          onChange={handleDateChange}
          required
        >
          <option value="">-- Select a Date --</option>
          {availableDates.map(date => (
            <option key={date} value={date}>
              {new Date(date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </option>
          ))}
        </select>

        {/* Slot Display Grid */}
        {selectedDate && (
          <div className="slot-grid-container">
            <h3>Available Slots for {new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
            <div className="slot-grid">
              {timeSlots.map(time => {
                const slotInfo = availableSlots[time] || { totalBookings: 0, available: true };
                const isFullyBooked = !slotInfo.available;
                const isSelected = selectedSlot && selectedSlot.date === selectedDate && selectedSlot.time === time;

                // Format end time for display
                const endTime = new Date(new Date(`2000/01/01 ${time}`).getTime() + 30 * 60000)
                  .toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });

                return (
                  <div
                    key={time}
                    className={`slot-cell ${isFullyBooked ? 'booked-slot' : 'available-slot'} ${isSelected ? 'selected-slot' : ''}`}
                    onClick={() => handleSlotClick(time)}
                  >
                    <p className="slot-time">{time} - {endTime}</p>
                    <p className="slot-status">
                      {isFullyBooked ? 'Fully Booked' : `Available (${2 - slotInfo.totalBookings} spots)`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {selectedSlot && (
            <p className="selected-slot-info">You have selected: {selectedSlot.date} at {selectedSlot.time} for {form.service}</p>
        )}
        <p className="consultation-fee-info">To confirm your booking, a consultation fee might be applicable upon visit.</p>
        <button type="submit" disabled={!selectedSlot || !form.name || !form.email || !form.phone || !form.service}>
          Book Appointment
        </button>

      </form>
      <p className="status-message">{status}</p>
      <p className="consultation-fee-info">
        For custom appointments or scheduling beyond this window, please feel free to contact us directly at
        <span style={{ color: '#007BFF', fontWeight: 'bold' }}> +91-69013 42433</span> or email us at
        <span style={{ color: '#007BFF', fontWeight: 'bold' }}> drsiddharthapincha@gmail.com</span>.
        We're happy to help!
      </p>
    </section>
  );
};

export default UserForm;