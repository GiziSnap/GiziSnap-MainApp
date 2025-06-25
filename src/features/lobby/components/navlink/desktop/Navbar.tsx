import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;

      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth',
      });
    }
  };
  return (
    <div className='hidden space-x-4 md:flex'>
      <Button
        variant={'ghost'}
        onClick={() => scrollToSection('hero')}
        className='text-gray-70 border-green-500 px-3 py-2'
      >
        Beranda
      </Button>
      <Button
        variant={'ghost'}
        onClick={() => scrollToSection('features')}
        className='text-gray-70 border-green-500 px-3 py-2'
      >
        Fitur
      </Button>
      <Button
        variant={'ghost'}
        onClick={() => scrollToSection('guide')}
        className='text-gray-70 border-green-500 px-3 py-2'
      >
        Panduan
      </Button>
      <Button
        variant={'ghost'}
        onClick={() => scrollToSection('contact')}
        className='text-gray-70 border-green-500 px-3 py-2'
      >
        Kontak
      </Button>
    </div>
  );
};
