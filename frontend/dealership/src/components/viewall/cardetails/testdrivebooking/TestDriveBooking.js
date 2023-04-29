import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TestDriveBooking.css"

const TestDriveBooking = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(null);
    const [reservedSlots, setReservedSlots] = useState([]);

    useEffect(() => {
        // Fetch reserved slots from the backend
        // Replace this with a call to your backend API
        setReservedSlots(["2023-05-02T12:00:00.000Z"]);
    }, []);

    const handleDateChange = (date) => {
        setStartDate(date);
        setStartTime(null);
    };

    const handleTimeChange = (time) => {
        setStartTime(time);
    };

    const isSlotAvailable = (date, time) => {
        if (time === null) {
            return true;
        }
        const selectedSlot = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours() + 3, time.getMinutes()).toISOString();

        // Check if slot is in between 10 am and 5 pm
        if (time.getHours() < 10 || time.getHours() > 17) {
            return false;
        }

        // Check if selected slot is reserved
        if (reservedSlots.includes(selectedSlot)) {
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log("Form submitted");
    };

    return (
        <div className="test-drive-booking">
            <h1 className="test-drive-header">Book a Test Drive</h1>
            <form onSubmit={handleSubmit} className="test-drive-form">
                <div className="date-form-container">
                    <div className="date-picker-section">
                        <label className="date-picker-label">Date:</label>
                        <DatePicker
                            className="date-picker"
                            selected={startDate}
                            onChange={handleDateChange}
                            minDate={new Date().setDate(new Date().getDate() + 1)}
                            maxDate={new Date().setDate(new Date().getDate() + 14)}
                            dateFormat="yyyy-MM-dd"
                            filterDate={date => date.getDay() !== 0 && date.getDay() !== 6}
                        />
                    </div>
                    <div className="time-picker-section">
                        <label className="time-picker-label">Time:</label>
                        <select className="time-picker-dropdown" value={startTime} onChange={(e) => handleTimeChange(new Date(e.target.value))}>
                            <option value="">-- Select a time --</option>
                            {[...Array(8)].map((_, i) => {
                                const time = new Date(startDate);
                                time.setHours(i + 10, 0, 0, 0);
                                const isAvailable = isSlotAvailable(startDate, time);
                                const timeString = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                                return (
                                    isAvailable && <option key={i} value={time}>{timeString}</option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="timeslot-button-container">
                <button className="timeslot-button" type="submit">Book Test Drive</button>
                </div>
            </form>
        </div>
    );
};

export default TestDriveBooking;