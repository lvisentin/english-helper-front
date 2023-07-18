import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { usePathname } from 'next/navigation';
import '../styles/globals.scss';
import { NextPageWithLayout } from './page';
config.autoAddCss = false;

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const pageKey = usePathname();

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <AnimatePresence initial={false} mode="popLayout">
      <Component key={pageKey} {...pageProps} />
    </AnimatePresence>
  );
}

export default MyApp;
