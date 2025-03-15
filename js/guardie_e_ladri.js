//contatore mosse, a 20 fine
let mosse = 0;

//mi sposto nelle 4 direzioni
//il ladro si muove anche se la guardia una mossa illegale
function spostaNord() {
    let sopraGuardia = document.getElementById("guardia").style.top;
    //dist almeno 50 px dal bordo superiore
    sopraGuardia = Number(sopraGuardia.substring(0, sopraGuardia.length - 2)) - 50;
    //aggiorno la posizione solo se la destinazione mi lascia dentro i margini
    if (sopraGuardia >= 0) {
        document.getElementById("guardia").style.top = sopraGuardia + "px";
    };
    spostaLadro();
};

function spostaSud() {
    let sopraGuardia = document.getElementById("guardia").style.top;
    //dist almeno 50 px dal bordo inferiore
    sopraGuardia = Number(sopraGuardia.substring(0, sopraGuardia.length - 2)) + 50;
    if (sopraGuardia < 452) {
        document.getElementById("guardia").style.top = sopraGuardia + "px";
    };
    spostaLadro();
};

function spostaOvest() {
    let sxGuardia = document.getElementById("guardia").style.left;
    //dist almeno 50 px dal bordo sinistro
    sxGuardia = Number(sxGuardia.substring(0, sxGuardia.length - 2)) - 50;
    if (sxGuardia >= 0) {
        document.getElementById("guardia").style.left = sxGuardia + "px";
    };
    spostaLadro();
};

function spostaEst() {
    let sxGuardia = document.getElementById("guardia").style.left;
    sxGuardia = Number(sxGuardia.substring(0, sxGuardia.length - 2)) + 50;
    if (sxGuardia < 452) {
        document.getElementById("guardia").style.left = sxGuardia + "px";
    };
    spostaLadro();
};

//sposto il ladro a caso
//controllo vittoria qui in fondo (dopo che si sono mossi entrambi)
function spostaLadro() {
    let sopraLadro = document.getElementById("ladro").style.top;
    let sxLadro = document.getElementById("ladro").style.left;

    //per la direzione casuale
    let direzione;

    //guardia che modifico solo se effettuo una mossa legale
    //(unica circostanza che mi porta ad uscire dal ciclo)
    //torna 1 ogni volta che tento di spostare il ladro
    let illegale = 1;
    
    while (illegale == 1) {
        //riassegno ad ogni passaggio
        sopraLadro = document.getElementById("ladro").style.top;
        sxLadro = document.getElementById("ladro").style.left;
        //nuova ricerca di una mossa, nuovo intero casuale
        direzione = Math.floor(Math.random() * 4);
        //in base a quell'int, scelgo la direzione
        switch (direzione) {
            case 0:
                //assegno al valore temporaneo di sopraLadro la nuova coordinata
                sopraLadro = Number(sopraLadro.substring(0, sopraLadro.length - 2)) - 50;
                //e, se costituisce un valore legale,
                if (sopraLadro >= 0) {
                    //modifico il CSS
                    document.getElementById("ladro").style.top = sopraLadro + "px";
                    //e notifico l'avvenimento di una mossa legale
                    illegale = 0;
                };
                //se invece non ho effettuato una mossa legale, ricomincio
                break;
            case 1:
                sopraLadro = Number(sopraLadro.substring(0, sopraLadro.length - 2)) + 50;
                if (sopraLadro < 452) {
                 document.getElementById("ladro").style.top = sopraLadro + "px";
                illegale = 0;
                };
                break;
            case 2:
                sxLadro = Number(sxLadro.substring(0, sxLadro.length - 2)) - 50;
                if (sxLadro >= 0) {
                    document.getElementById("ladro").style.left = sxLadro + "px";
                    illegale = 0;
                };
                break;
            case 3:
                sxLadro = Number(sxLadro.substring(0, sxLadro.length - 2)) + 50;
                if (sxLadro < 452) {
                    document.getElementById("ladro").style.left = sxLadro + "px";
                    illegale = 0;
                };
                break;
            default: 
                alert("errore");
        };
    };
    //chiamo victoryCheck solo una volta uscito dal while
    //ovvero solo quando ho spostato Ladro in maniera legale
    victoryCheck();
};

//invoco dopo avere spostato il ladro
function victoryCheck() {
    //si sono mossi entrambi
    mosse++;

    //stampo il numero di mosse aggiornato
    document.getElementById("mosse").innerText = "Mosse: " + mosse;

    //ri-ottengo tutto
    sopraGuardia = document.getElementById("guardia").style.top;
    sopraGuardia = Number(sopraGuardia.substring(0, sopraGuardia.length - 2));

    sxGuardia = document.getElementById("guardia").style.left;
    sxGuardia = Number(sxGuardia.substring(0, sxGuardia.length - 2));

    sopraLadro = document.getElementById("ladro").style.top;
    sopraLadro = Number(sopraLadro.substring(0, sopraLadro.length - 2));

    sxLadro = document.getElementById("ladro").style.left;
    sxLadro = Number(sxLadro.substring(0, sxLadro.length - 2));

    if ((mosse == 20) && (sxGuardia != sxLadro || sopraGuardia != sopraLadro)) {
        document.getElementById("esito").innerText = "Hai perso!";
        spegniTasti();
    }

   if (mosse == 20) {
        spegniTasti();
   }

   if ((sxGuardia == sxLadro) && (sopraGuardia == sopraLadro)) {
        document.getElementById("esito").innerText = "Hai vinto!";
        spegniTasti();
   }
}

function spegniTasti() {
    document.getElementById("nord").disabled = true;
    document.getElementById("sud").disabled = true;
    document.getElementById("ovest").disabled = true;
    document.getElementById("est").disabled = true;
}

//attivo i tasti
document.getElementById("nord").addEventListener("click", spostaNord);
document.getElementById("sud").addEventListener("click", spostaSud);
document.getElementById("ovest").addEventListener("click", spostaOvest);
document.getElementById("est").addEventListener("click", spostaEst);

