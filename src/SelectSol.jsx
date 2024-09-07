
import './App.css';
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import React, { useState } from 'react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { Buffer } from 'buffer';
window.Buffer = Buffer;


function SelectSol({amount, balance, startingPrice, setBalance, justCashedOut}) {
    const wallet = useWallet();
    console.log("ffewdcwed",wallet.publicKey)
    const {connection} = useConnection();

  const [price, setPrice] = useState(1);
  const [clickable,setClickable] = useState(true);
  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\s?SOL$/, '');
    setPrice(value ? parseFloat(value) : 1);
    startingPrice=price;
    if(price>=1)
    setClickable(true);
    else 
    setClickable(false);
  };

  const handleSliderChange = (e) => {
    setPrice(e.target.value);
    startingPrice=price;
    console.log("pppppppcdww",price);
    if(price>=1 )
    setClickable(true);
    else
    setClickable(false);
  };
  
  async function setBetAmount() {
    try {
      // Set initial values
      let to = "J7P51a6NspNpbiWjgDaDZenR8sKiUpE9fzTuNMYC1Nfb"
      // Create a new transaction
      const transaction = new Transaction();
      console.log("price",price)
      setClickable(false);
      // Add the transfer instruction to the transaction
      const pub = new PublicKey(to)
      console.log("ppppp",pub)
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(to),
          lamports: price * LAMPORTS_PER_SOL, // Convert SOL to lamports
        })
      );
      console.log("transcation",transaction)
      // Send the transaction using the wallet
      await wallet.sendTransaction(transaction, connection);
      
      amount(price);
      setPrice(0);
      
      setBalance(+balance- +price); // Ensure proper subtraction of balance

      // Success message
    //   alert(`Sent ${price} SOL to ${to}`);
    } catch (error) {
      // Handle transaction errors
      console.error("Transaction failed:", error);
      console.log("Transaction failed: " + error.message); // Display an error message to the user
    }
  }
  
   
  if(justCashedOut) {
    setPrice(0);
    console.log("just cashed out")
  }
  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    textTransform: 'uppercase',
  };
  const nonClickable = {
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    pointerEvents: 'none',
    opacity: '0.6',
    cursor: 'not-allowed'
  }
  return (
    <div className="SelectSol">
      <div className="number-input">
        <input 
          type="text" 
          value={`${price} SOL`} 
          onChange={handleInputChange} 
          placeholder="Enter a number" 
        />
      </div>
      
      <div className="slider-container">
        <input 
          type="range" 
          min="1" 
          max="100" 
          value={price} 
          onChange={handleSliderChange} 
          id="priceSlider" 
          step="1" 
        />
      </div>
      {clickable ? <button style={buttonStyle} onClick={setBetAmount}>Bet</button> : <button style={nonClickable} onClick={setBetAmount}>Bet</button>}
    </div>
  );
}

export default SelectSol;