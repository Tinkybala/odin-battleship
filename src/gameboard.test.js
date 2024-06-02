import expect from "expect";
import { gameboard } from "./gameboard";

let board;
afterEach(() =>{
    board = gameboard();
})

describe("setShip", () =>{
    let start = {x: 0, y: 0};
    let end = {x: 0, y: 1};  
    beforeEach(() =>{ 
        board = gameboard();
        board.setShip(start, end, 2);
    })
    

    test("added first ship correctly", () =>{
        expect(board.matrix).toEqual([[2, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                                                [2, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                                                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                                                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                                                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                                                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                                                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                                                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                                                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                                                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]]);
    })

    test("ship is added to ships array", () =>{
        expect(typeof board.getShips()[0]).toBe("object");
    })
});



describe("receiveAttack function", () =>{
    let missed = {x: 0, y: 5};
    let ship1 = {x: 1, y: 0};

    //create ships and put on map
    beforeEach(() =>{
        board.setShip({x: 0, y: 0}, {x: 0, y: 1}, 0);
        board.setShip(ship1, ship1, 1);
    })


    test("missed attack updates matrix spot to -2", () =>{
        board.receiveAttack(missed);
        expect(board.matrix[missed.y][missed.x]).toBe(-2);
    });

    test("matrix updated to Infinity when hit", () =>{
        board.receiveAttack(ship1);
        expect(board.matrix[ship1.y][ship1.x]).toBe(Infinity);
    });

    test("hit method is called on correct ship when ship is hit", () =>{
        board.receiveAttack(ship1);
        expect(board.getShips()[1].getHitCount()).toBe(1);
        expect(board.getShips()[1].getIndex()).toBe(1);
    })
})

test("gameOver function works", () =>{
    board.setShip({x: 0, y: 0}, {x: 0, y: 0},  0);
    board.receiveAttack({x: 0, y: 0});
    expect(board.gameOver()).toBe(true);
})




