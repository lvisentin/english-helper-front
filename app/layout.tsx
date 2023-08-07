import FacebookPixel from '@/components/FacebookPixel/FacebookPixel';
import PrimaryLayout from '@/components/layouts/primary/PrimaryLayout';
import { GlobalStateProvider } from '@/context/GlobalState/Provider';
import { Poppins } from 'next/font/google';
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
      <body className={poppins.className}>
        <style global>
          {`
          * {
            font-family: ${poppins.style.fontFamily};
          }
        `}
        </style>
        {/* PIXEL */}
        <FacebookPixel />
        <noscript>
          <img
            height="1"
            width="1"
            className="hidden"
            src="https://www.facebook.com/tr?id=971543387368976&ev=PageView&noscript=1"
          />
        </noscript>
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
        </GlobalStateProvider>
      </body>
    </html>
  );
}
