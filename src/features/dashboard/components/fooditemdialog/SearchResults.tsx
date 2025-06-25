import React from 'react';
import { Button } from '@/components/ui/button';
import FadeContent from '@/components/ui/animations/fade-content';

type SearchResultsProps = {
  searchResults: [string, string][];
  handleSelectFood: (item: [string, string]) => void;
};

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  handleSelectFood,
}) => {
  return (
    <div className='max-h-40 flex-col gap-2 space-y-1 overflow-y-auto'>
      {searchResults.map((item, index) => (
        <FadeContent
          key={index}
          duration={500}
          delay={100}
          initialOpacity={0}
          className='w-full'
        >
          <div
            className='flex cursor-pointer items-center justify-between rounded bg-white p-2 shadow-sm transition-shadow duration-200 hover:shadow-md'
            onClick={() => handleSelectFood(item)}
          >
            <div className='flex w-4/5 flex-col'>
              <h3 className='text-sm font-bold text-gray-900'>{item[0]}</h3>
              <p className='text-xs text-gray-600'>{item[1]}</p>
            </div>
            <Button
              variant='outline'
              className='ml-1 border-green-600 text-xs text-green-600 transition-colors hover:bg-green-600 hover:text-white'
              onClick={(e) => {
                e.stopPropagation();
                handleSelectFood(item);
              }}
            >
              Select
            </Button>
          </div>
        </FadeContent>
      ))}
    </div>
  );
};

export default SearchResults;
