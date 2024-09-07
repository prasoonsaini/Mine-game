import { useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import {
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between', // Pushes the items to opposite ends
    alignItems: 'center', // Vertically centers the items
    width: '100%', // Ensures the header takes up the full width of the container
    padding: '10px 20px', // Optional padding for spacing
    // backgroundColor: '#333', // Optional background color
    color: 'black', // Optional text color
    position: 'relative', // Ensures absolute positioning inside if needed
  };


  function Balance({ balance, setBalance }) {
    const wallet = useWallet();
    const { connection } = useConnection();
  
    useEffect(() => {
      const fetchBalance = async () => {
        if (wallet.publicKey) {
          try {
            const bal = await connection.getBalance(wallet.publicKey); // Await the async function
            console.log("bal", bal);
            setBalance((bal / LAMPORTS_PER_SOL).toFixed(2));
 // Set the balance after fetching
          } catch (error) {
            console.error("Error fetching balance:", error);
          }
        }
      };
  
      fetchBalance(); // Call the async function when the component mounts or updates
    }, [wallet.publicKey]); // Dependencies for useEffect
  
    return (
      <div className="Balance" style={headerStyles}>
        <span>Balance {balance} SOL</span>
        <span><WalletMultiButton/></span>
        <span><WalletDisconnectButton/></span>
      </div>
    );
  }

export default Balance;