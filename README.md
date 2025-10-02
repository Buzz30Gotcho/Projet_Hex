# Projet_Hex
===================

Étape 1 : Lancer le serveur
---------------------------
Ouvrez le terminal dans le dossier `JavaScript` puis tapez :  
node serveur

Étape 2 : Configurer la partie
------------------------------
- Saisissez votre nom.
- Configurez le nombre de joueurs (de 2 à 4).
- Configurez le damier.
- Cliquez sur "Entrer dans la Partie".

Étape 3 : Page d’attente
-------------------------
Vous serez dirigé vers la page d’attente contenant :
- Une messagerie pour communiquer avec les autres joueurs.
- Deux boutons : "Quitter" et "Jouer".

Attention :  Vous ne pouvez jouer que lorsqu’un deuxième joueur est entré.

Étape 4 : Ajouter un autre joueur
---------------------------------
Ouvrez un nouvel onglet et tapez l’URL suivante :  
http://localhost:8088/

Un autre joueur pourra ainsi rejoindre la partie.

Étape 5 : Rejoindre la partie
-----------------------------
- Appuyez sur le bouton "Joueur" dans le nouvel onglet.
- Répétez cette opération pour chaque joueur supplémentaire si vous avez choisi plus de 2 joueurs.

> Les joueurs peuvent communiquer entre eux via la messagerie.

Étape 6 : Jouer
----------------
- Tous les joueurs présents peuvent jouer et continuer à utiliser la messagerie.
- La partie peut se dérouler à 2, 3 ou 4 joueurs selon votre configuration.

Attention : Si un joueur quitte en cours de partie, les autres continuent.
Pour recommencer une partie depuis zéro, tous les joueurs doivent quitter puis relancer le jeu.
