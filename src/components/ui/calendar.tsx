'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('rounded-lg bg-white p-4 shadow-md', className)} // Latar belakang putih dengan bayangan
      classNames={{
        months: 'flex flex-col sm:flex-row gap-4',
        month: 'flex flex-col gap-4',
        caption: 'flex justify-center pt-2 relative items-center w-full',
        caption_label: 'text-base font-semibold text-gray-800', // Warna teks gelap untuk judul bulan
        nav: 'flex items-center gap-2',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'size-8 bg-transparent p-0 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full', // Tombol navigasi dengan hover
        ),
        nav_button_previous: 'absolute left-2',
        nav_button_next: 'absolute right-2',
        table: 'w-full border-collapse space-x-1 mt-2',
        head_row: 'flex justify-between',
        head_cell: 'text-gray-500 rounded-md w-10 font-medium text-sm', // Header hari dengan warna abu-abu
        row: 'flex w-full mt-1 justify-between',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-green-100 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md',
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-10 p-0 font-normal text-gray-800 hover:bg-gray-200 aria-selected:opacity-100', // Hover pada tanggal
        ),
        day_range_start:
          'day-range-start aria-selected:bg-green-500 aria-selected:text-white', // Warna hijau untuk awal rentang
        day_range_end:
          'day-range-end aria-selected:bg-green-500 aria-selected:text-white', // Warna hijau untuk akhir rentang
        day_selected:
          'bg-green-500 text-white hover:bg-green-600 hover:text-white focus:bg-green-500 focus:text-white', // Warna hijau untuk tanggal yang dipilih
        day_today: 'bg-green-100 text-green-700 font-semibold', // Warna hijau terang untuk hari ini
        day_outside: 'day-outside text-gray-400 aria-selected:text-gray-400', // Warna abu-abu untuk tanggal di luar bulan
        day_disabled: 'text-gray-400 opacity-50 cursor-not-allowed', // Warna abu-abu pucat untuk tanggal yang dinonaktifkan
        day_range_middle:
          'aria-selected:bg-green-100 aria-selected:text-green-800', // Warna hijau terang untuk tengah rentang
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft
            className={cn('size-5 text-gray-600', className)}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight
            className={cn('size-5 text-gray-600', className)}
            {...props}
          />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
