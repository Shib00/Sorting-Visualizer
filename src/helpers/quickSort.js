function quickSort(arr){
    let animations = [];
    //.slice with no arguments makes a copy of that array
    let newArr = arr.slice();
    callQuickSort(newArr,0,newArr.length-1,animations);
    arr = newArr;
    return {arr,animations};
}

function callQuickSort(arr,start,end,animations){
    if(start >= end) return;
    let pvtIdx  = partition(arr,start,end,animations);
    callQuickSort(arr,start,pvtIdx-1,animations);
    callQuickSort(arr,pvtIdx+1,end,animations); 
}

function partition(arr,start,end,animations){
    let pivot = arr[end];
    let pvtIdx = start;
    for (let i=start;i<end;i++){
        animations.push(["comparison1",i,end]);
        animations.push(["comparison2",i,end]);
        if(arr[i]<=pivot){
            animations.push(["swap",i,arr[pvtIdx]]);
            animations.push(["swap",pvtIdx,arr[i]]);
            arr[i] = [arr[pvtIdx],arr[pvtIdx]=arr[i]][0];
            pvtIdx++;
        }
    }
    animations.push(["swap",pvtIdx,arr[end]]);
    animations.push(["swap",end,arr[pvtIdx]]);
    arr[pvtIdx]=[arr[end],arr[end]=arr[pvtIdx]][0];
    return pvtIdx;
}

export default quickSort;