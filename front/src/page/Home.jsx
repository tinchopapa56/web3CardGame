import { ContractFactory } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomButton, CustomInput, PageHOC } from '../components';
import { useGlobalContext } from '../context';

const Home = () => {
  const { contract, walletAddress, gameData, setShowAlert, setErrorMessage } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      console.log({ contract })
      let playerExists = await contract.isPlayer(walletAddress);
      console.log(playerExists);

      if (!playerExists) {
        await contract.registerPlayer(playerName, "testeando", /*{ gasLimit: 500000 }*/);

        setShowAlert({
          status: true,
          type: 'info',
          message: `${playerName} is being summoned!`,
        });
      } else {
        alert("tu wallet ya esta registrada");
      }
    } catch (error) {
      console.log("tiro error")
      setShowAlert({
            status: true,
            type: "failure",
            message: error.message
      });
    }
  };

    useEffect(()=>{
      const checkForPlayerToken = async()=>{
        const playerExists = await contract.isPlayer(walletAddress);
        const playerTokenExists = await contract.isPlayerToken(walletAddress);
        console.log({
          playerExists, playerTokenExists
        });
        
        if(playerExists && playerTokenExists){
          const timer = setTimeout(() => navigate('/create-battle'), [1000]);
          return () => clearTimeout(timer);
        }
      }
      if(contract) checkForPlayerToken();
    },[contract])
  // useEffect(() => {
  //   const createPlayerToken = async () => {
  //     const playerExists = await contract.isPlayer(walletAddress);
  //     const playerTokenExists = await contract.isPlayerToken(walletAddress);

  //     if (playerExists && playerTokenExists) navigate('/create-battle');
  //   };

  //   if (contract) createPlayerToken();
  // }, [contract]);

  // useEffect(() => {
  //   if (gameData.activeBattle) {
  //     navigate(`/battle/${gameData.activeBattle.name}`);
  //   }
  // }, [gameData]);

  return (
    walletAddress && (
      <div className="flex flex-col">
        <CustomInput
          label="Name"
          placeHolder="Enter your player name"
          value={playerName}
          handleValueChange={setPlayerName}
        />

        <CustomButton
          title="Register"
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>
    )
  );
};

export default PageHOC(
  Home,
  <>
    Welcome to Avax Gods <br /> a Web3 NFT Card Game
  </>,
  <>
    Connect your wallet to play <br /> the ultimate Web3 Game
  </>,
);




// try{
//   console.log({ contract })
//   const playerExists = await contract.isPlayer(walletAddress);
//   if(!playerExists) {
//     await contract.registerPlayer(playerName, "gameTokenTEST");
//     setShowAlert({
//       status: true,
//       type: "info",
//       message: `${playerName} is being summoned`
//     })
//   }
//   console.log("se ejecuto lyaer exist")
// } catch(err){
//   setShowAlert({
//     status: true,
//     type: "failure",
//     message: err.message
//   });
// }