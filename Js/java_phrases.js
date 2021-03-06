var obj_mots;
var aleaTab;
var compteurbonsMots = 0;
var compteurmots;
var compteurQuestions = 0;
var bonneReponse = 0;
var shuffledmot;
var matiere;
var score;
var db_table;

$("#jeuHtml, #jeuCss, #jeuJs, #jeuPhp").on("click", function () {


    if (this.id == 'jeuHtml') {

        db_table = 'db_html';
        ajax_loadDB_html();


        $('#NouvMot').on('click', function () {

            compteurbonsMots = 0;
            compteurQuestions++;
            console.log("nbre de questions répondues : " + compteurQuestions);

            aleaTab =  Math.floor(Math.random() * obj_mots.length); // pour re-piocher aleatoirement, on redéfinit aleatab, au moment du click.

            reset();

            game_of_words();

            if (compteurQuestions == 10) {

                document.getElementById("containerJeu").style.display = "none";
                document.getElementById("resultats").style.display = "block";
                document.getElementById("resultatjeu").innerHTML = bonneReponse + " /10";

                console.log(bonneReponse);
                score = bonneReponse;
                matiere = "HTML";

                ajax_send_scores(matiere, score);

            }

        });

    }


    if (this.id == 'jeuCss') {
        db_table = 'db_css';
        ajax_loadDB_html();


        $('#NouvMot').on('click', function () {

            compteurbonsMots = 0;
            compteurQuestions++;
            console.log("nbre de questions répondues : " + compteurQuestions);

            aleaTab =  Math.floor(Math.random() * obj_mots.length); // pour re-piocher aleatoirement, on redéfinit aleatab, au moment du click.

            reset();

            game_of_words();

            if (compteurQuestions == 10) {

                console.log(bonneReponse);
                document.getElementById("containerJeu").style.display = "none";
                document.getElementById("resultats").style.display = "block";
                document.getElementById("resultatjeu").innerHTML = bonneReponse + " /10";

                console.log(bonneReponse);
                score = bonneReponse;
                matiere = "CSS";

                ajax_send_scores(matiere, score);

            }

        });


    }


    if (this.id == 'jeuJs') {

        db_table = 'db_js';
        ajax_loadDB_html();


        $('#NouvMot').on('click', function () {

            compteurbonsMots = 0;
            compteurQuestions++;
            console.log("nbre de questions répondues : " + compteurQuestions);

            aleaTab =  Math.floor(Math.random() * obj_mots.length); // pour re-piocher aleatoirement, on redéfinit aleatab, au moment du click.

            reset();

            game_of_words();

            if (compteurQuestions == 10) {

                console.log(bonneReponse);
                document.getElementById("containerJeu").style.display = "none";
                document.getElementById("resultats").style.display = "block";
                document.getElementById("resultatjeu").innerHTML = bonneReponse + " /10";

                console.log(bonneReponse);
                score = bonneReponse;
                matiere = "JS";

                ajax_send_scores(matiere, score);


            }

        });


    }

    if (this.id == 'jeuPhp') {

        db_table = 'db_php';
        ajax_loadDB_html();


        $('#NouvMot').on('click', function () {

            compteurbonsMots = 0;
            compteurQuestions++;
            console.log("nbre de questions répondues : " + compteurQuestions);

            aleaTab =  Math.floor(Math.random() * obj_mots.length); // pour re-piocher aleatoirement, on redéfinit aleatab, au moment du click.

            reset();

            game_of_words();

            if (compteurQuestions == 10) {

                console.log(bonneReponse);
                document.getElementById("containerJeu").style.display = "none";
                document.getElementById("resultats").style.display = "block";
                document.getElementById("resultatjeu").innerHTML = bonneReponse + " /10";

                console.log(bonneReponse);
                score = bonneReponse;
                matiere = "PHP";

                ajax_send_scores(matiere, score);


            }

        });

    }
});


function ajax_loadDB_html() {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            obj_mots = JSON.parse(this.responseText);
            console.log(obj_mots);

            aleaTab =  Math.floor(Math.random() * obj_mots.length);


            game_of_words(); // on déclenche le jeu une fois que le tableau de mots est chargé,
            // car ici on se place dans la partie reponse de notre appel ajax

        }
    };

    xhttp.open("GET", "index.php?controler=ajax&action=readList&choice=" + db_table, true);

    xhttp.send();

}


function ajax_send_scores(matiere, score) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {


            console.log(this.responseText);


        }
    };

    xhttp.open("GET", "index.php?controler=scores&action=envoi&score=" + score + "&matiere=" + matiere, true);

    xhttp.send();

}



