function bubbleSort(arr){
    let newArr = arr.slice();
    let i,j; 
    let animations = [];
    for(i=0;i<newArr.length;i++){
        for(j=0;j<newArr.length-i-1;j++){
            animations.push([j,j+1]);
            animations.push([j,j+1]);
            if(newArr[j]>newArr[j+1]){
                animations.push([j,newArr[j+1]]);
                animations.push([j+1,newArr[j]]);
                newArr[j] = [newArr[j+1],newArr[j+1]=newArr[j]][0];
            }
            else{
                animations.push([-1,-1]);
                animations.push([-1,-1]);
            }
        }
    }
    return {newArr,animations};
}
export default bubbleSort;