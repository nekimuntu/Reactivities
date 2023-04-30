import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";
import CabinStore from "./CabinStore";

interface Store{
    activityStore:ActivityStore,
    cabinStore:CabinStore
}

export const store:Store ={
    activityStore:new ActivityStore(),
    cabinStore:new CabinStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}