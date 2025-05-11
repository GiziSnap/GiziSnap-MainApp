import { Heading } from '@/components/ui/heading';

type UserCardProps = {
  UserName: string;
};

export const UserCard = ({ UserName }: UserCardProps) => {
  return (
    <div className="flex items-center gap-4 p-12">
      <Heading variant={'primary'} size={'h2'}>
        {UserName}
      </Heading>
    </div>
  );
};
