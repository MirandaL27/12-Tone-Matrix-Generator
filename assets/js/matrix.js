generateMatrix();

addOnClickFunctionToPrimeRow();
var pitch = "C";
var secondPitch = "C";
var isFirstClick = true;
var spellingMode = "sharp";
var sharpArray=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
var flatArray=["C","D&#9837", "D","E&#9837", "E", "F","G&#9837", "G", "A&#9837", "A","B&#9837", "B"];
var bothArray=["C","C#/D&#9837", "D","D#/E&#9837", "E", "F","F#/G&#9837", "G", "G#/A&#9837", "A","A#/B&#9837", "B"];
var primeRowPitches = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
var newDiv;
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
}

function resetPrimeRow(){
    //loop through each element of sharpArray and use the values to reset the order of the prime row blocks.
    for(var i=0;i<sharpArray.length;i++){
        var p = document.getElementById(sharpArray[i]);
        p.style.order = getNumberFromPitch(sharpArray[i]).toString();
    }
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
    populateMatrix();
}

function populateMatrix(){
    //compute matrix values and show matrix

    //put prime row in first
    for(var i =0;i <12; i++){
        var p = document.getElementById(i.toString());
            p.textContent = primeRowPitches[i];
    }
    //then update the first column
    for(var i=0; i<144;i+=12){
        //inversion: 
        if(i != 0){
            var first = getNumberFromPitch(primeRowPitches[(i-12)/12]);
            var second = getNumberFromPitch(primeRowPitches[((i-12)/12) + 1]);
            var diff = second - first;
            var p = document.getElementById(i.toString());
            var prevP = document.getElementById((i-12).toString());
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
        var p = document.getElementById(i.toString());
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
    changeMatrixSpelling();
    newDiv.style.display = "flex";
}

function changeMatrixSpelling(){
    //change to sharps, flats or both depending on spellingMode
    for(var i=0;i<144;i++){
        var p = document.getElementById(i.toString());
        var str = p.textContent;
        console.log(str);
        if(spellingMode == "sharp"){
            p.textContent = sharpArray[getNumberFromPitch(str)];
            p.style.fontSize = "23px";
            p.style.fontWeight = "normal";
        }
        else if (spellingMode == "flat"){
            console.log("flat");
            p.innerHTML = flatArray[getNumberFromPitch(str)];
            p.style.fontSize = "23px";
            p.style.fontWeight = "normal";
        }
        else{
            p.innerHTML = bothArray[getNumberFromPitch(str)];
            p.style.fontSize = "10px";
            p.style.fontWeight = "bold";
        }      
    }
}

function generateMatrix(){
    //generates and hides the HTML elements for the matrix
    //make a div to contain the matrix - flexbox
    newDiv = document.createElement("div");
    newDiv.style = "justify-content: center; margin:20px; display:none;"//hide the matrix
    let m = document.getElementById("matrix");
    m.appendChild(newDiv);
    //make the table
    let newTable = document.createElement("table");
    newTable.style = "border: 3px solid blue;";
    for(var i = 0; i < 12; i++){
        //make 12 table rows
        let newRow = document.createElement("tr");
        let newButtonCell = document.createElement("td");
        let newButton = document.createElement("button");
        newButton.type = "submit";
        newButton.id = "play"+ i;
        newButton.textContent = "Play";
        newButton.style = "background-color:rgba(126, 117, 117,0.5); border: 3px solid black; border-radius: 10px; padding: 5px; font-size: 15px;";
        newButtonCell.appendChild(newButton);
        newRow.appendChild(newButtonCell);
        for(var j = 0; j < 12; j++){
            //make 12 table cells inside each row
            //each one should contain a div flexbox with a paragraph element in it.
            let newCell = document.createElement("td");
            let newCellDiv = document.createElement("div");
            newCellDiv.style = "display: flex; justify-content: center; align-items: center; width:3vw; background-color: mediumslateblue";
            let newP = document.createElement("p");
            newP.id = (12*i+j).toString();
            newP.textContent = "0";
            newP.style =  "font-size:23px;";
            newCellDiv.appendChild(newP);
            newCell.appendChild(newCellDiv);
            newRow.appendChild(newCell);
        }
        newTable.appendChild(newRow);
    }
    newDiv.appendChild(newTable);
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