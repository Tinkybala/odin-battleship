import {ship} from './ship';

const gameboard = function(){
    let matrix = Array(10).fill().map(() => Array(10).fill(-1));
    let ships = [];

    const getShips = () => ships;
    const setShips = (arr) => ships = arr;

    const setShip = function(start, end, index){
        let length = 0;
        //vertical placement
        if(start.x === end.x){
            length = end.y - start.y + 1;
            for(let i=start.y; i <= end.y; i++){
                matrix[i][start.x] = index;
            }
        }
        //horizontal placement
        else if(start.y === end.y){
            length = end.x - start.x + 1;
            for(let i=start.x; i <= end.x; i++){
                matrix[start.y][i] = index;
            }
        }

        //create ship object and add to ships
        ships.push(ship(length, index));
    };

    const receiveAttack = function(coord){
        //hit
        if(matrix[coord.y][coord.x] !== -1){
            ships[matrix[coord.y][coord.x]].hit();
            matrix[coord.y][coord.x] = Infinity;
            return matrix[coord.y][coord.x];
        }
        //miss
        else{
            matrix[coord.y][coord.x] = -2;
            return -1;
        }
    };

    const gameOver = function(){
        ships.forEach(ship => {
            if(!ship.isSunk()) return false;
        })
        return true;
    }

    return {matrix, setShip, receiveAttack, setShips, getShips, gameOver};
};


export {gameboard};