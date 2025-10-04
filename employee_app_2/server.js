const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Atlas connection
mongoose.connect("mongodb+srv://<username>:<password>@cluster0.mongodb.net/employeeDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const employeeRoutes = require("./routes/employeeRoutes");
app.use("/", employeeRoutes);

// Server start
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
