import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className='flex gap-5'>
      <Link href='/auth/login'>Login</Link>
      <Link href='/auth/register'>Register</Link>
      <Link href='/dashboard'>Dashboard</Link>
    </nav>
  );
};
