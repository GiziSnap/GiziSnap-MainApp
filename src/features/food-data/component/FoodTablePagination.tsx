import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface FoodTablePaginationProps {
  currentPage: number;
  totalPages: number;
  paginationItems: (string | number)[];
  onPageChange: (page: number) => void;
}
export const FoodTablePagination: React.FC<FoodTablePaginationProps> = ({
  currentPage,
  totalPages,
  paginationItems,
  onPageChange,
}) => (
  <Pagination className='py-4'>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          onClick={() => onPageChange(currentPage - 1)}
          className={
            currentPage === 1
              ? 'pointer-events-none opacity-50'
              : 'cursor-pointer hover:bg-green-100'
          }
        />
      </PaginationItem>
      {paginationItems.map((item, index) => (
        <PaginationItem
          key={typeof item === 'string' ? `ellipsis-${index}` : item}
        >
          {typeof item === 'string' ? (
            <PaginationEllipsis />
          ) : (
            <PaginationLink
              href='#'
              onClick={(e) => {
                e.preventDefault();
                onPageChange(item);
              }}
              isActive={currentPage === item}
              className={
                currentPage === item
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'hover:bg-green-100'
              }
            >
              {item}
            </PaginationLink>
          )}
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationNext
          onClick={() => onPageChange(currentPage + 1)}
          className={
            currentPage === totalPages
              ? 'pointer-events-none opacity-50'
              : 'cursor-pointer hover:bg-green-100'
          }
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);
