import { gameboard } from "./gameboard";

const player = function(type){
    const board = gameboard();

    const getType = () => type;
    const getBoard = () => board;
    

    return {getType, getBoard};
}



export {player};