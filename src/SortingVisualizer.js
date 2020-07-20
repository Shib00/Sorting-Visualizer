import React,{Component} from 'react';
import Slider from 'rc-slider';
import {randomNum} from "./helpers/randomNum";
import mergeSort from "./helpers/mergeSort";
import quickSort from "./helpers/quickSort";
import bubbleSort from "./helpers/bubbleSort";
import selectionSort from "./helpers/selectionSort";
import insertionSort from "./helpers/insertionSort";
import buttonToggler from "./helpers/buttonToggler";
import disableButtons from "./helpers/disableButtons";
import enableButtons from "./helpers/enableButtons";
import sliderStyles from "./helpers/sliderStyles";
import desc from "./helpers/algoDesc";
import 'rc-slider/assets/index.css';
import "./SortingVisualizer.css";

class SortingVisualizer extends Component{
    static defaultProps = {
        min: 100,
        max: 1000
    }

    constructor(props){
        super(props);
        this.state = {
            array: [],
            size: 40,
            algo: '',
            disabled: false,
            speed: 1
        }
        this.genArr = this.genArr.bind(this);
        this.getDim = this.getDim.bind(this);
        this.toggleSlider = this.toggleSlider.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
        this.mergeSort = this.mergeSort.bind(this);
        this.quickSort = this.quickSort.bind(this);
        this.bubbleSort = this.bubbleSort.bind(this);
        this.selectionSort = this.selectionSort.bind(this);
        this.insertionSort = this.insertionSort.bind(this);
    }


// Get width and margin for arrayBars and also get the animation speed
getDim(){
    let n = (this.state.size);
    //toFixed(someNum) used to set floating point accuracy
    let width = (100/(2*n-1)).toFixed(2);
    let margin = (100/(4.5*n-1)).toFixed(2);
    // console.log(width,margin);
    return {width,margin}
}

// Generate an array 
    genArr(){
        let arr = [];
        let {min,max} = this.props;
        let {size}    = this.state;

        while(size--){
            arr.push(randomNum(min,max));
        }
        this.setState({array: arr,algo:''});
        enableButtons('sortBtn');
    }

//  Toggle Slider
    toggleSlider(speed,len){
        // let element = document.getElementById(id);
        setTimeout(()=>{
            this.setState({disabled: true});
            
        })
        setTimeout(()=>{
            this.setState({disabled: false});
        },speed*len);
        clearTimeout();
    }

    componentDidMount(){
        this.genArr();
    }

    handleChange(val){
        this.setState({size: val},()=>{
            this.genArr();
        }); 
    }

