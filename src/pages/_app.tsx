import { AppInitialProps, AppProps } from 'next/app';
import { ComponentType, ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
  DehydratedState,
} from '@tanstack/react-query';

import { store } from '@src/store';

import Layout from '@src/components/common/Layout';

type NextPageWithLayout = ComponentType<AppInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
  pageProps: AppInitialProps & {
    dehydratedState: DehydratedState;
  };
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
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>
            {getLayout(<Component {...pageProps} />)}
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
