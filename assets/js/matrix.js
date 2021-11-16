class matrixManager{
    //class that will handle all of the fucntion calls 
    printButton = new printButton(true,"print-button");
    resetButton = new button(false, "reset-button");
    generateButton = new button(false, "gen");
    pitchArrays = new pitchArrays(this);
    primeRow = new primeRow(this);
    matrix = new matrix(this);
    pageContent = document.querySelector("body");

    setOnClickForButtons(){
        var manReference = this;
        this.pageContent.addEventListener("click", function() {manReference.onClick(event)});
    }
    onClick(event){
        //differentiate between buttons using their id's and class names
        if(event.target.id == "gen"){  
            this.changeMatrixValues()
        }
        else if (event.target.id == "reset-button"){
            this.resetMatrix()
        }
        else if (event.target.id == "print-button"){
            this.printButton.printDoc();
        }
        else if(event.target.id == "sharp" || event.target.id == "flat" || event.target.id == "both"){
                this.changeMatrixSpellingMode(event.target.id);
        }
        else if(event.target.className == "pitches" ){
                this.primeRow.getId(event.target.id);
        }
        else if (event.target.className == "pitchesP"){
            this.primeRow.getId(event.path[1].id);
        }
        else if (event.target.id.toString().includes("play")){
            var index = parseInt(event.target.id.replace("play",""));
            this.matrix.invokePlayButtonManager(index);
        }

        return;
    }
    generateMatrix(){
        this.matrix.generateMatrix();
    }
    resetMatrix(){
        this.primeRow.resetPrimeRow();
        this.matrix.stopPlayingRow()
        this.matrix.hideMatrix();
        this.printButton.disable()
    }
    changeMatrixValues(){
        this.matrix.stopPlayingRow();
        this.primeRow.getPrimeRowPitches();
        this.matrix.populateMatrix();
    }
    changeMatrixSpellingMode(mode){
        this.pitchArrays.respellAccidentals(mode);
        this.matrix.changeMatrixSpelling()
    }
    getNumberFromPitch(p){
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

}

//button base class that all buttons inherit from.
class button{
    button;
    isDisabled;
    matrixManager;
    constructor(isDisabledInitially = false, id = null){
        this.isDisabled = isDisabledInitially;
        this.button = document.getElementById(id);
        if(this.isDisabled){
            this.disable();
        }
        return;
    }
    select(){
        this.button.style.backgroundImage = "radial-gradient(white,rgb(126, 117, 117))";
    }
    deselect(){
        this.button.style.backgroundImage = null;
        this.button.style.backgroundColor = "rgba(126, 117, 117, 0.5)";
    }
    disable(){
        this.isDisabled = true;
        this.button.style.backgroundColor = "lightgrey";
        this.button.style.border = "3px solid grey";
        this.button.style.color = "darkgrey";
    }
    enable(){
        this.isDisabled = false;
        this.button.style.backgroundColor = "rgba(126, 117, 117, 0.5)";
        this.button.style.border = "3px solid black";
        this.button.style.color = "black";
    }
}

class pitchArrays {
    matrixManager;
    sharpArray=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
    flatArray=["C","D&#9837", "D","E&#9837", "E", "F","G&#9837", "G", "A&#9837", "A","B&#9837", "B"];
    bothArray=["C","C#/D&#9837", "D","D#/E&#9837", "E", "F","F#/G&#9837", "G", "G#/A&#9837", "A","A#/B&#9837", "B"];
    pitchFrequencies = [261.6, 277.2, 293.7, 311.1, 329.6,349.2, 370, 392, 415.3, 440, 466.2, 493.9];
    spellingMode = "sharp";
    sharpButton = new button( false, "sharp");
    flatButton = new button( false, "flat");
    bothButton = new button( false, "both");
    constructor(manager){
        this.matrixManager = manager;
        this.sharpButton.select();
    }

    setSpellingMode(mode){
        this.spellingMode = mode;
    }
    respellAccidentals(spelling){
        this.spellingMode = spelling;
        this.resetModeButtons();
        for(var i = 0; i < 12; i++){
            if(this.spellingMode == "sharp"){
                this.styleNotes(i,this.sharpArray,"3vw","normal");
            }
            else if(this.spellingMode == "flat"){
                this.styleNotes(i,this.flatArray,"3vw","normal");
            }
            else{
                this.styleNotes(i,this.bothArray,"1.5vw","bold");
            }
        }
    }
    resetModeButtons(){
        switch(this.spellingMode){
            case "sharp":
                this.sharpButton.select();
                this.flatButton.deselect();
                this.bothButton.deselect();
                break;
            case "flat":
                this.sharpButton.deselect();
                this.flatButton.select();
                this.bothButton.deselect();
                break;
            default:
                this.sharpButton.deselect();
                this.flatButton.deselect();
                this.bothButton.select();
                break;    
        }
    }
    styleNotes(index,array, fontSize, fontStyle){
        var note = this.matrixManager.primeRow.pitchButtons[index];
        note.innerHTML = "<p>"+ array[index]+"</p>";
        note.style.fontSize = fontSize;
        note.style.fontWeight = fontStyle;
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
    constructor(manager){
        this.matrixManager = manager;
        this.pitchArrays = this.matrixManager.pitchArrays;
        for(var i = 0; i<this.primeRowPitches.length;i++){
            var pitch = document.getElementById(this.primeRowPitches[i]);
            pitch.style.order = i;
            this.pitchButtons.push(pitch);
        }
        return; 
    }

    getId(id){
        if(this.isFirstClick){
            this.pitch = id;
            //change style of clicked element to be hover background.
            var index = this.matrixManager.getNumberFromPitch(this.pitch);
            this.selectPitch(index);
            this.isFirstClick = false;
        }
        else{
            this.secondPitch = id;
            //change style of clicked element to be hover background.
            var index = this.matrixManager.getNumberFromPitch(this.secondPitch);
            this.selectPitch(index);
            this.swapPitches();
            this.isFirstClick = true;
        }
    }

    swapPitches(){
        var index1 =this.matrixManager.getNumberFromPitch(this.pitch);
        var index2 = this.matrixManager.getNumberFromPitch(this.secondPitch);
        this.pitch1 = this.pitchButtons[index1];
        this.pitch2 = this.pitchButtons[index2];

        //change order of two pitches
        var temp = this.pitch1.style.order;
        this.pitch1.style.order = this.pitch2.style.order;
        this.pitch2.style.order = temp;
    
        //change style back to default background
        this.deselectPitch(index1);
        this.deselectPitch(index2);
    }
    resetPrimeRow(){
        //loop through each element of sharpArray and use the values to reset the order of the prime row blocks.
        for(var i=0;i<this.pitchArrays.sharpArray.length;i++){
            this.pitchButtons[i].style.order = this.matrixManager.getNumberFromPitch(this.pitchArrays.sharpArray[i]).toString();
        }
    }
    getPrimeRowPitches(){
        for(var i = 0; i<this.pitchButtons.length; i++){
            this.primeRowPitches[this.pitchButtons[i].style.order] = this.pitchButtons[i].id;
        }
    }
    selectPitch(index){
        var primeRowPitch = this.pitchButtons[index];
            primeRowPitch.style.backgroundImage = "radial-gradient(mediumslateblue,rgb(91, 27, 150))";
    }
    deselectPitch(index){
        var primeRowPitch = this.pitchButtons[index];
        primeRowPitch.style.backgroundImage = null;
        primeRowPitch.style.backgroundColor = "mediumslateblue";
    }
}



class playButton extends button {
    button;
    isStop = false;
    changeToStopButton(){
        this.button.textContent = "Stop";
        this.select();
        this.isStop = true;
    }
    changeToPlayButton(){
        this.button.textContent = "Play";
        this.deselect();
        this.isStop = false;
    }
}

class playButtonManager{
    matrixManager;
    buttons = [];
    audioRef;
    playingButton= 0;
    constructor(manager){
        this.matrixManager = manager;
        this.audioRef = new audio(this.matrixManager);
    }
    addplayButton(button){
        this.buttons.push(button);
    }
    getPlayButton(index){
        return this.buttons[index];
    }
    playAButton(index){
        if(this.buttons[index].isDisabled){
            return;
        }
        
        this.playingButton = index
        this.disableButtons();
        if(this.buttons[index].isStop){
            this.stopAButton(index);
            this.enableButtons();
        }
        this.buttons[index].changeToStopButton();
        this.audioRef.playPitches(index);
        
    }
    stopAButton(index){
        this.audioRef.stopPitches(0);
        this.enableButtons();
        this.buttons[index].changeToPlayButton();
    }
    stopOscillator(){
        if(this.audioRef.osc){
            this.audioRef.stopPitches();
        }
        
        return;
    }
    disableButtons(){
        for(var i = 0; i< this.buttons.length;i++){
            if(i == this.playingButton){
                continue;
            }
            this.buttons[i].disable();
        }
    }
    enableButtons(){
        for(var i = 0; i< this.buttons.length;i++){
            this.buttons[i].enable();
        }
    }
}

class audio{
    matrixManager;
    context;
    osc; 
    pitchArray = [];
    constructor(manager){
        this.matrixManager = manager;
    }
    setup(){
        this.context = new AudioContext;
        this.osc = this.context.createOscillator();
        var audioRef = this.matrixManager.matrix.playButtons;
        this.osc.onended = function() {audioRef.stopAButton(audioRef.playingButton)};
        this.osc.type = "sine";
        this.osc.connect(this.context.destination);
       return;
    }
    populatePitches(row){
        var start =(row + 1)*14 +1;
        for(var i = start ; i<(start + 12) ;i++){
            var p = document.getElementById(i.toString());
            var num = this.matrixManager.getNumberFromPitch(p.textContent);
            var freq = manager.pitchArrays.pitchFrequencies[num];
            this.pitchArray.push(freq);   
        }
        return;
    }
    playPitches(row){
        this.setup();
        this.populatePitches(row);

        for(var i = 0; i < this.pitchArray.length; i++){
            this.osc.frequency.setValueAtTime(this.pitchArray[i], this.context.currentTime + i);
            if (i == 0){
                this.osc.start(); 
            }
        }
        this.stopPitches(12)
        return;
    }

    stopPitches(stopTime){
        this.osc.stop(stopTime);
        this.pitchArray.length = 0;
        return;
    }
}

 class matrix {
     matrixManager;
     pitchArrays;
    section = document.getElementById("matrix")
    containerDiv = document.createElement("div")
    table = document.createElement("table")
    rows = []
    cellDivs = []
    playButtons;
    buttonCells = []
    cells = []
    ps = []
    constructor(manager){
        this.matrixManager = manager;
        this.pitchArrays = this.matrixManager.pitchArrays;
        this.playButtons = new playButtonManager(this.matrixManager);
    }
    generateMatrix(){
        //generates and hides the HTML elements for the matrix
        //make a div to contain the matrix - flexbox
       this.styleContainerDiv();
        this.section.appendChild(this.containerDiv);
         //make the table
        this.styleTable();
        for(var i = 0; i < 14; i++){
            //make 14 table rows
            this.rows.push(document.createElement("tr"));
            if(i > 0 && i < 13){
                this.createPlayButton(i-1, i);
            }
            else{
                var buffer = document.createElement("td");
                this.rows[i].appendChild(buffer);
            }
            
            for(var j = 0; j < 14; j++){
                var index = (i*14) + j;
                    this.createDefaultCells(index, i);             
            }
            this.table.appendChild(this.rows[i]);
        }
        this.containerDiv.appendChild(this.table);
    }
    createPlayButton(index, row){
        this.buttonCells.push(document.createElement("td"));
        var playB = new playButton();
        playB.button = document.createElement("button");
        this.playButtons.addplayButton(playB);
        this.styleButton(index);

        this.buttonCells[index].appendChild(this.playButtons.getPlayButton(index).button);
        this.rows[row].appendChild(this.buttonCells[index]);
        return;
    }
    createDefaultCells(index, row){
        this.cells.push(document.createElement("td"));
        this.styleCell(index);

        this.cellDivs.push(document.createElement("div"));
        this.styleCellDiv(index)

        this.ps.push(document.createElement("p"));
        this.styleP(index);

        this.cellDivs[index].appendChild(this.ps[index]);
        this.cells[index].appendChild(this.cellDivs[index]);
        this.rows[row].appendChild(this.cells[index]);
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
        var button = this.playButtons.getPlayButton(index);
        button.button.type = "submit";
        button.button.id = "play"+ index;
        button.button.className = "play-button";
        button.button.textContent = "Play";
        button.button.style = "background-color:rgba(126, 117, 117,0.5); border: 3px solid black; border-radius: 10px; padding: 5px; font-size: 15px;";
    }
    styleCellDiv(index){
        this.cellDivs[index].style = "display: flex; justify-content: center; align-items: center; width:4vw; background-color: mediumslateblue";
        this.cellDivs[index].className = "matrix-div";
    }
    styleCell(index){
        this.cells[index].className = "matrix-cell";
    }
    styleP(index){
        this.ps[index].id = index;
        this.ps[index].setAttribute("textContent","0");
        this.ps[index].style =  "font-size:23px;";
    }

    changeMatrixSpelling(){
        //change to sharps, flats or both depending on spellingMode
        for(var i=0;i<144;i++){
            var row = Math.floor(i/12);
            var p = this.ps[i+15+row*2];

            var str = p.textContent;
            if(this.matrixManager.pitchArrays.spellingMode == "sharp"){
                p.textContent = this.matrixManager.pitchArrays.sharpArray[this.matrixManager.getNumberFromPitch(str)];
                p.style.fontSize = "2.5vw";
                p.style.fontWeight = "normal";
            }
            else if (this.matrixManager.pitchArrays.spellingMode == "flat"){
                p.innerHTML = this.matrixManager.pitchArrays.flatArray[this.matrixManager.getNumberFromPitch(str)];
                p.style.fontSize = "2.5vw";
                p.style.fontWeight = "normal";
            }
            else{
                p.innerHTML = this.matrixManager.pitchArrays.bothArray[this.matrixManager.getNumberFromPitch(str)];
                p.style.fontSize = "1.5vw";
                p.style.fontWeight = "bold";
            }      
        }
    }

    populateMatrix(){
        //compute matrix values and show matrix
        for(var i = 0; i < 196; i++){
            var row = Math.floor(i/14);
            var p = this.ps[i];
            if(i==0 || i == 13 || i == 182 || i == 195){
                //these cells are blank
                p.textContent = "";
            }
            else if(i==1){
                p.textContent = "I0";
            }
            else if(i == 14){
                p.textContent = "P0";
            }
            else if(i == 27){
                p.textContent = "R0";
            }
            else if(i == 183){
                p.textContent = "RI0";
            }
            else if(i > 14 && i<27){
                //this is the prime row 15-26
                this.ps[i].textContent = this.matrixManager.primeRow.primeRowPitches[i-15];
            }
            else if(i%14 == 0){
                //P row - numbers inverted from prime row
                var pValue = this.calculateInversion(row-1);
                p.textContent = "P" + pValue;
            }
            else if (i> 1 && i < 13){
                //I row - numbers from prime row
                var pValue = this.calculateInversion(i-1);
                p.textContent = "I" + pValue;
            }
            else if (i > 183 && i < 195){
                //RI Row - numbers same as I row
                var pValue = this.ps[i%14].textContent.replace("I","RI");
                p.textContent = pValue;
            }
            else if(i%14 == 13){
                //R row - numbers same as P row
                var pValue = this.ps[i-13].textContent.replace("P","R");
                p.textContent = pValue;
            }
            else if (i%14 == 1){
                //First column of pitches
                p.textContent = this.matrixManager.pitchArrays.sharpArray[this.calculateTransposition(i-1, 0)];
            }
            else{
                p.textContent = this.matrixManager.pitchArrays.sharpArray[this.calculateTransposition(i - i%14,(i - (row-1)*14) - 15)];
            }
        }

        //show matrix
        this.changeMatrixSpelling();
        this.showMatrix();
        this.matrixManager.printButton.enable();
    }
    calculateInversion(index){
        var val1 = this.matrixManager.getNumberFromPitch(this.matrixManager.primeRow.primeRowPitches[index]);
        var val2 = this.matrixManager.getNumberFromPitch(this.matrixManager.primeRow.primeRowPitches[0]);
        var final = val2-val1; 
        if(final < 0){
            final += 12;
        }
        return final;
    }
    calculateTransposition(offsetIndex,primeRowIndex){
        var offset = parseInt(this.ps[offsetIndex].textContent.replace("P",""));
        var basePitchNum = this.matrixManager.getNumberFromPitch(this.matrixManager.primeRow.primeRowPitches[primeRowIndex]);
        var newPitchNum = (basePitchNum + offset)%12;
        return newPitchNum;
    }
    hideMatrix(){
        this.containerDiv.style.display = "none";
    }
    showMatrix(){
        this.containerDiv.style.display = "flex";
    }
    invokePlayButtonManager(index){
        this.playButtons.playAButton(index)
    }
    stopPlayingRow(){
        this.playButtons.stopOscillator();
    }
}

class printButton extends button {
    printDoc(){
        if(!this.isDisabled){
            window.print();
        }
    }
}

var manager = new matrixManager();

manager.setOnClickForButtons();
manager.generateMatrix();
