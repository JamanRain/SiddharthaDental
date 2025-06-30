const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser');

const nodemailer = require('nodemailer');

const mongoose = require('mongoose');

const Razorpay = require('razorpay'); // Import Razorpay

require('dotenv').config();



const app = express();

app.use(cors());

app.use(bodyParser.json());



// Connect to MongoDB

mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log('MongoDB connected'))

  .catch(err => console.error('MongoDB error', err));



// Mongoose schema

const BookingSchema = new mongoose.Schema({

  name: String,

  email: String,

  phone: String,

  service: String, // Still useful to store the chosen service

  date: String,    // Format: YYYY-MM-DD

  time: String,    // Format: HH:MM (e.g., "10:00", "10:30")

  approved: { type: Boolean, default: false },

  rejected: { type: Boolean, default: false },

  // Razorpay payment details

  razorpay_order_id: String,

  razorpay_payment_id: String,

  razorpay_signature: String,

  amount_paid: Number, // In paise

});

const Booking = mongoose.model('Booking', BookingSchema);



// Nodemailer setup

const createTransporter = () => nodemailer.createTransport({

  service: 'gmail',

  auth: {

    user: process.env.ADMIN_EMAIL,

    pass: process.env.ADMIN_PASSWORD

  }

});



// Initialize Razorpay

const razorpay = new Razorpay({

  key_id: process.env.RAZORPAY_KEY_ID,

  key_secret: process.env.RAZORPAY_KEY_SECRET,

});


// NEW: Endpoint to create a Razorpay order

app.post('/create-order', async (req, res) => {

  const { amount } = req.body; // amount should be in paise

  const options = {

    amount: amount,

    currency: 'INR',

    receipt: `receipt_${Date.now()}`,

    payment_capture: 1 // auto capture

  };



  try {

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (error) {

    console.error('Error creating Razorpay order:', error);

    res.status(500).json({ success: false, message: 'Failed to create order' });

  }

});



// Modified: Booking request - now includes payment details

app.post('/book-appointment', async (req, res) => {

  const { bookingData, payment } = req.body;



  // Add payment details to bookingData

  const bookingDetails = {

    ...bookingData,

    razorpay_order_id: payment.razorpay_order_id,

    razorpay_payment_id: payment.razorpay_payment_id,

    razorpay_signature: payment.razorpay_signature,

    amount_paid: payment.razorpay_amount, // Assuming Razorpay sends amount in `razorpay_amount` or similar

  };



  const booking = new Booking(bookingDetails);

  try {

    // Optional: Verify Razorpay payment signature on the server-side

    // const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');

    // const isValid = validatePaymentVerification({ "order_id": payment.razorpay_order_id, "payment_id": payment.razorpay_payment_id }, payment.razorpay_signature, process.env.RAZORPAY_KEY_SECRET);

    // if (!isValid) {

    //   return res.status(400).json({ success: false, message: 'Payment verification failed' });

    // }



    await booking.save();

    res.json({ success: true, message: 'Booking request submitted and payment confirmed!' });

  } catch (err) {

    console.error('Error saving booking:', err);

    res.status(500).json({ success: false, message: 'Failed to save booking' });

  }

});



// NEW: Get available slots for a specific date

app.get('/get-available-slots/:date', async (req, res) => {

  const { date } = req.params; // date will be in YYYY-MM-DD format



  try {

    // Fetch all bookings for the given date that are either approved or not rejected

    const bookings = await Booking.find({

      date: date,

      // Consider only approved bookings or those not explicitly rejected,

      // as payment success implies a valid booking request for now.

      // Adjust this logic based on your approval workflow.

      $or: [{ approved: true }, { rejected: false }]

    });



    // Generate all possible slots for the day (10 AM to 8 PM, 30-min intervals)

    const allSlots = [];

    for (let h = 10; h < 20; h++) { // 10 AM to 7 PM (clinic closes at 8 PM, so last slot starts at 7:30 PM)

      allSlots.push(`${h.toString().padStart(2, '0')}:00`);

      allSlots.push(`${h.toString().padStart(2, '0')}:30`);

    }



    const slotAvailability = {};

    allSlots.forEach(slot => {

      slotAvailability[slot] = {

        totalBookings: 0,

        bookedBy: [], // Optional: to see who booked

        available: true // Default to available

      };

    });



    // Populate slot availability based on existing bookings

    bookings.forEach(booking => {

      const { time, name } = booking;

      if (slotAvailability[time]) {

        slotAvailability[time].totalBookings++;

        slotAvailability[time].bookedBy.push(name);

        if (slotAvailability[time].totalBookings >= 2) { // 2 dentists, so 2 bookings per slot

          slotAvailability[time].available = false;

        }

      }

    });



    res.json(slotAvailability);

  } catch (err) {

    console.error('Error fetching available slots:', err);

    res.status(500).json({ success: false, message: 'Failed to fetch slots' });

  }

});





// Get bookings (admin)

app.get('/admin/bookings', async (req, res) => {

  const bookings = await Booking.find();

  res.json(bookings);

});



// Approve booking (admin)

app.post('/admin/approve/:id', async (req, res) => {

  try {

    // When approving, ensure 'rejected' is false

    const booking = await Booking.findByIdAndUpdate(req.params.id, { approved: true, rejected: false }, { new: true });

    if (!booking) {

      return res.status(404).json({ success: false, message: 'Booking not found' });

    }

    const transporter = createTransporter();



    console.log(`Would create Google Calendar event: ${booking.service} on ${booking.date} at ${booking.time}`);



    await transporter.sendMail({

      from: process.env.ADMIN_EMAIL,

      to: booking.email,

      subject: 'Your appointment is confirmed',

      text: `Dear ${booking.name},\n\nYour appointment for ${booking.service} on ${booking.date} at ${booking.time} has been approved.\n\nThank you!`

    });



    res.json({ success: true, booking });

  } catch (err) {

    console.error('Error approving booking:', err);

    res.status(500).json({ success: false, message: 'Failed to approve booking' });

  }

});



// Reject booking (admin)

app.post('/admin/reject/:id', async (req, res) => {

  try {

    // When rejecting, ensure 'approved' is false

    const booking = await Booking.findByIdAndUpdate(req.params.id, { rejected: true, approved: false }, { new: true });

    if (!booking) {

      return res.status(404).json({ success: false, message: 'Booking not found' });

    }

    const transporter = createTransporter();



    await transporter.sendMail({

      from: process.env.ADMIN_EMAIL,

      to: booking.email,

      subject: 'Your appointment request could not be approved',

      text: `Dear ${booking.name},\n\nWe regret to inform you that your appointment request for ${booking.service} on ${booking.date} at ${booking.time} could not be approved.\n\nPlease contact us at +91-XXXXXXXXXX or write to drsiddharthapincha@gmail.com for assistance.\n\nSiddhartha Dental Clinic`

    });



    res.json({ success: true, booking });

  } catch (err) {

    console.error('Error rejecting booking:', err);

    res.status(500).json({ success: false, message: 'Failed to reject booking' });

  }

});
app.listen(5000, () => console.log('Server running on port 5000'));

