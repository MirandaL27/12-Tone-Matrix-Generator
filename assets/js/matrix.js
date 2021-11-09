//generateMatrix();
//addOnClickFunctionToPrimeRow();

var pitch = "C";
var secondPitch = "C";
var isFirstClick = true;
var spellingMode = "sharp";
var sharpArray=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
var flatArray=["C","D&#9837", "D","E&#9837", "E", "F","G&#9837", "G", "A&#9837", "A","B&#9837", "B"];
var bothArray=["C","C#/D&#9837", "D","D#/E&#9837", "E", "F","F#/G&#9837", "G", "G#/A&#9837", "A","A#/B&#9837", "B"];
var primeRowPitches = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
var pitchFrequencies = [261.6, 277.2, 293.7, 311.1, 329.6,349.2, 370, 392, 415.3, 440, 466.2, 493.9];
var newDiv;
var canPrint = false;

function getId(){
    if(isFirstClick){
        pitch = this.id;
        //change style of clicked element to be hover background.
        var primeRowPitch = document.getElementById(pitch);
        primeRowPitch.style.backgroundImage = "radial-gradient(mediumslateblue,rgb(91, 27, 150))";
        isFirstClick = false;
    }
    else{
        secondPitch = this.id;
        //change style of clicked element to be hover background.
        var primeRowPitch = document.getElementById(secondPitch);
        primeRowPitch.style.backgroundImage = "radial-gradient(mediumslateblue,rgb(91, 27, 150))";
        swapPitches();
        isFirstClick = true;
    }
}

function addOnClickFunctionToPrimeRow(){

    var primeRowPitch = document.getElementById("C");
    primeRowPitch.style.order = "0";
    primeRowPitch.onclick = getId;
    
    primeRowPitch = document.getElementById("C#");
    primeRowPitch.style.order = "1";
    primeRowPitch.onclick = getId;

    primeRowPitch = document.getElementById("D");
    primeRowPitch.style.order = "2";
    primeRowPitch.onclick = getId;

    primeRowPitch = document.getElementById("D#");
    primeRowPitch.style.order = "3";
    primeRowPitch.onclick = getId;

    primeRowPitch = document.getElementById("E");
    primeRowPitch.style.order = "4";
    primeRowPitch.onclick = getId;

    primeRowPitch = document.getElementById("F");
    primeRowPitch.style.order = "5";
    primeRowPitch.onclick = getId;

    primeRowPitch = document.getElementById("F#");
    primeRowPitch.style.order = "6";
    primeRowPitch.onclick = getId;

    primeRowPitch = document.getElementById("G");
    primeRowPitch.style.order = "7";
    primeRowPitch.onclick = getId;

    primeRowPitch = document.getElementById("G#");
    primeRowPitch.style.order = "8";
    primeRowPitch.onclick = getId;

    primeRowPitch = document.getElementById("A");
    primeRowPitch.style.order = "9";
    primeRowPitch.onclick = getId;

    primeRowPitch = document.getElementById("A#");
    primeRowPitch.style.order = "10";
    primeRowPitch.onclick = getId;

    primeRowPitch = document.getElementById("B");
    primeRowPitch.style.order = "11";
    primeRowPitch.onclick = getId;

    var reset = document.getElementById("reset-button");
    reset.onclick = resetPrimeRow;

    reset = document.getElementById("sharp");
    reset.onclick = respellAccidentals;
    reset.style.backgroundImage = "radial-gradient(white,rgb(126, 117, 117))";

    reset = document.getElementById("flat");
    reset.onclick = respellAccidentals;

    reset = document.getElementById("both");
    reset.onclick = respellAccidentals;

    reset = document.getElementById("gen");
    reset.onclick = getPrimeRowPitches;

    for(var i = 0; i < 12; i++){
        reset = document.getElementById("play" + i);
        reset.onclick = playRowNotes;
    }

    // reset = document.getElementById("print-button");
    // reset.style.backgroundColor = "lightgrey";
    // reset.style.border = "3px solid grey";
    // reset.style.color = "darkgrey";
    printButton.disableButton();
    printButton.button.onclick = printButton.printDoc;
}

