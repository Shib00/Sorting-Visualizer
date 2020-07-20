function enableButtons(className){
    let buttons = document.getElementsByClassName(className);
    for(let i=0;i<buttons.length;i++){
        buttons[i].disabled = false;
    }
}

export default enableButtons;