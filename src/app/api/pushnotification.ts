import { env } from '@/env';
import { type NextApiRequest, type NextApiResponse } from 'next';
import webpush from 'web-push';

interface NotificationRequest {
  subscription: PushSubscription;
  message: object;
}

webpush.setVapidDetails(
  '',
  env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  env.VAPID_PRIVATE_KEY,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { subscription, message }: NotificationRequest =
    req.body as NotificationRequest;

  try {
    await webpush.sendNotification(subscription, message);
    return res
      .status(200)
      .json({ success: true, message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    return res
      .status(500)
      .json({ success: false, error: 'Failed to send notification' });
  }
}
