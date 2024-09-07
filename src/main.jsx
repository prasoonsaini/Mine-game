import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Balance from './Balance.jsx';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

// ----------

function Main() {
  const handlePlayClick = () => {
    window.location.reload();
  };

  const pageStyles = {
    
  };
  const [balance, setBalance] = useState(0);

  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/XBGykyuPBa4ikRdXabwm_CyEArAHi9OW"}>
        <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <div style={pageStyles}>
                  <Balance balance={balance} setBalance={setBalance}/>
                  <App balance={balance} setBalance={setBalance} />
              </div>
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
    
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
