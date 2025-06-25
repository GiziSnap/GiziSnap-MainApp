import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Tampilkan prompt untuk instalasi
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      // Mengatur ulang state berdasarkan respons pengguna
      if (outcome === 'accepted') {
        console.log('Installation accepted.');
      } else {
        console.log('Installation dismissed.');
        setIsInstallable(false); // hanya set false jika pengguna menolak
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <>
      {isInstallable && (
        <Button
          onClick={handleInstallClick}
          variant='outline'
          className='h-12 border-green-500 px-6 text-green-500 hover:bg-green-50 hover:text-green-600'
        >
          Install App <Download className='ml-2 h-4 w-4' />
        </Button>
      )}
    </>
  );
};
export default InstallButton;
