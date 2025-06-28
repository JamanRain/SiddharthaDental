import React from 'react';

const timings = [
  { day: "Monday", time: "10:00 AM - 8:00 PM" },
  { day: "Tuesday", time: "10:00 AM - 8:00 PM" },
  { day: "Wednesday", time: "10:00 AM - 8:00 PM" },
  { day: "Thursday", time: "10:00 AM - 8:00 PM" },
  { day: "Friday", time: "10:00 AM - 8:00 PM" },
  { day: "Saturday", time: "10:00 AM - 8:00 PM" },
  { day: "Sunday", time: "10:00 AM - 8:00 PM" }
];

const ClinicTimings = () => {
  return (
    <section className="clinic-timings-section">
      <h2>🕒 Clinic Timings</h2>
      <table className="clinic-timings-table">
        <thead>
          <tr>
            <th>DAY</th>
            <th>TIMING</th>
          </tr>
        </thead>
        <tbody>
          {timings.map((item, index) => (
            <tr key={index}>
              <td>{item.day}</td>
              <td>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ClinicTimings;
