

import React, {createContext, useContext,
useEffect, useRef, useState} from "react"
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import {useNavigate} from "react-router-dom"

import {ABI, ADDRESS} from "../contract";
import { createEventListeners } from "./createEventListeners";

const GlobalContext = createContext();

export const GlobalContextProvider = ({children}) =>{
  const [walletAddress, setWalletAddress] = useState('');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [showAlert, setShowAlert] = useState({ status: false, type: 'info', message: '' });
  const [battleName, setBattleName] = useState("");

  const navigate = useNavigate();
  
    //* Set the wallet address to the state
  const updateCurrentWalletAddress = async () => {
    const accounts = await window?.ethereum?.request({ method: 'eth_accounts' });

    if (accounts) setWalletAddress(accounts[0]);
  };
  useEffect(() => {
    updateCurrentWalletAddress();

    window?.ethereum?.on('accountsChanged', updateCurrentWalletAddress);
  }, []);
    //* Set the smart contract and provider to the state
useEffect(() => {
    const setSmartContractAndProvider = async () => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const web3Provider = new ethers.providers.Web3Provider(connection);
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        const contract = new ethers.Contract(ADDRESS, ABI, signer);

        setProvider(web3Provider);
        setContract(contract);
    };
    setSmartContractAndProvider();
    // const timer = setTimeout(() => setSmartContractAndProvider(), [1000]);
    // return () => clearTimeout(timer);
}, []);
    
useEffect(()=>{
  if(contract) {
    createEventListeners({
      navigate, contract, provider, 
      walletAddress, setShowAlert,
    })
  }
},[contract])
    //* Handle alerts
  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: 'info', message: '' });
      }, [5000]);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);


    return (
        <GlobalContext.Provider value={{
            contract, walletAddress,
            showAlert, setShowAlert,
            battleName, setBattleName
        }}>
            {children}
        </GlobalContext.Provider>
    )
} 

export const useGlobalContext = () => useContext(GlobalContext);
