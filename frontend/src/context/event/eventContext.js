import { createContext, useContext, useState } from "react";


const EventContext = createContext();


export const EventProvider = ({children})=>{

    const [eventData,setEventData]= useState({
        events:[],
    });

    const createNewEvent = (event) =>{
        setEventData({
            ...eventData,
            events:[...eventData.events,event]
        });
    }
    return <EventContext.Provider value={{eventData,createNewEvent}}>
        {children}
    </EventContext.Provider>
}

export const useEvent= ()=>useContext(EventContext);