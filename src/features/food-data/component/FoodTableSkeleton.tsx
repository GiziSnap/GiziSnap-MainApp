import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface FoodTableSkeletonProps {
  rowsPerPage?: number;
}
export const FoodTableSkeleton: React.FC<FoodTableSkeletonProps> = ({
  rowsPerPage = 10,
}) => (
  <div className='rounded-md border'>
    <Table className='w-full table-fixed'>
      <TableHeader className='bg-green-50'>
        <TableRow>
          <TableHead className='w-[50px]'>
            <Skeleton className='h-5 w-full bg-green-200' />
          </TableHead>
          <TableHead className='w-[40%]'>
            <Skeleton className='h-5 w-full bg-green-200' />
          </TableHead>
          <TableHead className='w-[30%]'>
            <Skeleton className='h-5 w-full bg-green-200' />
          </TableHead>
          <TableHead>
            <Skeleton className='h-5 w-full bg-green-200' />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rowsPerPage }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className='h-5 w-full bg-gray-200' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-5 w-full bg-gray-200' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-5 w-full bg-gray-200' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-5 w-full bg-gray-200' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
