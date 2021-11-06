
addOnClickFunctionToPrimeRow();
var pitch = "C";
var secondPitch = "C";
var isFirstClick = true;
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

function getNumberFromPitch(p){
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