function resetPrimeRow(){
    //loop through each element of sharpArray and use the values to reset the order of the prime row blocks.
    for(var i=0;i<sharpArray.length;i++){
        var p = document.getElementById(sharpArray[i]);
        p.style.order = getNumberFromPitch(sharpArray[i]).toString();
    }
    //hide matrix and disable print button

    matrix.hideMatrix();

    printButton.canPrint = false;
    printButton.disableButton()
    // var reset = document.getElementById("print-button");
    // reset.style.backgroundColor = "lightgrey";
    // reset.style.border = "3px solid grey";
    // reset.style.color = "darkgrey";
}

function swapPitches(){
    pitch1 = document.getElementById(pitch);
    pitch2 = document.getElementById(secondPitch);

    //change order of two pitches
    var temp = pitch1.style.order;
    pitch1.style.order = pitch2.style.order;
    pitch2.style.order = temp;

    //change style back to default background
    pitch1.style.backgroundImage = null;
    pitch2.style.backgroundImage = null;
    pitch1.style.backgroundColor = "mediumslateblue";
    pitch2.style.backgroundColor = "mediumslateblue";
}

function respellAccidentals(){
    spellingMode = this.id;
    resetModeButtons();
    for(var i = 0; i < 12; i++){
        if(spellingMode == "sharp"){
            //go into each row block and change the text
            var note = document.getElementById(sharpArray[i]);
            note.innerHTML = "<p>"+ sharpArray[i]+"</p>";
            note.style.fontSize = "3vw";
            note.style.fontWeight = "normal";
        }
        else if(spellingMode == "flat"){
            var note = document.getElementById(sharpArray[i]);
            note.innerHTML = "<p>"+ flatArray[i]+"</p>";
            note.style.fontSize = "3vw";
            note.style.fontWeight = "normal";
        }
        else{
            var note = document.getElementById(sharpArray[i]);
            note.innerHTML = "<p>"+ bothArray[i]+"</p>";
            note.style.fontSize = "1.5vw";
            note.style.fontWeight = "Bold";
        }
    }
    changeMatrixSpelling()
}

function resetModeButtons(){
    var sharpButton = document.getElementById("sharp");
    var flatButton = document.getElementById("flat");
    var bothButton = document.getElementById("both");
    switch(spellingMode){
        case "sharp":
            sharpButton.style.backgroundImage = "radial-gradient(white,rgb(126, 117, 117))";
            flatButton.style.backgroundImage = null;
            flatButton.style.backgroundColor = "rgba(126, 117, 117, 0.5)";
            bothButton.style.backgroundImage = null;
            bothButton.style.backgroundColor = "rgba(126, 117, 117, 0.5)";
            break;
        case "flat":
            flatButton.style.backgroundImage = "radial-gradient(white,rgb(126, 117, 117))";
            sharpButton.style.backgroundImage = null;
            sharpButton.style.backgroundColor = "rgba(126, 117, 117, 0.5)";
            bothButton.style.backgroundImage = null;
            bothButton.style.backgroundColor = "rgba(126, 117, 117, 0.5)";
            break;
        default:
            bothButton.style.backgroundImage = "radial-gradient(white,rgb(126, 117, 117))";
            flatButton.style.backgroundImage = null;
            flatButton.style.backgroundColor = "rgba(126, 117, 117, 0.5)";
            sharpButton.style.backgroundImage = null;
            sharpButton.style.backgroundColor = "rgba(126, 117, 117, 0.5)";
            break;    
    }
}

function getPrimeRowPitches(){
    var primeRow = document.getElementById("input-container");
    var primeRowArray = primeRow.children;
    for(var i = 0; i<primeRowArray.length; i++){
        primeRowPitches[primeRowArray[i].style.order] = primeRowArray[i].id;
    }
    matrix.populateMatrix();
}


