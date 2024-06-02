import expect from 'expect';
import {ship} from './ship';


describe('ship test', () =>{
    let boat;
    beforeAll(() =>{
        boat = ship(2, 0);
    });


    test("ship length is correct", () =>{
        expect(boat.getLength()).toBe(2);
    });

    test("index is correct", () =>{
        expect(boat.getIndex()).toBe(0);
    })

    test("hit increases hitCount by 1", () =>{
        boat.hit();
        expect(boat.getHitCount()).toBe(1);
    });

    test("Boat sinks", () =>{
        boat.hit();
        expect(boat.getSunk()).toBe(true);
    })


});

