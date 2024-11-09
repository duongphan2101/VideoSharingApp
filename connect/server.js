const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

// Mẫu schema của MongoDB
const UserSchema = new mongoose.Schema({
  id: Number,
  username: String,
  email: String,
  age: Number
});

const User = mongoose.model('User', UserSchema);

// API Endpoint
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Khởi chạy server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
