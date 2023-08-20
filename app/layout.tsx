import FacebookPixel from '@/components/FacebookPixel/FacebookPixel';
import PrimaryLayout from '@/components/layouts/primary/PrimaryLayout';
import { GlobalStateProvider } from '@/context/GlobalState/Provider';
import { Analytics } from '@vercel/analytics/react';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';
import '../styles/globals.scss';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
});

export const metadata = {
  title: 'English Helper',
  description: 'English Helper',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <Script
        id="gtag-script-import"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload" id="gtag-script">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());        
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>

      <body className={poppins.className}>
        <style global>
          {`
          * {
            font-family: ${poppins.style.fontFamily};
          }
        `}
        </style>
        <FacebookPixel></FacebookPixel>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
        />
        <GlobalStateProvider>
          <PrimaryLayout>{children}</PrimaryLayout>
          <Analytics />
        </GlobalStateProvider>
      </body>
    </html>
  );
}
