'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavigationLinkProps = {
  label: string;
  href: string;
};

export const NavigationLink = ({ ...props }: NavigationLinkProps) => {
  const pathname = usePathname();
  const activeLink = pathname === props.href;
  return (
    <Link href={props.href}>
      <Button
        size={'sm'}
        variant={'secondary'}
        className={cn(
          'w-[200px] capitalize',
          activeLink && 'border-b-2 border-b-zinc-500',
        )}
      >
        {props.label}
      </Button>
    </Link>
  );
};
