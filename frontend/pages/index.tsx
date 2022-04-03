import type { NextPage } from 'next';
import type { Contract } from 'web3-eth-contract';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import Web3 from 'web3';
import { contractAddress } from '../constants/contract-address';
import { contractABI } from '../constants/contract-abi';
import Card from '../components/card/card';
import Button from '../components/button/button';

const Home: NextPage = () => {
    const [web3, setWeb3] = useState<Web3>();
    const [account, setAccount] = useState<string>();
    const [contract, setContract] = useState<Contract>();
    const goalRef = useRef<HTMLInputElement>(null);
    const rewardRef = useRef<HTMLInputElement>(null);
    const measurementRef = useRef<HTMLInputElement>(null);

    const initialize = async () => {
        const w3 = new Web3(Web3.givenProvider || 'https://localhost:7545/');
        setWeb3(w3);

        const accounts = await w3.eth.requestAccounts();
        setAccount(accounts[0]);

        const c = new w3.eth.Contract(contractABI, contractAddress);
        setContract(c);
    }

    const handleSetGoal = () => {
        if (!contract) return;

        const goal = Number(goalRef.current?.value);
        const reward = web3?.utils.toWei(rewardRef.current?.value || "0.1", "ether");
        if (goal < 1) {
            alert('Input cannot be lower than 1');
            return;
        }

        contract.methods.setGoal(goal).send({
            from: account,
            value: reward,
        });
    }

    const handleAddMeasurement = () => {
        if (!contract) return;

        const measurement = Number(measurementRef.current?.value);
        if (measurement < 1 || isNaN(measurement)) {
            alert('Input cannot be lower than 1');
            return;
        }

        contract.methods.addMeasurement(measurement).send({
            from: account,
        });
    }

    const handleWithdraw = () => {
        if (!contract) return;

        contract.methods.withdraw().send({
            from: account,
        });
    }

    useEffect(() => {
        initialize();
    }, []);

    return (
        <>
            <Head>
                <title>Weight Tracker</title>
                <meta name='description' content='Ethereum Smart Contract Weight Tracker' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>
                <h1>Weight Tracker</h1>
                {account ?
                    <>
                        <p>Hello, { account }</p>

                        <Card>
                            <h3>Goal</h3>
                            <input type='number' min={0} placeholder='Goal (kg)' ref={goalRef} step={0.1} />
                            <br/><br/>
                            <input type='number' min={0} placeholder='Reward (Eth - default 0.1)' ref={rewardRef} />
                            <br/><br/>
                            <Button text='Set goal' onClick={handleSetGoal} />
                        </Card>

                        <Card>
                            <h3>Measurements</h3>
                            <input type='number' min={0} placeholder='Measurement (kg)' ref={measurementRef} />
                            <br/><br/>
                            <Button text='Add measurement' onClick={handleAddMeasurement} />
                        </Card>

                        <Button text='Withdraw' onClick={handleWithdraw} />
                    </>
                    : <p>Install Metamask to proceed</p>
                }
            </main>
        </>
    );
};

export default Home;
