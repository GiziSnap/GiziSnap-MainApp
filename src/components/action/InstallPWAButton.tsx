import { useEffect, useState } from 'react';  
import { Button } from '@/components/ui/button';  
import { Download } from 'lucide-react';  

interface BeforeInstallPromptEvent extends Event {  
    prompt: () => Promise<void>;  
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;  
}  

const InstallButton = () => {  
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);  
    const [isInstallable, setIsInstallable] = useState(false);  

    useEffect(() => {  
        const handleBeforeInstallPrompt = (e: Event) => {  
            e.preventDefault(); 
            console.log("beforeinstallprompt event fired");  
            setDeferredPrompt(e as BeforeInstallPromptEvent);  
            setIsInstallable(true);  
        };  

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);  

        return () => {  
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);  
        };  
    }, []);  

    const handleInstallClick = async () => {  
        if (deferredPrompt) {  
            // Tampilkan prompt untuk instalasi  
            await deferredPrompt.prompt();  
            const { outcome } = await deferredPrompt.userChoice;  
            console.log(`User response to the install prompt: ${outcome}`);  

            // Mengatur ulang state berdasarkan respons pengguna  
            if (outcome === 'accepted') {  
                console.log("Installation accepted.");  
            } else {  
                console.log("Installation dismissed.");  
                setIsInstallable(false);  // hanya set false jika pengguna menolak  
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
                    className='h-12 px-6 text-green-500 border-green-500 hover:bg-green-50 hover:text-green-600'  
                >  
                    Install App <Download className='w-4 h-4 ml-2' />  
                </Button>  
            )}  
        </>  
    );  
};  
export default InstallButton;