const ship = function(len, i){
    let index = i;
    let length = len;
    let hitCount = 0;
    let sunk = false;

    const getLength = () => length;
    const getHitCount = () => hitCount;
    const getSunk = () => sunk;
    const getIndex = () => index;


    
    const isSunk = () =>{
        if(length === hitCount) return true;
        return false;
    }

    const hit = () => {
        hitCount++;
        //update sunk status
        if(isSunk()) sunk = true;
    }

    return {getLength, getHitCount, hit, getSunk, getIndex, isSunk};
}

export {ship};