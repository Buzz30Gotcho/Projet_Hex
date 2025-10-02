
import express from 'express';
import http from "http";
import {Server} from "socket.io";
var app = express();
const server = http.createServer(app);
const io = new Server(server, {});
server.listen(8090, () => { console.log('Le serveur est en cours ...') })


app.use(express.static("../JavaScript"));

var joueurs = [];

app.get('/',function(request,response){

    if(joueurs.length == 0){
        response.sendFile('configuration.html', {root: './'}); 

    }
    else{
        response.sendFile('clientHex1_0.html', {root: './'});
    }

});


app.get('/joueur',function(request,response){
    response.send(joueurs);
    
});


const objetJoueur = {
    joueurs: null,
    Erreur: null
};

app.get('/entree/:Nomjoueur',function(request,response){ 
    
    if((joueurs.length > 3) || (joueurs.includes(request.params.Nomjoueur))){
        objetJoueur.Erreur = "erreur1 : pas plus de 4 joueur"
        response.send(objetJoueur);
    }
    else if(!joueurs.includes(request.params.Nomjoueur)){
        joueurs.push(request.params.Nomjoueur); 
        objetJoueur.joueurs = joueurs; 
        response.send(objetJoueur);
    }

    io.emit("update_listejoueurs",joueurs);
});
app.get('/sortie/:nomJoueur',function(request,response){
    let indexJoueur = joueurs.indexOf(request.params.nomJoueur);
        if(request.params.nomJoueur=joueurs.includes(request.params.nomJoueur)){
            joueurs.splice(indexJoueur,1);
            response.send(JSON.stringify(joueurs));
            io.emit("update_listejoueurs",joueurs);

        }
        else{
            response.send("erreur2 : ce Joueur n'existe pas");
            io.emit("update_listejoueurs",joueurs);

        }
        
});

app.get('/lejeux',function(request,response){
    response.sendFile('hexagones.html',{root: './'});
});


var hex = [];
for(let i=0;i<121;i++){
    hex[i]=-1;
}


var jeton = 0;

var dernierPion = -1;

var position = 0;
var numJoueur = 0;

var couleurs = ["red","blue","green","black"];
var CouleursJoueur = [];
var TableauGagnant =[]; 
var Gagnant = false;

var L =[[1,11],[0,12,2],[1,13,3],[2,14,4],[3,15,5],[4,16,6],[5,17,7],[6,18,8],[7,19,9],[8,20,10],[9,21],[0,22,12],[11,23,13,1],[12,24,14,2],[13,25,15,3],[14,26,16,4],
            [15,27,17,5],[16,28,18,6],[17,29,19,7],[18,30,20,8],[19,31,21,9],[20,32,10],
            [33,23,11],[22,34,24,12],[23,35,25,13],[24,36,26,14],[25,37,27,15],[26,38,28,16],[27,39,29,17],[28,40,30,18],[29,41,31,19],[30,42,32,20],
            [31,43,21],[44,34,22],[33,45,35,23],[34,46,36,24],[35,47,37,25],[36,48,38,26],[37,49,39,27],[38,50,40,28],[39,51,41,29],[40,52,42,30],[41,53,43,31],
            [42,54,32],[55,45,33],[44,56,46,34],[45,57,47,35],[46,58,48,36],[47,59,49,37],[48,60,50,38],[49,61,51,39],[50,62,52,40],[51,63,53,41],[52,64,54,42],
            [53,65,43],[66,56,44],[55,67,57,45],[56,68,58,46],[57,69,59,47],[58,70,60,48],[59,71,61,49],[60,72,62,50],[61,73,63,51],[62,74,64,52],[63,75,65,53],
            [64,76,54],[77,67,55],[66,78,68,56],[67,79,69,57],[68,80,70,58],[69,81,71,59],[70,82,72,60],[71,83,73,61],[72,84,74,62],[73,85,75,63],[74,86,76,64],
            [75,87,65],[88,78,66],[77,89,79,67],[78,90,80,68],[79,91,81,67],[80,92,82,68],[81,93,83,69],[82,94,84,70],[83,95,85,71],[84,96,86,72],[85,97,87,73],
            [86,98,76],[99,89,77],[88,100,90,78],[89,101,91,79],[90,102,92,80],[91,103,93,81],[92,104,94,82],[93,105,95,83],[94,106,96,84],[95,107,97,85],[96,108,98,86],
            [97,109,87],[110,100,88],[99,111,101,89],[100,112,102,90],[101,113,103,91],[102,114,104,92],[103,115,105,93],[104,116,106,94],[105,117,107,95],[106,118,108,96],[107,119,109,97],
            [108,120,98],[99,111],[110,100,112],[111,101,113],[112,102,114],[113,103,115],[114,104,116],[115,105,117],[116,106,118],[117,107,119],[118,108,120]];

var tableauCase = [];
var num=0;   
app.get('/RecupeCase/:numtabCases/',function(request,response){
    num = parseInt(request.params.numtabCases,10);
    tableauCase.push(num);
});
setTimeout(()=>{
    console.log(tableauCase);
},50)


