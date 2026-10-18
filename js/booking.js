

alert("Booking JavaScript is working!");

document.addEventListener("DOMContentLoaded", () => {

    // Create booking popup
    const popup = document.createElement("div");

    popup.id = "bookingPopup";

    popup.innerHTML = `
        <div class="booking-box">

            <button type="button" id="closeBooking">×</button>

            <h2>Book Your Trip</h2>

            <form id="bookingForm">

                <label>Full Name</label>
                <input type="text" id="customerName" required>

                <label>Email</label>
                <input type="email" id="customerEmail" required>

                <label>Phone Number</label>
                <input type="tel" id="customerPhone" required>

                <label>Destination</label>
                <input type="text" id="destination" readonly required>

                <label>Travel Date</label>
                <input type="date" id="travelDate" required>

                <label>Number of Travellers</label>
                <input type="number" id="travellers" min="1" required>

                <button type="submit" id="submitBooking">
                    Confirm Booking
                </button>

                <p id="bookingMessage" role="status"></p>

            </form>
        </div>
    `;

    document.body.appendChild(popup);

    const form = document.getElementById("bookingForm");
    const message = document.getElementById("bookingMessage");
    const submitButton = document.getElementById("submitBooking");

    // Prevent selecting past dates
    const dateInput = document.getElementById("travelDate");

    const today = new Date();
    const localToday = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    dateInput.min = localToday;

    // Open popup when Book Now is clicked
    document.querySelectorAll(".package-card .btn").forEach(button => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            const card = button.closest(".package-card");
            const packageName = card.querySelector("h2").textContent.trim();

            form.reset();
            message.textContent = "";

            document.getElementById("destination").value = packageName;

            popup.style.display = "flex";
        });

    });

    // Close popup
    document.getElementById("closeBooking").onclick = () => {
        popup.style.display = "none";
    };

    // Submit booking to backend
    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const bookingData = {
            name: document.getElementById("customerName").value.trim(),
            email: document.getElementById("customerEmail").value.trim(),
            phone: document.getElementById("customerPhone").value.trim(),
            destination: document.getElementById("destination").value,
            travelDate: dateInput.value,
            travellers: Number(document.getElementById("travellers").value)
        };

        submitButton.disabled = true;
        message.textContent = "Saving your booking...";

        try {

            const response = await fetch(
                "http://localhost:5000/api/bookings",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(bookingData)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Booking failed");
            }

            message.textContent = "Booking successful!";
            message.style.color = "green";

            form.reset();

        } catch (error) {

            message.textContent = error.message;
            message.style.color = "red";

        } finally {
            submitButton.disabled = false;
        }

    });

});
