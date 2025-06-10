
declare module 'web-push' {
  interface WebPush {
    setVapidDetails: (email: string, publicKey: string, privateKey: string) => void;
    sendNotification: (subscription: PushSubscription, payload: object) => Promise<object>;
  }

  const webpush: WebPush;

  export default webpush;
}