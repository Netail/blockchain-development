import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { createContext } from 'react';

const App = ({ Component, pageProps }: AppProps) => {
    const Web3Context = createContext({
        wallet: undefined,
    });

    return (
        <Component {...pageProps} />
    );
};

export default App;
