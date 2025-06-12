import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { FoodItem } from '@/features/dashboard/hooks/useFoodData';

interface FoodDataTableProps {
  items: FoodItem[];
  currentPage: number;
  itemsPerPage: number;
}
export const FoodDataTable: React.FC<FoodDataTableProps> = ({
  items,
  currentPage,
  itemsPerPage,
}) => (
  <div className='w-full overflow-x-auto rounded-md border'>
    <Table className='w-full table-auto'>
      <TableCaption className='text-green-900/80'>
        Daftar lengkap makanan khas Indonesia.
      </TableCaption>
      <TableHeader className='bg-green-50 hover:bg-green-100/60'>
        <TableRow>
          <TableHead className='w-[50px] text-green-900'>No.</TableHead>
          <TableHead className='w-[40%] text-green-900'>Nama Makanan</TableHead>
          <TableHead className='w-[30%] text-green-900'>
            Wilayah / Umum di
          </TableHead>
          <TableHead className='text-green-900'>Asal Spesifik</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((food, index) => (
          <TableRow key={food.id} className='hover:bg-green-50/50'>
            <TableCell className='font-medium'>
              {(currentPage - 1) * itemsPerPage + index + 1}
            </TableCell>
            <TableCell className='truncate'>{food.name}</TableCell>
            <TableCell className='truncate'>{food.region}</TableCell>
            <TableCell className='truncate'>{food.origin}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
