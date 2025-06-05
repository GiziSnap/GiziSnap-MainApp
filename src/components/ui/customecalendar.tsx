'use client';

import { useState, useMemo } from 'react';

type CustomCalendarProps = {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
  historyDates?: string[]; // Array tanggal (format ISO: YYYY-MM-DD) yang memiliki riwayat
};

const CustomCalendar = ({
  selectedDate,
  onSelect,
  historyDates = [],
}: CustomCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Fungsi untuk mendapatkan jumlah hari dalam sebulan
  const daysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();

  // Fungsi untuk menangani klik pada tanggal
  const handleDateClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    onSelect(date);
  };

  // Memoized set tanggal dengan riwayat untuk performa
  const historyDateSet = useMemo(() => new Set(historyDates), [historyDates]);

  // Tanggal hari ini untuk membatasi pemilihan tanggal masa depan
  const today = new Date();
  today.setHours(23, 59, 59, 999); // Akhir hari ini

  // Fungsi untuk memeriksa apakah tanggal memiliki riwayat
  const hasHistory = (day: number) => {
    const dateStr = new Date(currentYear, currentMonth, day)
      .toISOString()
      .split('T')[0];
    return historyDateSet.has(dateStr!);
  };

  // Fungsi untuk memeriksa apakah tanggal di masa depan
  const isFutureDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date > today;
  };

  // Fungsi untuk merender hari-hari dalam kalender
  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth, currentYear);
    for (let day = 1; day <= totalDays; day++) {
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear;
      const isDisabled = !hasHistory(day) || isFutureDate(day);

      days.push(
        <button
          key={day}
          onClick={() => !isDisabled && handleDateClick(day)}
          disabled={isDisabled}
          className={`m-1 rounded-full p-2 text-sm transition-colors duration-200 ${
            isSelected
              ? 'bg-blue-500 text-white'
              : isDisabled
                ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {day}
        </button>,
      );
    }
    return days;
  };

  // Fungsi untuk memformat tanggal
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    return date.toLocaleDateString('en-US', options);
  };

  // Fungsi untuk navigasi bulan sebelumnya dan berikutnya
  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((year) => year - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((year) => year + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  return (
    <div className='rounded-lg border bg-white p-4 text-black shadow-md'>
      <div className='mb-2 flex flex-col'>
        <h2 className='text-lg font-semibold'>Select Date</h2>
        <div className='my-2 flex items-center justify-between'>
          <button
            onClick={handlePrevMonth}
            className='text-lg font-medium text-gray-600 transition-colors hover:text-gray-800'
          >
            &lt;
          </button>
          <h3 className='text-xl font-bold'>
            {formatDate(new Date(currentYear, currentMonth, 1))}
          </h3>
          <button
            onClick={handleNextMonth}
            className='text-lg font-medium text-gray-600 transition-colors hover:text-gray-800'
          >
            &gt;
          </button>
        </div>
        <button
          onClick={() => onSelect(new Date())}
          className='self-end rounded-full bg-green-100 px-3 py-1 font-semibold text-green-800 transition-colors hover:bg-green-200'
        >
          Today
        </button>
      </div>
      <div className='grid grid-cols-7 gap-1'>{renderDays()}</div>
    </div>
  );
};

export default CustomCalendar;
