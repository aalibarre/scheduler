import { set } from "harmony-reflect";
import {useState} from "react"; 

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial])

    const transition = function(newMode, replace = false) {
        if(!replace) {
        setMode(newMode) 
        const copyHistory = [...history]
        copyHistory.push(newMode)
        setHistory(copyHistory)
        } 
        setMode(newMode)
    }
    const back = function() {
       if(history.length > 1) { 
       const copyHistory = [...history]
       copyHistory.pop()
       setMode(copyHistory[copyHistory.length-1])
       setHistory(copyHistory)
       } 
    }
    return { mode, transition, back };
  }
