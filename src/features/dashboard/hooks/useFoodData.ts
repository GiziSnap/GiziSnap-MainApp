'use client';

import { useMemo, useState } from 'react';
import { useGetFoodName } from '@/features/machine-learning/hooks/useGetFoodName';

// --- TYPE DEFINITIONS ---
export interface FoodItem {
  id: number;
  name: string;
  region: string;
  origin: string;
}

interface ParsedLabel {
  region: string;
  origin: string;
  commonIn: string;
  isGeneral: boolean;
}

// --- HELPER FUNCTIONS ---
const parseLabel = (label: string | undefined): ParsedLabel => {
  if (typeof label !== 'string' || !label) {
    return { region: '-', origin: '-', commonIn: '-', isGeneral: false };
  }
  const regionRegex = /Region: ([^;]+)/;
  const originRegex = /Asli: ([^;]+)/;
  const commonInRegex = /Umum di: ([^;]+)/;
  const regionMatch = regionRegex.exec(label);
  const originMatch = originRegex.exec(label);
  const commonInMatch = commonInRegex.exec(label);
  return {
    region: regionMatch?.[1]?.trim() ?? '-',
    origin: originMatch?.[1]?.trim() ?? '-',
    commonIn: commonInMatch?.[1]?.trim() ?? '-',
    isGeneral: label.includes('General'),
  };
};

const generatePagination = (
  currentPage: number,
  totalPages: number,
): (number | string)[] => {
  if (totalPages <= 7)
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (currentPage <= 3) return [1, 2, 3, 4, '...', totalPages];
  if (currentPage >= totalPages - 2)
    return [
      1,
      '...',
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

/**
 * Custom hook for fetching, parsing, and managing food data pagination.
 */
export const useFoodData = (itemsPerPage: number) => {
  const { data: foodData, isLoading, isError } = useGetFoodName();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const parsedFoods: FoodItem[] = useMemo(() => {
    const actualData = foodData?.data as unknown as (string | string[])[][];
    if (!Array.isArray(actualData) || actualData.length === 0) {
      return [];
    }
    return actualData
      .slice(1)
      .filter((item: (string | string[])[]): item is [string, string] => {
        return (
          Array.isArray(item) &&
          item.length === 2 &&
          typeof item[0] === 'string' &&
          !item[0].startsWith('testing')
        );
      })
      .map(([name, label], index): FoodItem => {
        const details = parseLabel(label);

        let displayRegion = details.region;
        if (details.isGeneral) {
          if (details.commonIn !== '-') {
            displayRegion = details.commonIn;
          } else {
            displayRegion = 'Umum di Indonesia';
          }
        }

        return {
          id: index,
          name,
          region: displayRegion,
          origin: details.origin,
        };
      });
  }, [foodData]);

  const totalPages = Math.ceil(parsedFoods.length / itemsPerPage);

  const currentItems = useMemo(() => {
    return parsedFoods.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );
  }, [parsedFoods, currentPage, itemsPerPage]);

  const paginationItems = useMemo(
    () => generatePagination(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const handlePageChange = (pageNumber: number): void => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return {
    isLoading,
    isError,
    currentItems,
    currentPage,
    totalPages,
    paginationItems,
    handlePageChange,
  };
};