function reset() {
    $("#recupmots > div").remove();
    $("#aleaphrase > span").remove();
    $("#message").empty();

    document.getElementById("verifier").disabled = false;
}

function game_of_words() {

    var compteurmots = -1;

    document.getElementById("menuJeu").style.display = "none";
    document.getElementById("containerJeu").style.display = "block";

    document.getElementById("Question").innerHTML = obj_mots[aleaTab].question;

    // algorythme qui melange les lettres du mot.
    function shuffelWord(word) {
        var shuffledWord = '';
        word = word.split('');
        while (word.length > 0) {
            shuffledWord += word.splice(word.length * Math.random() << 0, 1);
        }
        return shuffledWord;
    }

    shuffledmot = shuffelWord(obj_mots[aleaTab].mot);


    for (var j = 0; j < shuffledmot.length; j++) { // attribue chaque span pour chaque lettre du mot gÃ©nÃ©rÃ©
        var tirets = document.createElement("span");
        tirets.innerHTML = shuffledmot[j];
        tirets.id = j;
        tirets.onclick = jeu;
        document.getElementById("aleaphrase").appendChild(tirets);
    }

    for (var q = 0; q < shuffledmot.length; q++) { // attribue chaque div pour chaque lettre du mot gÃ©nÃ©rÃ©
        var blocs = document.createElement("div");
        blocs.id = "mot" + q;
        blocs.style.display = "flex";
        blocs.style.justifyContent = "center";
        blocs.style.alignItems = "center";
        blocs.style.fontSize = "20px";
        blocs.style.border = "2px solid orange";
        blocs.style.width = "100px";
        blocs.style.borderRadius = "10px";
        document.getElementById("recupmots").appendChild(blocs);
    }

    function jeu() {

        compteurmots++;

        for (var p = 0; p < shuffledmot.length; p++) {

            if (compteurmots == p) {

                document.getElementById("mot" + p).innerHTML = this.innerHTML;
                document.getElementById(this.id).style.display = "none";
            }
        }
    }

}

document.getElementById('verifier').addEventListener('click', function () {

    for (var index = 0; index < shuffledmot.length; index++) {

        if (document.getElementById("mot" + index).innerHTML == obj_mots[aleaTab].bonnerep[index]) {

            compteurbonsMots++;

            document.getElementById("mot" + index).style.backgroundColor = "green";
            document.getElementById("mot" + index).style.color = "white";
            document.getElementById("mot" + index).style.borderColor = "green";

        }

        else {

            document.getElementById("mot" + index).style.backgroundColor = "red";
            document.getElementById("mot" + index).style.color = "white";
            document.getElementById("mot" + index).style.borderColor = "red";
        }

        if (compteurbonsMots == obj_mots[aleaTab].mot.length) {

            bonneReponse++;

            document.getElementById("message").innerHTML = "Bravo, vous avez su assembler les mots dans le bon ordre et trouver la phrase !";
            document.getElementById("verifier").disabled = true;


            console.log("compteur de bonnes réponses :" + bonneReponse);
        }

        if (compteurbonsMots < obj_mots[aleaTab].mot.length) {

            document.getElementById("message").innerHTML = "Certains mots sont mal placés, ce sont ceux en rouge. Ceux en vert sont bien placés.";
            document.getElementById("verifier").disabled = true;


        }
    }

});

/*document.getElementById('Retry').addEventListener('click', function () {

    compteurbonsMots = 0;
    compteurmots = -1;

    $("#recupmots > div").html("");

    for (var i = 0; i < obj_mots[aleaTab].mot.length; i++) {

        if (document.getElementById(i).style.display == "none") {

            document.getElementById(i).style.display = "block";
        }

    }
});
*/
/*
document.getElementById('Restart').addEventListener('click', function () {

    compteurbonsMots = 0;
    compteurmots = -1;

    $("#recupmots > div").html("");

    document.getElementById("message").style.display = "none";
    document.getElementById("verifier").disabled = false;
    document.getElementById("Restart").style.display = "none";
    document.getElementById("Retry").style.display = "block";

    for (var i = 0; i < obj_mots[aleaTab].mot.length; i++) {

        if (document.getElementById(i).style.display = "none") {

            document.getElementById(i).style.display = "block";

            document.getElementById("mot" + i).style.backgroundColor = "white";
            document.getElementById("mot" + i).style.color = "black";
            document.getElementById("mot" + i).style.borderColor = "orange";

        }

    }
});
*/
function recommencer() {

 window.location.reload();


}