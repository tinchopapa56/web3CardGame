import React, {useEffect} from 'react'
import {PageHOC} from "../components"
import {useNavigate} from "react-router-dom"

// import {useGlobalContext} from "../context/index.jsx";
import {CustomButton, CustomInput} from "../components";
import styles from "../styles"


function JoinBattle() {

    const navigate = useNavigate();

  return (
    <>
        <h2 className={styles.joinHeadText}> Available Battles</h2>
        <p className={styles.infoText} onClick={()=> navigate("/create-battle")}>Or create a new battle</p>
        
        {/* <div className="flex flex-col mb-5">
            <CustomInput 
                label= "findBattle"
                placehHolder="enter battle name"
                value={battleName}
                handleValueChange={setBattleName}
            />
            <CustomButton
            title="Join Battle"
            handleClick= {handleClick}
            restStyles= "mt-6"
            />
        </div> */}
    </>
  )
}

export default PageHOC(
    JoinBattle,
    <>Join <br /> Primera (title)</>,
    <>Join already existing, battles (description)</>
)
