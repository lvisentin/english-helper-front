import { ThemeProvider } from '@/context/Theme/Provider';
import { ThemeContext } from '@/context/Theme/ThemeContext';
import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static contextType = ThemeContext;

  render() {
    return (
      <ThemeProvider>
        <Html
          data-theme={(this.context as any)?.theme.darkMode ? 'dark' : 'light'}
        >
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap"
              rel="stylesheet"
            />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      </ThemeProvider>
    );
  }
}

export default MyDocument;