function getNumberFromPitch(p){
    //switch statement correlating the pitches with integers
    switch (p){
        case "C":
            return 0;
        case "C#":
        case "D&#9837":  
        case "C#/D&#9837":
        case "D♭": 
        case "C#/D♭":
            return 1;
        case "D":
            return 2;
        case "D#":
        case "E&#9837":
        case "D#/E&#9837":
        case "E♭":
        case "D#/E♭":
            return 3;
        case "E":
            return 4;
        case "F":
            return 5;
        case "F#":
        case "G&#9837": 
        case "F#/G&#9837":
        case "G♭":
        case "F#/G♭":    
            return 6;
        case "G":
            return 7;
        case "G#":
        case "A&#9837":
        case "G#/A&#9837":
        case "A♭":
        case "G#/A♭":    
            return 8;
        case "A":
            return 9;
        case "A#":
        case "B&#9837":
        case "A#/B&#9837":
        case "B♭":
        case "A#/B♭":    
            return 10;
        case "B":
            return 11;                                 

    }
}

async function playRowNotes(){
    var row = this.id;
    row = row.replace("play","");
    this.style.backgroundImage = "radial-gradient(white,rgb(126, 117, 117))";
    //play row notes
    //audio context - https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode
    //Oscillator not supported in IE!
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var audio = new AudioContext;
    //get matrix row number
        
    //get each pitch from the row
    for(var i  = row*12; i<(row*12 + 12);i++){
        var p = document.getElementById(i.toString());
        p.style.color = "blue";
        var num = getNumberFromPitch(p.textContent);
        var freq = pitchFrequencies[num];
        //https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode
        var osc = audio.createOscillator();
        osc.type = "sine";
        osc.connect(audio.destination);
        osc.frequency.setValueAtTime(freq, audio.currentTime);
        osc.start();   
        await delayExecution(1000);
        osc.stop();
        p.style.color = "black";
    }
    this.style.backgroundImage = null;
    this.style.backgroundColor = "rgba(126, 117, 117, 0.5)";
}

 function delayExecution(milliseconds) {
     return new Promise(resolve => setTimeout(resolve, milliseconds));
   }
// //https://masteringjs.io/tutorials/fundamentals/wait-1-second-then

// function printDoc(){
//     if(canPrint){
//         window.print();
//     }
// }




