<?php
/**
 * Created by PhpStorm.
 * User: Lubin
 * Date: 10/03/2019
 * Time: 14:37
 */

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Votre site de révisions</title>
    <link rel="stylesheet" href="bootstrap/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="Css/stylr.css">
    <link rel="stylesheet" type="text/css" href="Css/style_inscription.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
          integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <script src="lib/jquery.js"></script>
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
</head>
<body>

<header>
    <div id='container_btn'>
        <div id="btn_menu">Menu</div>
    </div>
    <div id = 'box_titre'>
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

    <div class="container_inscription">
        <div id="inscription">

            <?php if (isset($message)) echo $message; ?>

            <h1>Inscrivez - vous</h1>


            <form action="index.php?controler=users&action=inscription" method="post">
                <label>Votre Nom : </label><input type="text" name="nom"><br>
                <label>Votre Prenom : </label><input type="text" name="prenom"><br>
                <label>Votre Pseudo : </label><input type="text" name="pseudo"><br>
                <label>Votre mot de passe : </label><input type="password" name="mdp"><br>
                <span>Choisissez votre avatar : </span>
                <div id="avatar">
                    <i class="fas fa-arrow-left" id='prev'></i><img id="choix_user" alt='choix_avatar'><i
                            class="fas fa-arrow-right" id="next" name="avatar"></i>
                    <input type="hidden" name="valeur_image" id="src_image">
                </div>
                <label>Votre e-mail : </label><input type="email" name="mail"><br>
                <input type="submit" value="Inscrivez-vous">
            </form>
        </div>
    </div>
</div>



<script src="Js/js_inscription.js"></script>
<script src="Js/java.js"></script>
</body>
</html>
