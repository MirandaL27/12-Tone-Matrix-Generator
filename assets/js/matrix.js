class matrixManager{
    //class that will handle all of the fucntion calls 
    printButton = new printButton(this);
    resetButton = new resetButton(this);
    generateButton = new generateButton(this);
    pitchArrays = new pitchArrays(this);
    primeRow = new primeRow(this, this.pitchArrays);
    matrix = new matrix(this, this.pitchArrays);
    setOnClickForButtons(){
        this.printButton.setOnClick();
        this.printButton.disableButton();
        this.resetButton.setOnClick();
        this.generateButton.setOnClick();
        this.pitchArrays.setOnClick();
        this.primeRow.setOnClick();
    }
    generateMatrix(){
        this.matrix.generateMatrix();
    }
    resetMatrix(){
        this.primeRow.resetPrimeRow();
        this.matrix.hideMatrix();
        this.printButton.disableButton()
    }
    changeMatrixValues(){
        this.primeRow.getPrimeRowPitches();
        this.matrix.populateMatrix();
    }
    changeMatrixSpellingMode(){
        this.pitchArrays.respellAccidentals();
        this.matrix.changeMatrixSpelling()
    }

}

class pitchArrays {
    matrixManager;
    sharpArray=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
    flatArray=["C","D&#9837", "D","E&#9837", "E", "F","G&#9837", "G", "A&#9837", "A","B&#9837", "B"];
    bothArray=["C","C#/D&#9837", "D","D#/E&#9837", "E", "F","F#/G&#9837", "G", "G#/A&#9837", "A","A#/B&#9837", "B"];
    pitchFrequencies = [261.6, 277.2, 293.7, 311.1, 329.6,349.2, 370, 392, 415.3, 440, 466.2, 493.9];
    spellingMode = "sharp";
    sharpButton = document.getElementById("sharp");
    flatButton = document.getElementById("sharp");
    bothButton = document.getElementById("sharp");
    constructor(manager){
        this.matrixManager = manager;
    }

    setSpellingMode(mode){
        this.spellingMode = mode;
    }
    setOnClick(){
        this.sharpButton.onclick = this.matrixManager.changeMatrixSpellingMode;
        this.sharpButton.style.backgroundImage = "radial-gradient(white,rgb(126, 117, 117))";

        this.flatButton.onclick = this.matrixManager.changeMatrixSpellingMode;

        this.bothButton.onclick = this.matrixManager.changeMatrixSpellingMode;
    }
    respellAccidentals(){
        this.spellingMode = this.id;
        this.resetModeButtons();
        for(var i = 0; i < 12; i++){
            if(this.spellingMode == "sharp"){
                //go into each row block and change the text
                var note = document.getElementById(this.sharpArray[i]);
                note.innerHTML = "<p>"+ this.sharpArray[i]+"</p>";
                note.style.fontSize = "3vw";
                note.style.fontWeight = "normal";
            }
            else if(this.spellingMode == "flat"){
                var note = document.getElementById(this.sharpArray[i]);
                note.innerHTML = "<p>"+ this.flatArray[i]+"</p>";
                note.style.fontSize = "3vw";
                note.style.fontWeight = "normal";
            }
            else{
                var note = document.getElementById(this.sharpArray[i]);
                note.innerHTML = "<p>"+ this.bothArray[i]+"</p>";
                note.style.fontSize = "1.5vw";
                note.style.fontWeight = "Bold";
            }
        }
    }
    resetModeButtons(){
        switch(this.spellingMode){
            case "sharp":
                this.sharpButton.style.backgroundImage = "radial-gradient(white,rgb(126, 117, 117))";
                this.flatButton.style.backgroundImage = null;
                this.flatButton.style.backgroundColor = "rgba(126, 117, 117, 0.5)";
                this.bothButton.style.backgroundImage = null;
                this.bothButton.style.backgroundColor = "rgba(126, 117, 117, 0.5)";
                break;
            case "flat":
                this.flatButton.style.backgroundImage = "radial-gradient(white,rgb(126, 117, 117))";
                this.sharpButton.style.backgroundImage = null;
                this.sharpButton.style.backgroundColor = "rgba(126, 117, 117, 0.5)";
                this.bothButton.style.backgroundImage = null;
                this.bothButton.style.backgroundColor = "rgba(126, 117, 117, 0.5)";
                break;
            default:
                this.bothButton.style.backgroundImage = "radial-gradient(white,rgb(126, 117, 117))";
                this.flatButton.style.backgroundImage = null;
                this.flatButton.style.backgroundColor = "rgba(126, 117, 117, 0.5)";
                this.sharpButton.style.backgroundImage = null;
                this.sharpButton.style.backgroundColor = "rgba(126, 117, 117, 0.5)";
                break;    
        }
    }

}

class resetButton{
    matrixManager;
    button = document.getElementById("reset-button");
    constructor(manager){
        this.matrixManager = manager;
    }
    setOnClick(){
        this.button.onclick = this.matrixManager.resetMatrix;
    }
}

class generateButton{
    matrixManager;
    button = document.getElementById("gen");
    constructor(manager){
        this.matrixManager = manager;
    }
    setOnClick(){
        this.button.onclick = this.matrixManager.changeMatrixValues;
    }
}


class primeRow {
    matrixManager;
    pitchArrays;
    pitch = "C";
    secondPitch = "C";
    isFirstClick = true;
    primeRowPitches = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
    pitchButtons = [];
    constructor(manager, pitchmode){
        this.matrixManager = manager;
        this.pitchArrays = pitchmode
    }
    setOnClick(){
        for(var i = 0; i<this.primeRowPitches.length;i++){
            var pitch = document.getElementById(this.primeRowPitches[i]);
            pitch.style.order = i;
            var prReference = this;
            pitch.addEventListener("click",function() {prReference.getId(this, prReference)});
            this.pitchButtons.push(pitch);
        }
        return;
    }

