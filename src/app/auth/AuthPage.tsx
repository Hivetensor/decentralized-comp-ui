'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Check, Loader2, WalletCards } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface WalletAccount {
  address: string;
  meta: {
    name: string;
    source: string;
  };
}

const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<WalletAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<WalletAccount | null>(null);
  const [isExtensionAvailable, setIsExtensionAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    checkExtension();
  }, []);

  const checkExtension = async () => {
    if (typeof window !== 'undefined') {
      setIsExtensionAvailable(!!window.injectedWeb3?.['polkadot-js']);
    }
  };

  const connectWallet = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Enable the extension
      const { web3Accounts, web3Enable } = await import('@polkadot/extension-dapp');
      const extensions = await web3Enable('Kaggle Clone');
      
      if (extensions.length === 0) {
        throw new Error('No extension found');
      }

      // Get all accounts
      const availableAccounts = await web3Accounts();
      setAccounts(availableAccounts);
      
      if (availableAccounts.length === 0) {
        throw new Error('No accounts found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (account: WalletAccount) => {
    setLoading(true);
    setError(null);
    setSelectedAccount(account);

    try {
      const { web3FromSource } = await import('@polkadot/extension-dapp');
      const injector = await web3FromSource(account.meta.source);
      
      // Generate a random nonce
      const nonce = Math.floor(Math.random() * 1000000).toString();
      const message = `Sign in to Kaggle Clone: ${nonce}`;
      
      const signRaw = injector?.signer?.signRaw;
      
      if (signRaw) {
        const { signature } = await signRaw({
          address: account.address,
          data: Buffer.from(message).toString('hex'),
          type: 'bytes'
        });

        // Here you would typically:
        // 1. Send the signature, message, and address to your backend
        // 2. Verify the signature server-side
        // 3. Create a session/JWT
        // 4. Redirect to dashboard
        
        console.log('Signed successfully:', { signature, address: account.address });
        // Redirect to home page after successful authentication
        window.location.href = '/';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign message');
      setSelectedAccount(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Connect Wallet
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Sign in with your Polkadot wallet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-900">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!isExtensionAvailable && (
            <Alert className="bg-yellow-900/20 border-yellow-900">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Polkadot.js extension not found. Please install it to continue.
              </AlertDescription>
            </Alert>
          )}

          {accounts.length === 0 ? (
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              onClick={connectWallet}
              disabled={loading || !isExtensionAvailable}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <WalletCards className="mr-2 h-4 w-4" />
                  Connect Wallet
                </>
              )}
            </Button>
          ) : (
            <div className="space-y-3">
              {accounts.map((account) => (
                <div
                  key={account.address}
                  className={`p-4 rounded-lg border transition-all cursor-pointer
                    ${selectedAccount?.address === account.address
                      ? 'bg-purple-900/20 border-purple-500'
                      : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                    }`}
                  onClick={() => signIn(account)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">{account.meta.name}</p>
                      <p className="text-sm text-gray-400">
                        {account.address.slice(0, 6)}...{account.address.slice(-4)}
                      </p>
                    </div>
                    {selectedAccount?.address === account.address && (
                      <Badge className="bg-purple-500">
                        <Check className="h-4 w-4" />
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;