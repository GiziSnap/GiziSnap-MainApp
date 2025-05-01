import Link from 'next/link';
import { Heading } from '../ui/heading';
import { ThemeToggle } from '../action/ThemeToggle';
import { Navbar } from '../fragments/Navbar';

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-between border-b-2 px-5 py-3 dark:border-b-stone-800">
      <div className="flex items-center gap-5">
        <Link href={'/'} className="flex items-center gap-2">
          <Heading size={'h3'}>GiziSnap</Heading>
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <Navbar />
        <ThemeToggle />
      </div>
    </header>
  );
};
