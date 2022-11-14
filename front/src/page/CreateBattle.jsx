import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

import { useGlobalContext } from '../context/index.jsx';
import {CustomButton, CustomInput, PageHOC} from "../components";
import styles from '../styles/index.js';

const CreateBattle = () => {
  const {contract, battleName, setBattleName} = useGlobalContext();
  const navigate = useNavigate();

  const handleClick = async()=>{
    if(!battleName || !battleName.trim()) return null;
    try {
      const battle =  await contract.createBattle(battleName);
      
    }
    catch(error){

    }
  }

  return (
    <>
      <div className='flex flex-col mb-5'>
        <CustomInput 
          label="Battle"
          placeholder="Enter Battle Name"
          value={battleName}
          handleValueChange={setBattleName}
        />
        <CustomButton
          title="Create Battle"
          handleClick={handleClick}
          restStyles="mt-6"
        />
        <p 
          className={styles.infoText}
          onClick={() => navigate("/join-battle")}>Or join already existing battles
        </p>
      </div>
    </>
  )
}

export default PageHOC(
    CreateBattle,
    <>Create a new Battle</>,
    <>Create your own battle & wait others players to join you</>
)
