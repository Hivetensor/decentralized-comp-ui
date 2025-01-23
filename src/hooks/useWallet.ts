// hooks/useWallet.ts
'use client';

import { useState, useEffect } from 'react';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';

export const useWallet = () => {
    const [address, setAddress] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    // Move browser-specific code into useEffect
    useEffect(() => {
        // Check if previously connected
        const savedAddress = localStorage.getItem('wallet_address');
        if (savedAddress) {
            setAddress(savedAddress);
        }
    }, []);

    const connectWallet = async () => {
        if (typeof window === 'undefined') {
            throw new Error('Cannot connect wallet server-side');
        }

        setIsConnecting(true);
        try {
            // Check if extension is installed
            const extensions = await web3Enable('HiveTensor Competitions');
            if (extensions.length === 0) {
                // Add more helpful message
                throw new Error(
                    'No wallet extension found! Please install the PolkadotJS extension: ' +
                    'https://polkadot.js.org/extension/'
                );
            }

            const accounts = await web3Accounts();
            if (accounts.length === 0) {
                throw new Error('No accounts found. Please create an account in your wallet.');
            }

            const account = accounts[0];
            setAddress(account.address);
            localStorage.setItem('wallet_address', account.address);

            return account.address;
        } catch (error) {
            console.error("Failed to connect wallet:", error);
            throw error;
        } finally {
            setIsConnecting(false);
        }
    };

    return {
        address,
        isConnecting,
        connectWallet,
        disconnectWallet: () => {
            setAddress(null);
            localStorage.removeItem('wallet_address');
        },
        isConnected: !!address
    };
};