    getId(event, primeRow){
        if(primeRow.isFirstClick){
            primeRow.pitch = event.id;
            //change style of clicked element to be hover background.
            var primeRowPitch = primeRow.pitchButtons[getNumberFromPitch(primeRow.pitch)];
            primeRowPitch.style.backgroundImage = "radial-gradient(mediumslateblue,rgb(91, 27, 150))";
            primeRow.isFirstClick = false;
        }
        else{
            primeRow.secondPitch = event.id;
            //change style of clicked element to be hover background.
            var primeRowPitch = primeRow.pitchButtons[getNumberFromPitch(primeRow.secondPitch)];
            primeRowPitch.style.backgroundImage = "radial-gradient(mediumslateblue,rgb(91, 27, 150))";
            primeRow.swapPitches();
            primeRow.isFirstClick = true;
        }
    }

    swapPitches(){
        this.pitch1 = this.pitchButtons[getNumberFromPitch(this.pitch)];
        this.pitch2 = this.pitchButtons[getNumberFromPitch(this.secondPitch)];

        //change order of two pitches
        var temp = this.pitch1.style.order;
        this.pitch1.style.order = this.pitch2.style.order;
        this.pitch2.style.order = temp;
    
        //change style back to default background
        this.pitch1.style.backgroundImage = null;
        this.pitch2.style.backgroundImage = null;
        this.pitch1.style.backgroundColor = "mediumslateblue";
        this.pitch2.style.backgroundColor = "mediumslateblue";
    }
    resetPrimeRow(){
        //loop through each element of sharpArray and use the values to reset the order of the prime row blocks.
        for(var i=0;i<this.pitchArrays.sharpArray.length;i++){
            //var p = document.getElementById(pitchMode.sharpArray[i]);
            this.pitchButtons[i].style.order = getNumberFromPitch(this.pitchArrays.sharpArray[i]).toString();
        }
    }
    getPrimeRowPitches(){
        for(var i = 0; i<this.pitchButtons.length; i++){
            primeRowPitches[this.pitchButtons[i].style.order] = this.pitchButtons[i].id;
        }
    }
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



 class matrix {
     matrixManager;
     pitchArrays;
    section = document.getElementById("matrix")
    containerDiv = document.createElement("div")
    table = document.createElement("table")
    rows = []
    cellDivs = []
    playButtons = []
    buttonCells = []
    cells = []
    ps = []
    constructor(manager, pitchMode){
        this.matrixManager = manager;
        this.pitchArrays = pitchMode;
    }
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
    }
    styleContainerDiv(){
        this.containerDiv.style = "justify-content: center; margin:20px; display:none;"//hide the matrix
    }
    styleTable(){
        this.table.style = "border: 3px solid blue;";
        this.table.className = "matrix-table";
    }
    styleRow(index){
        this.rows[index].className = "matrix-row";
    }
    styleButton(index){
        this.playButtons[index].type = "submit";
        this.playButtons[index].id = "play"+ index;
        this.playButtons[index].className = "play-button";
        this.playButtons[index].textContent = "Play";
        this.playButtons[index].style = "background-color:rgba(126, 117, 117,0.5); border: 3px solid black; border-radius: 10px; padding: 5px; font-size: 15px;";
    }
    styleCellDiv(index){
        this.cellDivs[index].style = "display: flex; justify-content: center; align-items: center; width:4vw; background-color: mediumslateblue";
        this.cellDivs[index].className = "matrix-div";
    }
    styleCell(index){
        this.cells[index].className = "matrix-cell";
    }
    styleP(index){
        this.ps[index].id = (index).toString();
        this.ps[index].textContent = "0";
        this.ps[index].style =  "font-size:23px;";
    }

    changeMatrixSpelling(){
        //change to sharps, flats or both depending on spellingMode
        for(var i=0;i<144;i++){
            var p = this.ps[i];

            var str = p.textContent;
            if(spellingMode == "sharp"){
                p.textContent = this.pitchArrays.sharpArray[getNumberFromPitch(str)];
                // p.style.fontSize = "23px";
                p.style.fontSize = "2.5vw";
                p.style.fontWeight = "normal";
            }
            else if (spellingMode == "flat"){
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
    }

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
                p.textContent = this.pitchArrays.sharpArray[invertedDiff];      
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
                p.textContent = this.pitchArrays.sharpArray[newPitch];
            }
        }
        //show matrix
        this.changeMatrixSpelling();
        this.setOnClick();
        this.showMatrix();
        printButton.enableButton();
    }
    hideMatrix(){
        this.containerDiv.style.display = "none";
    }
    showMatrix(){
        this.containerDiv.style.display = "flex";
    }
    setOnClick(){
        for(var i = 0; i < this.playButtons.length; i++){
            this.playButtons[i].onclick = playRowNotes;
        }
    }
}

class printButton {
    matrixManager;
    button = document.getElementById("print-button")
    canPrint = false
    constructor(manager){
        this.matrixManager = manager;
    }
    setOnClick(){
        this.button.onclick = this.printDoc;
    }
    disableButton(){
        this.button.style.backgroundColor = "lightgrey";
        this.button.style.border = "3px solid grey";
        this.button.style.color = "darkgrey";
        this.canPrint = false;
    }
    enableButton(){
        this.button.style.backgroundColor = "rgba(126, 117, 117, 0.5)";
        this.button.style.border = "3px solid black";
        this.button.style.color = "black";
        this.canPrint = true;
    }
    printDoc(){
        if(canPrint){
            window.print();
        }
    }
}



var manager = new matrixManager();

manager.setOnClickForButtons();
manager.generateMatrix();




