function buttonToggler(id,speed,len){
    let element = document.getElementById(id);
    setTimeout(()=>{
        element.disabled = true;
        
    })
    setTimeout(()=>{
        document.getElementById(id).disabled = false;
    },speed*len);
    clearTimeout();
}

export default buttonToggler;