const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');

app.set('view engine', 'ejs'); // Set EJS as the view engine


app.use(bodyParser.urlencoded({ extended: true }));

    app.use(session({
  secret: 'quizcampus_secret_key', // signs the cookie to protect it
  resave: false,    // don't save if nothing changed
  saveUninitialized: false,   // don't create session until something stored
}));



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


app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await quizcampus.findOne({ email });

    if (!user) {
      // If user not found, redirect with error
      // retain email while showing error
        return res.redirect(`/signin.html?error=email&email=${encodeURIComponent(email)}`);
      // redirect with email error
      return res.redirect('/signin.html?error=email');
    }

    // Compare password with hashed version in DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // If password is incorrect, redirect with error
      // retain emial while showing error
        return res.redirect(`/signin.html?error=password&email=${encodeURIComponent(email)}`);
       // redirect with password error
      return res.redirect('/signin.html?error=password');
    }

    
// ✅ SET SESSION USER DATA HERE
req.session.user = {
  fullname: user.fullname,
  email: user.email,
  school: user.school
};

    // If login is successful take user to homepage
    res.redirect('/index.html');
    
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Internal server error");
  }
});

app.get('/profile', (req, res) => {
 // If session or user is missing, redirect to login
  if (!req.session || !req.session.user) {
    return res.redirect('/signin.html');
  }

  // Otherwise, render the profile page

  res.render('profile', { user: req.session.user });
});


// Start server on port 3000
app.listen(3000, function(){
  console.log('Server is running on port 3000');
});
