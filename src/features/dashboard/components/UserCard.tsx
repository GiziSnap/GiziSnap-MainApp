import React from 'react';
import { User, MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import Image from 'next/image';

type UserCardProps = {
  userName: string;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  locations: string[];
  userAvatar: string;
  userAvatarFallback: string;
};

export const UserCard: React.FC<UserCardProps> = ({
  userName,
  userAvatar,
  userAvatarFallback,
  selectedLocation,
  setSelectedLocation,
  locations,
}) => {
  return (
    <Card className='mb-8 rounded-2xl bg-white shadow-md'>
      <CardContent className='flex flex-col items-center justify-between md:flex-row'>
        <div className='mb-4 flex items-center md:mb-0'>
          <div className='mr-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full'>
            {userAvatar && (
              <Image
                src={userAvatar}
                alt={userAvatarFallback}
                width={64}
                height={64}
                className='rounded-full object-cover'
              />
            )}
          </div>
          <div className='flex flex-col'>
            <h2 className='text-xl font-bold text-gray-800 md:text-2xl'>
              Welcome, {userName}!
            </h2>
            <p className='text-sm text-gray-600 md:text-base'>
              Let&apos;s track your nutritional intake today.
            </p>
          </div>
        </div>
        <div className='flex items-center'>
          <MapPin className='mr-2 text-red-500' />
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className='rounded-full border-gray-300 bg-gray-100 px-4 py-2 pr-8'>
              <SelectValue placeholder='Select location' />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
