// hooks/useWallet.ts
import {useEffect, useState} from 'react';
import {web3Accounts, web3Enable} from '@polkadot/extension-dapp';

export const useWallet = () => {
    const [address, setAddress] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        const savedAddress = localStorage.getItem('wallet_address');
        if (savedAddress) {
            setAddress(savedAddress);
        }
    }, []);


    const connectWallet = async () => {
        setIsConnecting(true);
        try {
            // Enable Polkadot.js extension
            const extensions = await web3Enable('HiveTensor Competitions');
            if (extensions.length === 0) {
                throw new Error('No wallet extension found! Please install PolkadotJS extension.');
            }

            // Get all accounts
            const accounts = await web3Accounts();
            if (accounts.length === 0) {
                throw new Error('No accounts found. Please create an account in your wallet.');
            }

            // For MVP, just use the first account
            const account = accounts[0];
            setAddress(account.address);
            localStorage.setItem('wallet_address', account.address);

        } catch (error) {
            console.error("Failed to connect wallet:", error);
            throw error;
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnectWallet = () => {
        setAddress(null);
        localStorage.removeItem('wallet_address');
    };

    return {
        address,
        isConnecting,
        connectWallet,
        disconnectWallet,
        isConnected: !!address
    };


};