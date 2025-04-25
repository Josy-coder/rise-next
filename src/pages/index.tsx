import Head from 'next/head';
import PublicLayout from '@/components/layout/public-layout';

export default function Home() {
  return (
      <PublicLayout>
        <Head>
          <title>RiseNext | Nonprofit Organization</title>
          <meta name="description" content="RiseNext is a nonprofit organization dedicated to empowering communities through education, innovation, and collaboration." />
        </Head>

        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to RiseNext</h1>
            <p className="text-xl text-gray-600">
              This is the homepage for our nonprofit website.
            </p>
          </div>
        </div>
      </PublicLayout>
  );
}