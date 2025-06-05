import Link from 'next/link';
import { Card, CardContent, CardHeader } from './ui/card';
import { Heading } from './ui/heading';
import { Button } from './ui/button';

export const Unauthorized = () => {
  return (
    <Card className='mx-auto max-w-md'>
      <CardHeader>
        <Heading size='h2'>Unauthorized</Heading>
      </CardHeader>
      <CardContent>
        <p>You do not have access to this page.</p>
        <Link href='/auth/login'>
          <Button variant={'outline'} className='mt-4 w-full'>
            Login
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
