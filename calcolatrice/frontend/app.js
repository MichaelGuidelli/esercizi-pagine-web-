function funzioneDisplayValore(valore) {
    document.getElementById("risultato").innerHTML += valore;
    if (valore == "*") {
        document.getElementById("risultato").innerHTML += "x";
    }
}

function pulisciDisplay() {
    document.getElementById("risultato").innerHTML = " ";
}

function risolvo() {
    try {
        contenutoDisplay = document.getElementById("risultato").innerText;
        risultato = contenutoDisplay.replace("x", "*")
        document.getElementById("risultato").innerHTML = math.evaluate(risultato);
    } 
    catch(err) {
        document.getElementById("risultato").innerHTML = "Error";
    }
}

function copiaRisultato() {
    var copiaRisultato = document.getElementById("risultato").innerText;
    navigator.clipboard.writeText(copiaRisultato).then(() => {
        alert("Risultato copiato negli appunti!: " + document.getElementById("risultato").innerText);
    });
}