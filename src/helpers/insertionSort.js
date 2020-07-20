function insertionSort(arr){
    let animations = [];
    //making a copy coz when we change algo in state it causes rerender and 
    //in this the array passed in as argument is getting changed
    let newArr = arr.slice();
    for(let i=1; i<newArr.length; i++){
        let val = newArr[i];
        let temp = i;
        animations.push(["comparison1",i,i]);
        animations.push(["comparison2",i,i]);
        while( temp>0 && val < newArr[temp-1]){
            animations.push(["swap",temp,newArr[temp-1]]);
            newArr[temp] = newArr[temp-1];
            animations.push(["comparison1",temp,i]);
            animations.push(["comparison2",temp,i]);
            temp--;
        }
        animations.push(["swap",temp,val]);
        newArr[temp] = val;
    }
    return {newArr,animations};
}

export default insertionSort;