function disableButtons(className){
    let buttons = document.getElementsByClassName(className);
    for(let i=0;i<buttons.length;i++){
        buttons[i].disabled = true;
    }
}

export default disableButtons;