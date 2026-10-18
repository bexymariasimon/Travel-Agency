
const cors = require("cors");

const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

// Enable CORS
app.use(cors({
    origin: [
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Booking Routes
const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api/bookings", bookingRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Travel Agency Backend is Running!");
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB Connected Successfully!");

        app.listen(process.env.PORT || 5000, () => {
            console.log(
                `Server running on http://localhost:${process.env.PORT || 5000}`
            );
        });

    })
    .catch((error) => {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1);
    });
