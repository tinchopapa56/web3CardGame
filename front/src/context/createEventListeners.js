import { ethers } from "ethers";
import { getJsonWalletAddress } from "ethers/lib/utils";

import {ABI} from "../contract";

const AddNewEvent = (eventFilter, provider, callback) =>{
    provider.removeListener(eventFilter); //not have multiple
    
    provider.on(eventFilter, (logs) => {
        const parsedLog = (new ethers.utils.Interface(ABI)).parseLog(logs);
        callback(parsedLog);
    })
}
export const createEventListeners = ({navigate, contract, provider,
walletAddress, setShowAlert})=>{
    const NewPlayerEventFilter = contract.filters.NewPlayer();
    AddNewEvent(NewPlayerEventFilter, provider, ({args}) =>{
        console.log("New Player created", args);

        if(walletAddress === args.owner) {
            setShowAlert({
                status: true,
                tpe: "success",
                message:"Desde cvreateeventListener, player created succesfully"
            })
        }
    })



}