import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { getServerAuthSession } from '@/lib/auth';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const session = await getServerAuthSession();
      if (!session?.id) {
        throw new Error('Unauthorized');
      }

      return { userId: session.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId);
      console.log('file url', file.url);

      // Kembalikan data ini ke sisi klien (browser)
      // Termasuk `fileUrl` agar bisa digunakan di form sisi klien
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
