import './style.css'
import {player} from './player';

let turn = 1;
const coord = (a, b) => ({x: a, y: b});

const player1 = player();
player1.getBoard().setShip(coord(0,0), coord(0,4), 0);
player1.getBoard().setShip(coord(2,0), coord(2,3), 1);
player1.getBoard().setShip(coord(6,5), coord(9,5), 2);

const player2 = player();
player2.getBoard().setShip(coord(0,0), coord(0,8), 0);
player2.getBoard().setShip(coord(2,0), coord(2,3), 1);
player2.getBoard().setShip(coord(4,5), coord(9,5), 2);



configure();
hide();




//hides player ui depending on turn
function hide(){
    const rightCells = document.querySelectorAll("#right .cell");
    const leftCells = document.querySelectorAll("#left .cell");

    if(turn % 2 === 1){
        rightCells.forEach(cell => {
            if(cell.style.backgroundColor !== 'red' && cell.style.backgroundColor !== "black") cell.style.backgroundColor = "grey";
           
        });
        let board = document.querySelector("#right .board");
        for(let i=0; i < 100; i++){
            let cell = rightCells[i];
            cell.addEventListener("click", () => {
                action(cell, player2.getBoard(), coord(i%10, Math.floor(i/10)), board);
                hide();
        });
        }
        
    }
    else{
        leftCells.forEach(cell => {
            if(cell.style.backgroundColor !== 'red' && cell.style.backgroundColor !== "black") cell.style.backgroundColor = "grey";
        });
        let board = document.querySelector("#left .board");
        for(let i=0; i < 100; i++){
            let cell = leftCells[i];
            cell.addEventListener("click", () =>{
                action(cell, player1.getBoard(), coord(i%10, Math.floor(i/10)), board);
                hide();
        });
        }
        
    }
}


function action(cell, gameboard, coord, board){
    let result = gameboard.receiveAttack(coord);
    if(result >= 0) cell.style.backgroundColor = 'red';
    else cell.style.backgroundColor = 'black'; 
    let newBoard =  displayBoard(gameboard, 10);
    let parent = board.parentElement;
    parent.removeChild(board)
    parent.appendChild(newBoard);
    turn++;
}


//display gameboard
function displayBoard(gameboard, size){
    let matrix = gameboard.matrix
    const board = document.createElement("div");
    board.classList.add('board');

    //create outer div
    for(let i=0; i < size; i++){
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        board.appendChild(rowDiv);

        //create inner div
        for(let j=0; j < size; j++){
            let cell = document.createElement("div");
            cell.classList.add("cell");

            //check cells
            //missed cell
            if(matrix[i][j] === -2){
                cell.style.backgroundColor = 'black';
            }
            //hit cell
            else if(matrix[i][j] === Infinity){
                cell.style.backgroundColor = 'red';
            }
            //ship cell
            else if(matrix[i][j] !== -1){
                cell.style.backgroundColor = 'green';
            }

            //event listeners
            cell.addEventListener("pointerenter", () => cell.style.opacity = '0.7');
            cell.addEventListener("pointerleave", () => cell.style.opacity = '1');

            
            rowDiv.appendChild(cell);
        }
    }
    

    return board;
}
 



//display configuration page
function configure(){
    //create name input
    const leftName = document.createElement("input");
    const rightName = document.createElement("input");

    //insert name input
    const left = document.getElementById("left");
    left.appendChild(leftName);

    const right = document.getElementById("right");
    right.appendChild(rightName);

    //create buttons
    const leftDoneBtn = document.createElement("button");
    const rightDoneBtn = document.createElement("button");
    leftDoneBtn.textContent = "done";
    rightDoneBtn.textContent = "done";

    //insert buttons
    left.appendChild(leftDoneBtn);
    right.appendChild(rightDoneBtn);

    //generate board display
    const leftBoard = displayBoard(player1.getBoard(), 10);
    const rightBoard = displayBoard(player2.getBoard(), 10);

    //insert board display
    left.appendChild(leftBoard);
    right.appendChild(rightBoard);
}

