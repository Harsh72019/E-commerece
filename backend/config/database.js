const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log(`Connected to MongoDB : ${mongoose.connection.host}`);
  });
};

module.exports = connectDatabase;
