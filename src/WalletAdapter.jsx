import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletConnectButton,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

const walletButton = {
    display: 'flex',
    justifyContent: 'space-between', // Pushes the items to opposite ends
    alignItems: 'center', // Vertically centers the items
    width: '100%', // Ensures the header takes up the full width of the container
    padding: '10px 10px',
}

function WalletAdapter() {
  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/XBGykyuPBa4ikRdXabwm_CyEArAHi9OW"}>
        <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
                <WalletMultiButton/>
                <WalletDisconnectButton/>
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
);
}

export default WalletAdapter;
