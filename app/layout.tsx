import PrimaryLayout from '@/components/layouts/primary/PrimaryLayout';
import { GlobalStateProvider } from '@/context/GlobalState/Provider';
import { ToastContainer } from 'react-toastify';
import '../styles/globals.scss';
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body>
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
