import { useEffect, useState } from 'react';
import { subscribeUser, unsubscribeUser } from '../action/action';
import { useUserData } from '@/features/dashboard/utils/useUserData';
import { env } from '@/env';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export function PushNotificationManager() {
    const [isSupported, setIsSupported] = useState(false);
    const [subscription, setSubscription] = useState<PushSubscription | null>(null);
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

        checkSupport();
    }, []);

    useEffect(() => {
        const storedData = localStorage.getItem('pushSubscriptionData');
        if (storedData) {
            const { subscription } = JSON.parse(storedData) as { subscription: PushSubscription };

            if (Notification.permission === 'granted') {
                setSubscription(subscription);

            } else {
                localStorage.removeItem('pushSubscriptionData');
                toast.warning('Push notifications permission was not granted. Subscription data has been removed.');
            }
        }
    }, []);

    async function registerServiceWorker() {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none',
        });

        const sub = await registration.pushManager.getSubscription();
        if (sub) {
            setSubscription(sub);
        }
    }

    async function subscribeToPush() {
        try {
            const registration = await navigator.serviceWorker.ready;

            const permission = await Notification.requestPermission();

            if (permission !== 'granted') {
                throw new Error('Permission not granted for Notification');
            }

            const sub = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                    env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
                ),
            });

            await subscribeUser(sub, userInfo);

            localStorage.setItem('pushSubscriptionData', JSON.stringify({ subscription: sub }));
            setSubscription(sub);

            toast.success('Push notifications have been enabled!');
        } catch (error) {
            console.error('Error during subscription:', error);

            if (error instanceof Error && error.message === 'Permission not granted for Notification') {
                toast.warning('You have denied permission for notifications.');
            } else {
                toast.error('An error occurred while subscribing to notifications.');
            }
        }
    }

    async function unsubscribeFromPush() {
        if (subscription) {
            try {
                if (typeof subscription.unsubscribe === 'function') {
                    await subscription.unsubscribe();
                    setSubscription(null);
                    await unsubscribeUser();

                    localStorage.removeItem('pushSubscriptionData');

                    toast.warning('Push notifications have been disabled!');
                } else {
                    console.warn('Subscription object does not have an unsubscribe method.');
                    toast.error('Unable to unsubscribe from notifications.');
                }
            } catch (error) {
                console.error('Error during unsubscribe:', error);
                toast.error('An error occurred while trying to unsubscribe.');
            }
        } else {
            console.warn('No active subscription found.');
            toast.error('No active subscription to unsubscribe from.');

            localStorage.removeItem('pushSubscriptionData');
        }
    }

    if (!isSupported) {
        return null;
    }

    return (
        <div>
            {subscription ? (
                <>
                    <Button variant={'outline'} className='border-none p-0 hover:bg-transparent cursor-pointer' onClick={unsubscribeFromPush}>Unsubscribe</Button>
                </>
            ) : (
                <>
                    <Button variant={'outline'} className='border-none p-0 hover:bg-transparent cursor-pointer' onClick={subscribeToPush}>Subscribe</Button>
                </>
            )}
        </div>
    );
}

// Utility function to convert Base64 to Uint8Array
function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}