var matrix = {
    section: document.getElementById("matrix"),
    containerDiv:document.createElement("div"),
    table:document.createElement("table"),
    rows: [],
    cellDivs: [],
    playButtons: [],
    buttonCells: [],
    cells : [],
    ps : [],

    generateMatrix(){
        //generates and hides the HTML elements for the matrix
        //make a div to contain the matrix - flexbox
       this.styleContainerDiv();
        this.section.appendChild(this.containerDiv);
         //make the table
        this.styleTable();
        for(var i = 0; i < 12; i++){
            //make 12 table rows
            this.rows.push(document.createElement("tr"));

            this.buttonCells.push(document.createElement("td"));
            this.playButtons.push(document.createElement("button"));
            this.styleButton(i);

            this.buttonCells[i].appendChild(this.playButtons[i]);
            this.rows[i].appendChild(this.buttonCells[i]);

            for(var j = 0; j < 12; j++){
                var index = (i*12) + j;
                //make 12 table cells inside each row
                //each one should contain a div flexbox with a paragraph element in it.
                this.cells.push(document.createElement("td"));
                this.styleCell(index);

                this.cellDivs.push(document.createElement("div"));
                this.styleCellDiv(index)

                this.ps.push(document.createElement("p"));
                this.styleP(index);

                this.cellDivs[index].appendChild(this.ps[index]);
                this.cells[index].appendChild(this.cellDivs[index]);
                this.rows[i].appendChild(this.cells[index]);
            }
            this.table.appendChild(this.rows[i]);
        }
        this.containerDiv.appendChild(this.table);
    },
    styleContainerDiv(){
        this.containerDiv.style = "justify-content: center; margin:20px; display:none;"//hide the matrix
    },
    styleTable(){
        this.table.style = "border: 3px solid blue;";
        this.table.className = "matrix-table";
    },
    styleRow(index){
        this.rows[index].className = "matrix-row";
    },
    styleButton(index){
        this.playButtons[index].type = "submit";
        this.playButtons[index].id = "play"+ index;
        this.playButtons[index].className = "play-button";
        this.playButtons[index].textContent = "Play";
        this.playButtons[index].style = "background-color:rgba(126, 117, 117,0.5); border: 3px solid black; border-radius: 10px; padding: 5px; font-size: 15px;";
    },
    styleCellDiv(index){
        this.cellDivs[index].style = "display: flex; justify-content: center; align-items: center; width:4vw; background-color: mediumslateblue";
        this.cellDivs[index].className = "matrix-div";
    },
    styleCell(index){
        this.cells[index].className = "matrix-cell";
    },
    styleP(index){
        this.ps[index].id = (index).toString();
        this.ps[index].textContent = "0";
        this.ps[index].style =  "font-size:23px;";
    },

    changeMatrixSpelling(){
        //change to sharps, flats or both depending on spellingMode
        for(var i=0;i<144;i++){
            var p = this.ps[i];
            var str = p.textContent;
            if(spellingMode == "sharp"){
                p.textContent = sharpArray[getNumberFromPitch(str)];
                // p.style.fontSize = "23px";
                p.style.fontSize = "2.5vw";
                p.style.fontWeight = "normal";
            }
            else if (spellingMode == "flat"){
                console.log("flat");
                p.innerHTML = flatArray[getNumberFromPitch(str)];
                // p.style.fontSize = "23px";
                p.style.fontSize = "2.5vw";
                p.style.fontWeight = "normal";
            }
            else{
                p.innerHTML = bothArray[getNumberFromPitch(str)];
                //p.style.fontSize = "10px";
                p.style.fontSize = "1.5vw";
                p.style.fontWeight = "bold";
            }      
        }
    },

    populateMatrix(){
        //compute matrix values and show matrix
    
        //put prime row in first
        for(var i =0;i <12; i++){
            //var p = document.getElementById(i.toString());
                this.ps[i].textContent = primeRowPitches[i];
        }
        //then update the first column
        for(var i=0; i<144;i+=12){
            //inversion: 
            if(i != 0){
                var first = getNumberFromPitch(primeRowPitches[(i-12)/12]);
                var second = getNumberFromPitch(primeRowPitches[((i-12)/12) + 1]);
                var diff = second - first;
                var p = this.ps[i];
                var prevP = this.ps[i-12];
                var invertedDiff = getNumberFromPitch(prevP.textContent) - diff;
                if(invertedDiff < 0){
                    invertedDiff+=12;
                }
                else if (invertedDiff>=12){
                    invertedDiff-=12;
                }
                p.textContent = sharpArray[invertedDiff];      
            }
        }
        var offset=0;
        //populate the rest of the table
        for(var i = 12; i < 144; i++){
            var p = this.ps[i];
            if(i%12 == 0){
                //it's the first cell in the row, set offset for transposition
                offset = getNumberFromPitch(p.textContent) - getNumberFromPitch(primeRowPitches[0]);
                if(offset < 0){
                    offset += 12;
                }
            }
            else{
                //it's not the first cell in the row, transpose based on offset
                var newPitch = (getNumberFromPitch(primeRowPitches[i%12]) + offset)%12;
                p.textContent = sharpArray[newPitch];
            }
        }
        //show matrix
        this.changeMatrixSpelling();
        this.showMatrix();

        // var printB = document.getElementById("print-button");
        // printB.style.backgroundColor = "rgba(126, 117, 117, 0.5)";
        // printB.style.border = "3px solid black";
        // printB.style.color = "black";
        printButton.canPrint = true;
        console.log(printButton.canPrint);
        printButton.enableButton();
    },
    hideMatrix(){
        this.containerDiv.style.display = "none";
    },
    showMatrix(){
        this.containerDiv.style.display = "flex";
    }
}

var printButton = {
    button : document.getElementById("print-button"),
    canPrint : false,
    disableButton(){
        this.button.style.backgroundColor = "lightgrey";
        this.button.style.border = "3px solid grey";
        this.button.style.color = "darkgrey";
    },
    enableButton(){
        this.button.style.backgroundColor = "rgba(126, 117, 117, 0.5)";
        this.button.style.border = "3px solid black";
        this.button.style.color = "black";
    },
    printDoc(){
        console.log(canPrint);
        if(canPrint){
            window.print();
        }
    },
}

matrix.generateMatrix();
addOnClickFunctionToPrimeRow();