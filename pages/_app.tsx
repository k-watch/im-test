import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import initStyles from '@src/styles/initStyles';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { store } from '@src/store';
import { Global } from '@emotion/react';
import { ComponentType, ReactElement, ReactNode } from 'react';
import type { AppInitialProps } from 'next/app';

import Layout from '@src/components/common/Layout';

type NextPageWithLayout = ComponentType<AppInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Global styles={initStyles} />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>
            {getLayout(<Component {...pageProps} />)}
          </Provider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
