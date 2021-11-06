
addOnClickFunctionToPrimeRow();
var pitch = "C";
var secondPitch = "C";
var isFirstClick = true;
var spellingMode = "sharp";
var sharpArray=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
var flatArray=["C","D&#9837", "D","E&#9837", "E", "F","G&#9837", "G", "A&#9837", "A","B&#9837", "B"];
var bothArray=["C","C#/D&#9837", "D","D#/E&#9837", "E", "F","F#/G&#9837", "G", "G#/A&#9837", "A","A#/B&#9837", "B"];
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

    reset = document.getElementById("flat");
    reset.onclick = respellAccidentals;

    reset = document.getElementById("both");
    reset.onclick = respellAccidentals;
}

function resetPrimeRow(){
    //loop through each element of sharpArray and use the values to reset the order of the prime row blocks.
    for(var i=0;i<sharpArray.length;i++){
        var p = document.getElementById(sharpArray[i]);
        console.log(sharpArray[i]);
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
}

function getNumberFromPitch(p){
    //switch statement correlating the pitches with integers
    switch (p){
        case "C":
            return 0;
        case "C#":
            return 1;
        case "D":
            return 2;
        case "D#":
            return 3;
        case "E":
            return 4;
        case "F":
            return 5;
        case "F#":
            return 6;
        case "G":
            return 7;
        case "G#":
            return 8;
        case "A":
            return 9;
        case "A#":
            return 10;
        case "B":
            return 11;                                 

    }
}