app.get('/pion/:position/:numJoueur/',function(request,response){
    position = parseInt(request.params.position,10); 
    numJoueur = parseInt(request.params.numJoueur,10); 

    if(joueurs.length == 0){jeton=0;} 

    switch(numJoueur){
        case 0:
            hex[position] = numJoueur;
            response.send("Action effectuée: position: " + position + "; numJoueur: " + numJoueur);
            jeton = 1;
            dernierPion = position;

            if(hex[position]==0){
                for(let x of L[position] ){
                    if(hex[x]==0){
                        TableauGagnant.push(x);
                    }

                }
                console.log(TableauGagnant);
                console.log(hex);
            }
            
            for(var y of tableauCase){
                for(var s of TableauGagnant){ 
                    if(TableauGagnant.includes(y) && L[y].includes(s) ){
                            Gagnant=true;
                            console.log(Gagnant);
                    } 
                } 
            } 
            
            break;
        case 1:
            hex[position] = numJoueur;;
            response.send("Action effectuée: position: " + position + "; numJoueur: " + numJoueur);
            if(nbJoueur==2){jeton = 0;}
            if(nbJoueur==3){jeton = 2;} 
            if(nbJoueur==4){jeton = 2;}
            dernierPion = position;

            break;
        case 2:
            hex[position] = numJoueur;;
            response.send("Action effectuée: position: " + position + "; numJoueur: " + numJoueur);
            if(nbJoueur==3){jeton = 0;} 
            if(nbJoueur==4){jeton = 3;}
            dernierPion = position;

            break;
        case 3:
            hex[position] = numJoueur;;
            response.send("Action effectuée: position: " + position + "; numJoueur: " + numJoueur);
            jeton = 0;
            dernierPion = position;

            break;
        default:
            response.send("erreur de position ou du numJoueur" + "<br>" + JSON.stringify(hex) );
            break;
    }

    dataPion.dernierP = dernierPion;
    dataPion.numJ = numJoueur;
    
}); 

const dataPion = {
    dernierP: null , 
    numJ: null,
};

app.get('/dernierPion',function(request,response){

    response.send(" dernier pion joué: " + dataPion.dernierP + "<br>"
    + " numero du joueur l'ayant joué: " + dataPion.numJ + "<br>" + JSON.stringify(hex));

});

app.get('/etatPartie',function(request,response){
    response.send("voici la liste Hex: <br>" + JSON.stringify(hex));

});

app.get('/etatJeton',function(request,response){
    response.send(JSON.stringify(jeton));
});

var TabJouEnCours = [];



app.get('/salleAttente/:player',function(request,response){
    response.sendFile("clientHex1_1.html",{root : './'});
    io.emit("update_listejoueurs",joueurs);

    if(joueurs.length == nbJoueur){ 
        for(let i=0;i<joueurs.length;i++){
            TabJouEnCours.splice(i,1);
            TabJouEnCours.push(joueurs[i]);
            CouleursJoueur[i] = couleurs[i];
        }
    }


});

var joueurRetenu = "";
app.get('/url/:joueurRetenu',function(request,response){
    joueurRetenu = request.params.joueurRetenu;
});


app.get('/JeuxHex/:joueurEncour',function(request,response){
    switch(joueurs.includes(request.params.joueurEncour)){
        case true:
            response.sendFile("hexagones.html",{root : './'});
            io.emit("update_listejoueurs",joueurs);
            break;
        case false:
            response.redirect('http://localhost:8088/');
            break;
        default:
            break;
    }   
});

app.get('/TableauHex',function(request,response){
    
    if(joueurs.length==0){
        for(let i=0;i<121;i++){
            hex[i]=-1;
        }
    }
    

    response.send(hex);
});


var nbJoueur = -1;

app.get('/configuration/:nbJoueur',function(request,response){
    nbJoueur = request.params.nbJoueur;
    response.send(nbJoueur);
});

app.get('/configuration/',function(request,response){
    response.send(nbJoueur);
});

app.get('/nbJoueur',function(request,response){
    response.send(nbJoueur);
}); 


var nomJoueurss = "";
app.get('/couleur/:JoueurEnCour',function(request,response){
    nomJoueurss = request.params.JoueurEnCour;
    response.send(JSON.stringify(CouleursJoueur[joueurs.indexOf(nomJoueurss)]));
});


var longs = -1;
app.get('/longueur/:longs',function(request,response){
    longs = request.params.longs;
});

app.get('/longueur',function(request,response){
    response.send(longs);
});

var large = -1;
app.get('/largeur/:large',function(request,response){
    large = request.params.large;
});

app.get('/largeur',function(request,response){
    response.send(large);
});


app.get('/JSON',function(request,response){
    response.sendFile("fichierHexDonne.json", {root : './'});
});


app.get('/fichierserveurjs',function(request,response){
    response.sendFile("serveurHex1_3.js", {root : './'});
});


var tab=[]; 
app.get('/sendMessage/:player/:message',function(request,response){
 tab.push({player:request.params.player,message:request.params.message})
 io.emit("update_tchat",tab[tab.length-1]); // envoi a tous les clients garce à io
 console.log("message envoye : ",tab[tab.length-1]);
});


app.get('/message/',function(request,response){
     response.send(tab);
});

io.on('connection',(data)=>{
    console.log('un utilisateur est connecte');
    io.emit("update_listejoueurs",joueurs);
  //  fetch("https://pokeapi.co/api/v2/pokemon/ditto").then(res=>res.json()).then(data=>console.log(data));
  //  l'api pokeapi contient des donnes sur les pokemons
  // l'url contient comme parametre pokemon/ditto (ditto est un pokemon)
  // donne les informations sur le pokemon "ditto" 
  //  le app.get() est un service web

  fetch("https://world.openfoodfacts.org/api/v0/product/737628064502")
  .then(res=>res.json())
  .then(data=>console.log(data))
});


io.on('disconnect', function () {
    console.log('A user disconnected');
 });



io.on('message', function(message){
    message= JSON.parse(message);
    if(message.type == "userMessage"){
    socket.broadcast.send(JSON.stringify(message));
    message.type = "myMessage";
    socket.send(JSON.stringify(message));
    }
    });

    
