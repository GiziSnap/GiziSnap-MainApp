// SearchFood.tsx
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type SearchFoodProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: [string, string][];
  handleSelectFood: (item: [string, string]) => void;
};

const SearchFood: React.FC<SearchFoodProps> = ({
  searchQuery,
  setSearchQuery,
  searchResults,
  handleSelectFood,
}) => {
  return (
    <div>
      <label
        htmlFor='food-search'
        className='mb-1 block text-xs font-medium text-gray-700'
      >
        Search Food
      </label>
      <div className='relative'>
        <Input
          id='food-search'
          placeholder='Search...'
          className='border-green-300 text-sm transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-green-500'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) =>
            e.key === 'Enter' &&
            searchResults.length > 0 &&
            handleSelectFood(searchResults[0] ?? ['', ''])
          }
        />
        <Search
          className='absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 cursor-pointer text-gray-400'
          onClick={() =>
            searchResults.length > 0 &&
            handleSelectFood(searchResults[0] ?? ['', ''])
          }
        />
      </div>
    </div>
  );
};

export default SearchFood;
