import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import initStyles from '@src/styles/initStyles';
import { createEmotionCache } from '@src/utils/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@src/styles/theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { store } from '@src/store';
import { Global } from '@emotion/react';
import { ComponentType, ReactElement, ReactNode } from 'react';
import type { AppInitialProps } from 'next/app';

import Layout from '@src/components/common/Layout';

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = ComponentType<AppInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <CacheProvider value={emotionCache}>
        <Global styles={initStyles} />
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <ReactQueryDevtools initialIsOpen={false} />
              <CssBaseline />
              <Provider store={store}>
                {getLayout(<Component {...pageProps} />)}
              </Provider>
            </Hydrate>
          </QueryClientProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default MyApp;
