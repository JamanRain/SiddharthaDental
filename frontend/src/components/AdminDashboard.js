import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [unlocked, setUnlocked] = useState(false);
  const [inputPassword, setInputPassword] = useState('');

  const ADMIN_PASSWORD = 'secret123';

  const fetchBookings = async () => {
    try {
      const res = await fetch('http://localhost:5000/admin/bookings');
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const approveBooking = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/admin/approve/${id}`, { method: 'POST' });
      const data = await res.json();
      if (data.success) fetchBookings();
      else alert(data.message || 'Approval failed');
    } catch (err) {
      console.error('Approve error:', err);
      alert('Server error');
    }
  };

  const rejectBooking = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/admin/reject/${id}`, { method: 'POST' });
      const data = await res.json();
      if (data.success) fetchBookings();
      else alert(data.message || 'Rejection failed');
    } catch (err) {
      console.error('Reject error:', err);
      alert('Server error');
    }
  };

  useEffect(() => {
    if (unlocked) {
      fetchBookings();
      const el = document.getElementById('admin');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [unlocked]);

  if (!unlocked) {
    return (
      <section className="admin-section" style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Admin Access</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (inputPassword === ADMIN_PASSWORD) {
                setUnlocked(true);
              } else {
                alert('Incorrect password');
                setInputPassword('');
              }
            }
          }}
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <p style={{ fontSize: '0.9rem', color: '#777', marginTop: '0.5rem' }}>
          Press Enter after typing password
        </p>
      </section>
    );
  }

  return (
    <section id="admin" className="admin-section">
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b._id}>
              <td>{b.name}</td>
              <td>{b.service}</td>
              <td>{b.date}</td>
              <td>{b.time}</td>
              <td>
                {b.approved ? 'Approved' : b.rejected ? 'Rejected' : 'Pending'}
              </td>
              <td>
                {!b.approved && !b.rejected && (
                  <>
                    <button onClick={() => approveBooking(b._id)} style={{ marginRight: '0.5rem' }}>
                      Approve
                    </button>
                    <button onClick={() => rejectBooking(b._id)} style={{ background: 'red', color: 'white' }}>
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AdminDashboard;
