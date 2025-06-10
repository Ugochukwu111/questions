const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// Middleware to parse URL-encoded bodies (form data)
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb+srv://pascal:Pascal2025@cluster0.iwr216l.mongodb.net/quizcampus")
.then(() => {
  console.log("Connected to MongoDB successfully!");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

// Create Mongoose schema and model
const quizCampusSignupSchema = new mongoose.Schema({
  fullname: String,
  email: { type: String, unique: true },
  password: String,
  school: String,
});
const quizcampus = mongoose.model("quizcampus", quizCampusSignupSchema);

// Serve all static files from project root (general static serve)
app.use(express.static(__dirname));

// Also serve specific folders explicitly (optional, but okay)
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Serve signup.html file on /signup.html GET request (fix path)
app.get('/signup.html', function(req, res){
  res.sendFile(path.join(__dirname, 'signup.html'));
});

// POST route for signup form
app.post("/", async function (req, res) {
  try {
    const { fullname, email, password, confirmPassword, school } = req.body;

    // Check if email already exists
    const existingUser = await quizcampus.findOne({ email: email });
    if (existingUser) {
      // Build query params to send error and pre-fill form fields except password
      const queryParams = new URLSearchParams({
        emailError: 'Email already registered',
        fullname: fullname || '',
        email: email || '',
        school: school || ''
      });
      // Redirect back to signup page with query parameters
      return res.redirect(`/signup.html?${queryParams.toString()}`);
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document
    let newUser = new quizcampus({
      fullname,
      email,
      password: hashedPassword,
      school,
    });

    // Save user to DB
    await newUser.save();

    // Redirect to homepage or login page on success
    res.redirect('/index.html');

  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).send("Something went wrong.");
  }
});

// Start server on port 3000
app.listen(3000, function(){
  console.log('Server is running on port 3000');
});
