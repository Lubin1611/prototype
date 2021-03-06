<?php
/**
 * Created by PhpStorm.
 * User: Administrateur
 * Date: 12/04/2019
 * Time: 13:48
 */

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Votre site de révisions</title>
    <script src="lib/jquery.js"></script>
    <link rel="stylesheet" href="Css/style_quizz.css">
    <link rel="stylesheet" href="bootstrap/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="Css/stylr.css">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
</head>
<body>

<header>
    <div id='container_btn'>
        <div id="btn_menu">Menu</div>
    </div>
    <div id='box_titre'>
        <div id='titre_site'>
            <h1>Page d'accueil</h1>
        </div>
        <div id="connection">
            <?php
            if (isset($_SESSION['rang']) and $_SESSION['rang'] == 0 || $_SESSION['rang'] == 1) {
                ?>

                <p>Bienvenue, <?php echo $_SESSION['nom'];
                    echo $_SESSION['prenom']; ?>
                </p>
                <a href="index.php?controler=users&action=deconnection">Se déconnecter</a>
                <?php
            } else {
            ?>
            <div id='redir_connect'>
                <a href="index.php?controler=users&action=vueConnection">Connectez-vous</a>
            </div>
            <div id="redir_signup">
                <a href="index.php?controler=users&action=vueInscription">Inscrivez-vous ici</a>
            </div>
        </div>
        <?php
        }
        ?>
    </div>
</header>

<div class="container_page">
    <div class="menu">
        <div id="sidebar">
            <ul>
                <li><a id="bloc1" href='index.php?'>Accueil</a></li>
                <li><a id="bloc2" href='index.php?controler=jeux&action=entrainement'>Jeu 1</a></li>
                <li><a id="bloc3" href='index.php?controler=jeux&action=jeuMots'>Jeu 2</a></li>
                <li><a id="bloc5" href='index.php?controler=jeux&action=quizz'>Jeu 3</a></li>
                <?php

                if (isset($_SESSION['rang']) and $_SESSION['rang'] == 0) {

                    ?>

                    <li><a id="bloc4" href='index.php?controler=users&action=espaceMembres'>Membres</a></li>

                    <?php

                } else if (isset($_SESSION['rang']) and $_SESSION['rang'] == 1) { ?>

                    <li><a id="bloc4" href='index.php?controler=users&action=panelAdmin'>Admin</a></li>

                    <?php
                } else {
                    ?>

                    <?php
                }
                ?>
            </ul>
        </div>
        <div><a id="btn">X</a></div>
    </div>

    <div id='accueil_quizz'>
        <div class="jumbotron" id="info_start3">
            <h1>Bienvenue sur le quizz, vous aurez une serie de 10 questions !</h1>
            <p>A la fin de cette serie, vous pourrez sauvegarder vos scores, et un nouveau quizz sera généré
                aleatoirement,
                et vos resultats seront sauvegardés. Bon jeu !
            <hr class="my-2">
            <p>
                <a class="btn btn-primary btn-lg" id="commencer" role="button">Commencez !</a>
            </p>
        </div>


        <?php
        if (isset($_SESSION['rang']) and $_SESSION['rang'] == 1 || $_SESSION['rang'] == 0) {
            ?>
            <div id="commenter">
                <form action="index.php?controler=jeux&action=comsQuizz&table=<?php echo 'quiz' ?>" method="post">
                    <label>Commentez :</label><textarea name="contenu_com" id="contenu_com"></textarea>
                    <input type="submit" value="Envoyez" class="btn btn-primary">
                </form>
            </div>
            <?php
        } else {
            ?>
            <div class="alert alert-info">Connectez-vous pour écrire un commentaire</div>
            <?php
        }
        ?>

        <div id="commentaires">

            <?php foreach ($commentaires as $com) { ?>

                <div class="media" id="affichage_commentaires">
                    <img class="d-flex mr-3" src=<?= $com->avatar ?>>
                    <div class="media-body">
                        <h5 class="mt-0">De : <?= $com->pseudo ?>, Date d'émission : <?= $com->date_com ?></h5>
                        <?= $com->contenu_com ?>
                    </div>
                </div>

            <?php } ?>

        </div>
    </div>

    <div id="container_quiz">
        <div id='box_questions'>
            <span id='intitule'></span><span id="questions"></span>
        </div>


        <div id="container_reponses">
            <div id="ligne_choix">
                <div id="reponse1"></div>
                <div id="reponse2"></div>
            </div>
            <div id="ligne_choix2">
                <div id="reponse3"></div>
                <div id="reponse4"></div>
            </div>
        </div>
    </div>


    <div id="container_scores">

        <div id="score"></div>
        <div id='retry'>Recommencer une serie de questions ? <span onclick="recommencer()">Cliquez ici</span></div>


        <div id="explications_score"></div>

    </div>
</div>


    <script src="Js/quizz.js"></script>
    <script src="Js/java.js"></script>
</body>
</html>
