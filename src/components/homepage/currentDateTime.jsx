import React, { useState, useEffect } from "react";

const CurrentDateTime = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Fungsi untuk mendapatkan nama hari dalam bahasa Indonesia
    const getDayName = (dayIndex) => {
        const days = [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
        ];
        return days[dayIndex];
    };

    // Fungsi untuk mendapatkan nama bulan dalam bahasa Indonesia
    const getMonthName = (monthIndex) => {
        const months = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];
        return months[monthIndex];
    };

    // Update waktu setiap detik
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        // Membersihkan interval saat komponen unmount
        return () => clearInterval(interval);
    }, []);

    // Mendapatkan data waktu
    const dayName = getDayName(currentDate.getDay());
    const date = currentDate.getDate();
    const monthName = getMonthName(currentDate.getMonth());
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    return (
        <div className="text-sm">
            {dayName}, {date} {monthName} {year}{" "}
            <span className="font-bold">
                {hours}:{minutes}:{seconds} WIB
            </span>
        </div>
    );
};

export default CurrentDateTime;
