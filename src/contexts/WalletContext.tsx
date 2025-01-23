// contexts/WalletContext.tsx
"use client";
import { createContext, useContext, ReactNode } from 'react';
import { useWallet } from '@/hooks/useWallet';

type WalletContextType = ReturnType<typeof useWallet>;

// Create the context with an undefined default value
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Provider componenght
export function WalletProvider({ children }: { children: ReactNode }) {
    const wallet = useWallet();

    return (
        <WalletContext.Provider value={wallet}>
            {children}
        </WalletContext.Provider>
    );
}

// Hook to use the wallet context
export function useWalletContext(): WalletContextType {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWalletContext must be used within a WalletProvider');
    }
    return context;
}