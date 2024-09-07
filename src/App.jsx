import { useState } from 'react';
import './App.css';
import SelectSol from './SelectSol';
import SetGame from './SetGame';
import History from './History';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, sendAndConfirmTransaction, Transaction, Keypair } from "@solana/web3.js";
import { useWallet,useConnection } from "@solana/wallet-adapter-react"

const cashoutStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  fontSize: '16px',
  fontWeight: 'bold',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  textTransform: 'uppercase',
}
const scoreStyle = {
  color: 'black',
  fontSize: '16px',
  fontWeight: 'bold',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  textTransform: 'uppercase',
}
const cashoutStyleOff = {
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

function App({balance, setBalance}) {
  const {connection} = new useConnection(
    "https://solana-devnet.g.alchemy.com/v2/XBGykyuPBa4ikRdXabwm_CyEArAHi9OW",
    "confirmed",
);
const secret = [
  205, 94, 32, 245, 107, 124, 203, 64, 222, 99, 202, 239, 72, 56, 161, 172,
  74, 184, 252, 125, 203, 107, 248, 150, 188, 12, 85, 53, 7, 155, 244, 10,
  254, 57, 29, 194, 195, 13, 184, 199, 199, 74, 167, 239, 111, 139, 103, 39,
  236, 139, 34, 212, 199, 14, 73, 125, 102, 17, 69, 4, 9, 201, 112, 66,
];
//////////////
const to = "6SVyG5zUqwwfmzCS3Z7Lz18mCKWfCw1JL3S3WcGYGuuN";

const wallet = useWallet();
console.log("ffewdcwed",wallet.publicKey)

const from = Keypair.fromSecretKey(new Uint8Array(secret));

  let [gameOver, setGameOver] = useState(false);
  let [score, setScore] = useState(0);
  let [clickable, setClickable] = useState(false);

  let [cashoutOn,setcashoutOn] = useState(false);
  let [justCashedOut,setJustCashedOut] = useState(false);
  const setAmount = (amount) => {
    setScore(amount);
    setcashoutOn(true);
    if(amount<=balance && amount>0)
    setClickable(true);
    else 
    setClickable(false);
  };

  async function DoCashOut() {
        console.log("Transaction called");
       
        
      setBalance(+balance + +score)
      setScore(0);
      setAmount(0);
      setGameOver(true);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: wallet.publicKey,
            lamports: score*LAMPORTS_PER_SOL,
        }),
    );

    // Sign transaction, broadcast, and confirm
    const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [from],
    );
    console.log("SIGNATURE", signature);
      window.location.reload();
  }

  // function DoCashOut(){
  //   setBalance(+balance + +score)
  //   setScore(0.000000000);
  //   setAmount(0.000000000);
  //   setGameOver(true);
  //   /// Do transaction here ------------
  //   window.location.reload();
  // }
  return (
    <>
      <div className='d-flex gap-10'>
        <div>
        </div>
        <div className='totalScore'>
          <button style={scoreStyle}>{score} SOL</button>
          {cashoutOn && !gameOver ? <button style={cashoutStyle} onClick={DoCashOut}>Cashout</button> : <button style={cashoutStyleOff}>Cashout</button>}
          <SelectSol amount={setAmount} balance={balance} justCashedOut={justCashedOut} setBalance={setBalance} gameOver={gameOver}/>
        </div>
        <div className='d-grid'>
          <SetGame setScore={setScore} gameOver={gameOver} setGameOver={setGameOver} clickable={clickable}/>
        </div>
      </div>
    </>
  )
}

export default App;