    handleSpeedChange(val){
	console.log(Math.abs(val-41));
        this.setState({speed: Math.abs(val-41)}); 
    }

// Merge Sort
    mergeSort(){
        let {animations} = mergeSort(this.state.array);
        buttonToggler('genArr',this.state.speed,animations.length);
        this.toggleSlider(this.state.speed,animations.length);
        disableButtons('sortBtn');
        // console.log(animations);
        this.setState({algo:'Merge'});
        for(let i=0;i<animations.length;i++){
            const arrayLines = document.getElementsByClassName('arrayLine');
            const isColorChange = (i%3 !== 2);
            if(isColorChange){
                const color = (i%3 === 0) ? "red" : "white";
                const [barOneIdx,barTwoIdx] = animations[i];
                const barOneStyle = arrayLines[barOneIdx].style;
                const barTwoStyle = arrayLines[barTwoIdx].style;
                setTimeout(()=>{
                                barOneStyle.backgroundColor = color;
                                barTwoStyle.backgroundColor = color;
                            }, i*this.state.speed);
            }   
            else {
                setTimeout(()=>{
                    const [barIdx, newHeight] = animations[i];
                    const barStyle = arrayLines[barIdx].style;
                    barStyle.height = `${newHeight/10}%`;
                }, i*this.state.speed);
            }
        }   
    }

// Quick Sort
    quickSort(){
        let {animations} = quickSort(this.state.array);
        buttonToggler('genArr',this.state.speed,animations.length);
        this.toggleSlider(this.state.speed,animations.length);
        disableButtons('sortBtn');
        this.setState({algo:'Quick'});
        // this.setState({array: arr});
        // console.log(animations);
        for(let i=0;i<animations.length;i++){
            const arrayLines = document.getElementsByClassName('arrayLine');
            const isColorChange = animations[i][0] !== "swap";
            if(isColorChange){
                const color = (animations[i][0] !== "comparison1") ? 'white':'red';
                const [temp,barOneIdx,barTwoIdx] = animations[i];
                const barOneStyle = arrayLines[barOneIdx].style;
                const barTwoStyle = arrayLines[barTwoIdx].style;
                setTimeout(()=>{
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i*this.state.speed);
            }
            else{
                const [temp ,barIdx, newHeight] = animations[i];
                const barStyle = arrayLines[barIdx].style;
                setTimeout(()=>{
                    barStyle.height = `${newHeight/10}%`;
                }, i*this.state.speed);
            }
        }
    }

// Insertion Sort
    insertionSort(){
        let {animations} = insertionSort(this.state.array);
        this.setState({algo:'Insertion'});
        disableButtons('sortBtn');
        buttonToggler('genArr',this.state.speed,animations.length);
        this.toggleSlider(this.state.speed,animations.length);
        // console.log(animations);
        for(let i=0; i<animations.length; i++){
            const arrayLines = document.getElementsByClassName('arrayLine');
            const isColorChange = animations[i][0] !== "swap";
            if(isColorChange){
                const color = (animations[i][0] !== "comparison1") ? 'white':'red';
                const [temp,barOneIdx,barTwoIdx] = animations[i];
                const barOneStyle = arrayLines[barOneIdx].style;
                const barTwoStyle = arrayLines[barTwoIdx].style;
                setTimeout(()=>{
                                barOneStyle.backgroundColor = color;
                                barTwoStyle.backgroundColor = color;
                            }, i*this.state.speed);
            }
            else{
                const [temp ,barIdx, newHeight] = animations[i];
                if (barIdx !== -1){
                    const barStyle = arrayLines[barIdx].style;
                    setTimeout(()=>{
                        barStyle.height = `${newHeight/10}%`;
                    }, i*this.state.speed);
                }
            }
        }
    }

// Selection Sort
selectionSort(){
    let {animations} = selectionSort(this.state.array);
    buttonToggler('genArr',this.state.speed,animations.length);
    this.toggleSlider(this.state.speed,animations.length);
    disableButtons('sortBtn');
    // this.setState({array: arr});
    this.setState({algo:'Selection'});
    for(let i= 0 ;i < animations.length;i++){
        const arrayLines = document.getElementsByClassName('arrayLine');
        const isColorChange = animations[i][0] !== "swap";
        if(isColorChange){
            const color = (animations[i][0] !== "comparison1") ? 'white':'red';
            const [temp,barOneIdx,barTwoIdx] = animations[i];
            const barOneStyle = arrayLines[barOneIdx].style;
            const barTwoStyle = arrayLines[barTwoIdx].style;
            setTimeout(()=>{
                            barOneStyle.backgroundColor = color;
                            barTwoStyle.backgroundColor = color;
                        }, i*this.state.speed);
        }   
        else {
            const [temp ,barIdx, newHeight] = animations[i];
            if (barIdx !== -1){
                const barStyle = arrayLines[barIdx].style;
                setTimeout(()=>{
                    barStyle.height = `${newHeight/10}%`;
                }, i*this.state.speed);
            }
        }
    }
}

//BubbleSort
    bubbleSort(){
        let {animations} = bubbleSort(this.state.array);
        buttonToggler('genArr',this.state.speed,animations.length);
        this.toggleSlider(this.state.speed,animations.length);
        disableButtons('sortBtn');
        this.setState({algo:'Bubble'});

        for(let i= 0 ;i < animations.length;i++){
            const arrayLines = document.getElementsByClassName('arrayLine');
            const isColorChange = (i%4 === 0) || (i%4 === 1);
            if(isColorChange){
                const color = (i%4===0) ? 'red':'white';
                const [barOneIdx,barTwoIdx] = animations[i];
                const barOneStyle = arrayLines[barOneIdx].style;
                const barTwoStyle = arrayLines[barTwoIdx].style;
                setTimeout(()=>{
                                barOneStyle.backgroundColor = color;
                                barTwoStyle.backgroundColor = color;
                            }, i*this.state.speed);
            }   
            else {
                const [barIdx, newHeight] = animations[i];
                if (barIdx !== -1){
                    const barStyle = arrayLines[barIdx].style;
                    setTimeout(()=>{
                        barStyle.height = `${newHeight/10}%`;
                    }, i*this.state.speed);
                }
            }
        }
    }

    render(){
        // const {min, max} = this.props;
        let {handleStyle,trackStyle} = sliderStyles;
        const {array, size, algo} = this.state ;
        return (
            <div className="main">
                <div className="col1">
                    <div className="subcol1">
                        <div className="heading">
                            <h1><i class="icon braille"/> Sorting Visualizer</h1>
                        </div>
                        <div className="buttons1">
                            <button class="sortBtn" onClick={this.bubbleSort}>Bubble</button>
                            <button class="sortBtn" onClick={this.quickSort}>Quick</button>
                            <button class="sortBtn" onClick={this.mergeSort}>Merge</button>
                            <button class="sortBtn" onClick={this.selectionSort}>Selection</button>
                            <button class="sortBtn" onClick={this.insertionSort}>Insertion</button>
                        </div>
                        <div className="buttons2">
                            <button id='genArr' onClick={this.genArr}>Generate an array</button>
                        </div>
                        <div className="sliderContainer">
                            <h4>Size</h4>
                            <Slider
                                min = {10}
                                max = {120}
                                defaultValue={40}
                                // step = {10}
                                handleStyle={handleStyle}
                                trackStyle={trackStyle}
                                onChange={this.handleChange}
                                disabled = {this.state.disabled} 
                            />
                            <h4>Speed</h4>
                            <Slider
                                min = {1}
                                max = {40}
                                // step = {10}
                                handleStyle={handleStyle}
                                trackStyle={trackStyle}
                                onChange={this.handleSpeedChange} 
                                disabled={this.state.disabled}
                            />
                        </div>
                    </div>
                    <div className="subcol2">
                        {algo === '' ? <h2>Select an algorithm</h2> : 
                        <div style={{width: '100%',height:'90%'}}>
                            <h2 style={{marginTop: '5%'}}>{algo} Sort</h2>
                            <h4>Best - &Omega;{desc[algo]['best']}</h4>
                            <h4>Average - &theta;{desc[algo]['average']}</h4>
                            <h4>Worst - O{desc[algo]['worst']}</h4>
                        </div>}
                    </div>
                </div>
                <div className="col2">
                        <div className="arrayContainer">
                            {array.map((val,idx)=>(
                                    <div className='arrayLine' 
                                        key={idx}
                                        style={{
                                                height: `${val/10}%`,
                                                width: `${this.getDim()['width']}%`,
                                                margin: `0px ${this.getDim()['margin']}%`
                                            }}>    
                                    </div>
                            ))}
                        </div>
                </div>
            </div>
        )
    }
}

export default SortingVisualizer;
