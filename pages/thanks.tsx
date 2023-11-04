/* Hey Toly website landing page > ./pages/index.tsx */
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import code from '@code-wallet/elements';
import { useRouter } from 'next/router';

export default function Home() {

  const router = useRouter();
  const { query } = router;

  // Now you can access query parameters using query object
  // For example, if you have a URL like /my-page?name=Metasal
  // You can access the name query parameter as follows:
  const email = query.email;


  return (
    <main className="flex flex-col md:flex-row items-center justify-between min-h-screen p-4 md:p-8 text-white main-background">

      {/* Left Side - Content */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 py-4 md:py-8">
        {/* App Name */}
        <div className="mb-4">
          <h1 className="mt-4 font-bold text-mobile-title md:text-9xl gradient-text">Hey Toly</h1>
        </div>


      {email &&
<>
 <h1>Thank you! </h1>
<h2>Your email: {email} has been successfully registered</h2>
</>
}
      </div>

      {/* Footer */}
      <footer className="mt-4 md:absolute bottom-0 w-full text-center p-4">
        <p className="text-sm">© 2023 Hey Toly. All Rights Reserved. Built by <a href="https://buildooors.com" target="_blank" rel="noopener noreferrer">Buildooors</a></p>
      </footer>
    </main>
  );
}
