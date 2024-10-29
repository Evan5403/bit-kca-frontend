import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import {Web3} from 'web3';

const ADDRESS = "0xd62A49ea8BA9c86480852FdE0cffF141B3E05b46";
const ABI = [{"inputs":[{"internalType":"uint256","name":"y","type":"uint256"},{"internalType":"string","name":"x","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"decreaseNum","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"increaseNum","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newMessage","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}];

function App() {
  const [number, setNumber] = useState("none");
  const [currentMessage, setCurrentMessage] = useState("none");
  const [newMessage, setNewMessage] = useState("");

  // initialize web3 object
  const web3 = new Web3(window.ethereum);
  const myContract = new web3.eth.Contract(ABI, ADDRESS); // initialize contract

  // reading function
  // number
  async function getNumber(){
    const result = await myContract.methods.getNumber().call();
    setNumber(result.toString());
  }
  // message
  async function getMessage(){
    const message = await myContract.methods.message().call();
    setCurrentMessage(message);
  }

  // update functions
  // number
  async function increaseNum(){
    // connect the acc i.e wallet
    const accountsConnected = await web3.eth.requestAccounts();
    const tx = await myContract.methods.increaseNum().send({ from: accountsConnected[0] });
    getNumber();
  }
  async function decreaseNum(){
    // connect the acc i.e wallet
    const accountsPresent = await web3.eth.requestAccounts();
    const transact = await myContract.methods.decreaseNum().send({ from: accountsPresent[0] });
    getNumber();
  }
  // update message
  async function updateMessage(){
    // connect the acc i.e wallet
    const connectedAccounts = await web3.eth.requestAccounts();
    const transaction = await myContract.methods.setMessage(newMessage).send({ from: connectedAccounts[0] });
    getNumber();
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo"/>
        <button onClick={getNumber}>Get Number</button> <br/>
        <button onClick={increaseNum}>Increase Number</button> <br/>
        <button onClick={decreaseNum}>Decrease Number</button> <br/>
        <p>Number: {number}</p>
        <button onClick={getMessage}>Get Message</button> <br/>
        <p>Message: {currentMessage}</p>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder='Enter New Message'
         /> <br/>
        <button onClick={updateMessage}>Update Message</button> <br/>
      </header>
    </div>
  );
}

export default App;
