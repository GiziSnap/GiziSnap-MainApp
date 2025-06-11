'use client';  

import { useEffect, useState } from 'react';  
import { toast } from 'sonner';  
import { env } from '@/env';  
import { subscribeUser } from '@/components/action/action';  
import { useUserData } from '@/features/dashboard/utils/useUserData';  

const NotificationPermissionRequest = () => {  
  const [isSupported, setIsSupported] = useState(false);  
  const { userInfo } = useUserData();  

  useEffect(() => {  
    const checkSupport = () => {  
      if ('serviceWorker' in navigator && 'PushManager' in window) {  
        setIsSupported(true);  
        void registerServiceWorker();  
      } else {  
        setIsSupported(false);  
        toast.error('Push notifications are not supported in this browser.');  
      }  
    };  

    const registerServiceWorker = async () => {  
      try {  
        const registration = await navigator.serviceWorker.register('/sw.js', {  
          scope: '/',  
          updateViaCache: 'none',  
        });  
        
        // Cek status izin notifikasi di localStorage  
        const permissionStatus = localStorage.getItem('notificationPermission');  

        if (permissionStatus !== 'granted') {  
          const permission = await Notification.requestPermission();  
          localStorage.setItem('notificationPermission', permission);  

          if (permission === 'granted') {  
            toast.success('Anda telah mengizinkan notifikasi.');  

            const sub = await registration.pushManager.subscribe({  
              userVisibleOnly: true,  
              applicationServerKey: urlBase64ToUint8Array(env.NEXT_PUBLIC_VAPID_PUBLIC_KEY),  
            });  

            await subscribeUser(sub, userInfo);  
            toast.success('Push notifications have been enabled!');  
          } else if (permission === 'denied') {  
            toast.error('Notifikasi diblokir. Anda dapat mengizinkan notifikasi di pengaturan browser.');  
          } else {  
            toast.info('Izin notifikasi diabaikan. Anda dapat mengizinkan notifikasi di pengaturan browser.');  
          }  
        } else {  
          toast.info('Anda telah memberikan izin notifikasi sebelumnya.');
        }  
      } catch (error) {  
        console.error('Error during service worker registration or subscription:', error);  
        toast.error('Terjadi kesalahan saat mendaftarkan notifikasi.');  
      }  
    };  

    checkSupport();  
  }, [userInfo]);

  if (!isSupported) {  
    return null;  
  }  

  return null; 
};  

function urlBase64ToUint8Array(base64String: string): Uint8Array {  
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);  
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');  
  const rawData = window.atob(base64);  
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));  
}  

export default NotificationPermissionRequest;