import { atom } from "recoil";

interface QueueMusic {
    
}



const musicAtom = atom({
    key: 'musicAtom', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});

export {musicAtom}