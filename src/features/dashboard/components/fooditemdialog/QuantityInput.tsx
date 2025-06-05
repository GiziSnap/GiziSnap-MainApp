// QuantityInput.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

type QuantityInputProps = {
  count: number;
  incrementCount: () => void;
  decrementCount: () => void;
  setCount: (value: number) => void;
};

const QuantityInput: React.FC<QuantityInputProps> = ({
  count,
  incrementCount,
  decrementCount,
  setCount,
}) => {
  return (
    <div>
      <label
        htmlFor='food-quantity'
        className='mb-1 block text-xs font-medium text-gray-700'
      >
        Quantity
      </label>
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          className='rounded-l-lg px-3 py-1'
          onClick={decrementCount}
          disabled={count <= 1}
        >
          <Minus className='h-4 w-4' />
        </Button>
        <Input
          id='food-quantity'
          type='number'
          min='1'
          className='input-number w-20 text-center'
          value={count}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (!isNaN(value) && value >= 1) {
              setCount(value);
            }
          }}
        />
        <Button
          variant='outline'
          className='rounded-r-lg px-3 py-1'
          onClick={incrementCount}
        >
          <Plus className='h-4 w-4' />
        </Button>
        <div className='ml-2 text-xs text-gray-600'>serving(s)</div>
      </div>
    </div>
  );
};

export default QuantityInput;
