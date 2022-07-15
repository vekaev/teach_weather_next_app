import type { AppProps } from 'next/app';

import { wrapper } from '~redux/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);
