//Generates a random number in a range (min and max included)

function randomNum(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

export {randomNum};