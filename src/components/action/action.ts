import type { UserInformationSchema } from "@/features/dashboard/types";
import icon from "@/../public/icon512_rounded.png";

type UserSubscriptionData = {
    userinformation: UserInformationSchema;
    subscription: string;
}

type PushSubscription = {
    endpoint: string;
}

const iconUrl = icon.src;

export const subscribeUser = async (subscription: PushSubscription, userInfo: UserInformationSchema): Promise<void> => {
    const serializedSubscription = JSON.stringify(subscription);
    const userData: UserSubscriptionData = { userinformation: userInfo, subscription: serializedSubscription };

    localStorage.setItem('pushSubscriptionData', JSON.stringify(userData));

    console.log('Subscribed user:', userData);
};

export const unsubscribeUser = async () => {
    localStorage.removeItem('pushSubscriptionData');
    console.log('User unsubscribed');
};

interface NotificationMessage {
    title?: string;
    body: string;
}

export const sendNotification = async (message: NotificationMessage | string, body: string , name: string): Promise<void> => {
    const messageText = typeof message === 'string' ? message : message.body;
    const registration = await navigator.serviceWorker.getRegistration();
    
    if (registration) {
        await registration.showNotification(messageText, { 
            icon: iconUrl,
        });
    } else {
        throw new Error('Service Worker registration not found.');
    }
};