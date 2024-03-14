const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary")

// hadnling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err}`);
  console.log("Shutting down the server due to uncaught Exception");
  process.exit(1);
});

// config

dotenv.config({ path: "backend/config/config.env" });

// Connecting to database
connectDatabase();

cloudinary.config({
  cloud_name : process.env.CLOUDINARY_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET,

})

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost/${process.env.PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  // Close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
