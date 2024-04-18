// Importing necessary modules
import express from "express";
import postgres from "postgres";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
// import { Strategy } from "passport-local";

// Importing routes
import userRoutes from './routes/user.js';
import superadminRoutes from './routes/superadmin.js'; 

// Loading environment variables
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

// App setup
const app = express();
const port = process.env.PORT || 3000; // Set port from environment variable or default to 3000

// Use bodyParser for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Setting up PostgreSQL connection using environment variables

// PostgreSQL connection configuration
const sql = postgres({
  host: process.env.DB_HOST, // Read the host from the .env file
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  ssl: process.env.DB_SSL === "require",
});
export { sql };

// Setting up the session with secret from environment variable
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Set session secret from .env file
    resave: false,
    saveUninitialized: true,
  })
);

// Initializing passport
app.use(passport.initialize());
app.use(passport.session());

// Routes setup
app.use("/user", userRoutes);
app.use("/superadmin", superadminRoutes);

// Home page route
app.get("/", (req, res) => {
  res.render("home.ejs");
});

// Server listener
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
