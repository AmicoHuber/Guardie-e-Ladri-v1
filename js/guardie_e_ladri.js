//contatore mosse, a 20 fine
let mosse = 0;

//mi sposto nelle 4 direzioni
//il ladro si muove anche se tento una mossa illegale
function spostaNord() {
    let sopraGuardia = document.getElementById("guardia").style.top;
    //dist almeno 50 px dal bordo superiore
    sopraGuardia = Number(sopraGuardia.substring(0, sopraGuardia.length - 2)) - 50;
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

    //scelta casuale di uno tra quattro
    let direzione = Math.floor(Math.random() * 4);
    //muovo di 50px in direzione casuale legale, altrimenti ritento
    
    switch (direzione) {
        case 0:
            sopraLadro = Number(sopraLadro.substring(0, sopraLadro.length - 2)) - 50;
            if (sopraLadro >= 0) {
                document.getElementById("ladro").style.top = sopraLadro + "px";
            } else {
                spostaLadro();
            };
            victoryCheck();
            break;
        case 1:
            sopraLadro = Number(sopraLadro.substring(0, sopraLadro.length - 2)) + 50;
            if (sopraLadro < 452) {
                document.getElementById("ladro").style.top = sopraLadro + "px";
            } else {
                spostaLadro();
            };
            victoryCheck();
            break;
        case 2:
            sxLadro = Number(sxLadro.substring(0, sxLadro.length - 2)) - 50;
            if (sxLadro >= 0) {
                document.getElementById("ladro").style.left = sxLadro + "px";
            } else {
                spostaLadro();
            };
            victoryCheck();
            break;
        case 3:
            sxLadro = Number(sxLadro.substring(0, sxLadro.length - 2)) + 50;
            if (sxLadro < 452) {
                document.getElementById("ladro").style.left = sxLadro + "px";
            } else {
                spostaLadro();
            };
            victoryCheck();
            break;
        default:
            alert("Errore");
    }
}

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

//verifica vittoria: sono uguali le distanze da bordo superiore ed sx
//poi, se le mosse sono 20 e non sono coincidenti, ho perso e disattivo i tasti
document.getElementById("nord").addEventListener("click", spostaNord);
document.getElementById("sud").addEventListener("click", spostaSud);
document.getElementById("ovest").addEventListener("click", spostaOvest);
document.getElementById("est").addEventListener("click", spostaEst);

