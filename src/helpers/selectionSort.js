function selectionSort(arr){
    let animations = [];
    let newArr = arr.slice();
    for(let i=0;i < newArr.length-1; i++){
        let imin = i;
        for(let j=i+1;j<newArr.length;j++){
            animations.push(['comparison1',i,j]);
            animations.push(['comparison2',i,j]);
            if(newArr[j] < newArr[imin]){
                imin = j;
            }
        }
        animations.push(["swap",imin,newArr[i]]);
        animations.push(["swap",i,newArr[imin]]);
        newArr[i] = [newArr[imin],newArr[imin]=newArr[i]][0];
    }
    return {newArr,animations};
}

export default selectionSort;