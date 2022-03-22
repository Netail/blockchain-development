import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

const Home: NextPage = () => {
    const [account, setAccount] = useState<string>();

    useEffect(() => {
        const load = async () => {
            const web3 = new Web3(Web3.givenProvider || 'https://localhost:7545/');
            const accounts = await web3.eth.requestAccounts();

            setAccount(accounts[0]);
        }

        load();
    }, []);

    return (
        <>
            <Head>
                <title>Foodtracker</title>
                <meta name='description' content='Ethereum Tikkie' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>
                <h1>Hallo</h1>
                <p>{ account }</p>
            </main>
        </>
    );
};

export default Home;
