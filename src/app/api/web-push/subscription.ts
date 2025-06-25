import type { NextRequest } from 'next/server';
import webpush from 'web-push';

let subscription: PushSubscription;

export async function POST(request: NextRequest) {
  const { pathname } = new URL(request.url);
  switch (pathname) {
    case '/api/web-push/subscription':
      return setSubscription(request);
    case '/api/web-push/send':
      return sendPush(request);
    default:
      return notFoundApi();
  }
}

async function setSubscription(request: NextRequest) {
  const body = (await request.json()) as { subscription: PushSubscription };
  subscription = body.subscription;
  return new Response(JSON.stringify({ message: 'Subscription set.' }), {});
}

async function sendPush(request: NextRequest) {
  const body = (await request.json()) as { subscription: PushSubscription };
  const pushPayload = body;
  await webpush.sendNotification(subscription, pushPayload);
  return new Response(JSON.stringify({ message: 'Push sent.' }), {});
}

function notFoundApi() {
  throw new Error('Function not implemented.');
}
