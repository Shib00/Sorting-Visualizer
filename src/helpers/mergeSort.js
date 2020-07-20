function mergeSort(arr){
    let animations  = [];
    let newArr = arr.slice();
    callMergeSort(newArr, 0, newArr.length - 1, animations);
    arr = newArr;
    return {animations, arr};
}

function callMergeSort(newArr, startIndex, endIndex, animations) {
    if(startIndex >= endIndex)
        return;
    const middleIndex = Math.floor((startIndex + endIndex)/2);
    callMergeSort(newArr, startIndex, middleIndex, animations);
    callMergeSort(newArr, middleIndex + 1, endIndex, animations);
    merge(newArr, startIndex, middleIndex, endIndex, animations);
}

function merge(arr, start, middle, end, animations){
    let resultArray = [];
    let i=start, j=middle+1;
    while(i<=middle && j<=end){
        animations.push([i,j]);
        animations.push([i,j]);
        if(arr[i] < arr[j]){
            animations.push([resultArray.length + start, arr[i]]);
            resultArray.push(arr[i++]);
        }else{
            animations.push([resultArray.length + start, arr[j]]);
            resultArray.push(arr[j++]);
        }
    }

    //if length remains after above while
    while(i<=middle) {
        animations.push([i,i]);
        animations.push([i,i]);
        animations.push([resultArray.length + start, arr[i]]);
        resultArray.push(arr[i++]);
    }
    while(j<=end) {
        animations.push([j,j]);
        animations.push([j,j]);
        animations.push([resultArray.length + start, arr[j]]);
        resultArray.push(arr[j++]);
    }

    //mapping resultArray to arr(original)
    for (let i = start; i <= end; i++) {
        arr[i] = resultArray[i - start];
    }
}

export default mergeSort;