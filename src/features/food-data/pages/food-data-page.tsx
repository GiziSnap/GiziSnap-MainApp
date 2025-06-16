'use client';

import { useFoodData } from '@/features/dashboard/hooks/useFoodData';
import { FoodTableSkeleton } from '../component/FoodTableSkeleton';
import { FoodDataTable } from '../component/FoodDataTable';
import { FoodTablePagination } from '../component/FoodTablePagination';
import { PageContainer, SectionContainer } from '@/components/layouts';
import { FoodPageHeader } from '../component/FoodPageHeader';

export const FoodDataPage = (): React.ReactElement => {
  const ITEMS_PER_PAGE = 10;
  const {
    isLoading,
    isError,
    currentItems,
    currentPage,
    totalPages,
    paginationItems,
    handlePageChange,
  } = useFoodData(ITEMS_PER_PAGE);

  const renderContent = () => {
    if (isLoading) {
      return <FoodTableSkeleton rowsPerPage={ITEMS_PER_PAGE} />;
    }

    if (isError) {
      return (
        <div className='flex h-40 items-center justify-center'>
          <p className='text-red-500'>
            Gagal memuat data. Silakan coba lagi nanti.
          </p>
        </div>
      );
    }

    return (
      <>
        <FoodDataTable
          items={currentItems}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
        />
        <FoodTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginationItems={paginationItems}
          onPageChange={handlePageChange}
        />
      </>
    );
  };

  return (
    <PageContainer title='Daftar Makanan Nusantara' withHeader isDashboard>
      <SectionContainer padded container className='min-h-screen'>
        <main className='flex w-full flex-col items-center px-4 py-8'>
          <FoodPageHeader />
          {renderContent()}
        </main>
      </SectionContainer>
    </PageContainer>
  );
};
