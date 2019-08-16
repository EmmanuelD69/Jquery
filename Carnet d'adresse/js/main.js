$(document).ready(function(){
    //code qui ne s'éxécute qu'une fois que la page HTML est bien chargée
    $("#plus").on('click', onClicshowForm)
    $("#btn").on('click', onClickSaveContact)
    $("#effacer").on('click', onClickClearAddressBook)
    })

function onClicshowForm(){
    /* 3 versions possible pour cacher/montrer */
    // $("form").toggleClass('hide')
    // $("form").toggle()
    $("form").fadeToggle()
}

function onClickSaveContact(event){
    event.preventDefault() /* Interruption de l'action submit du formulaire, afin de pouvoir executer les instructions de ma fonction */
    var carnet = localStorage.getItem("carnet") /* Récupère les infos JSON stockés en local à partir de la clé "carnet" */
    if(carnet == null){ //si le local storage ne renvoie rien car rien d'enregistré
    carnet = [] //liste est un tableau vide
    } else { //sinon
    carnet = JSON.parse(carnet) //converti le JSON en données complexes (ici tableau contenant des objets)
    }
    var contact = new Object()  /* objet qui va récupérer les infos des contact */ 
    var JqueryToJason   /* variable qui va enregistrer nos infos de contacts en JSON */
    contact.civilite = $("#civilite").val() /* récupération depuis le formulaire et stockage de la civilité du contact dans l'objet "contact" */
    contact.nom = $("#nom").val()   /* récupération depuis le formulaire et stockage du Nom du contact dans l'objet "contact" */
    contact.prenom = $("#prenom").val() /* récupération depuis le formulaire et stockage du Prénom du contact dans l'objet "contact" */ 
    contact.telephone = $("#telephone").val() /* récupération depuis le formulaire et stockage du téléphone du contact dans l'objet "contact" */
    carnet.push(contact) /* envoi des infos contenus dans l'objet "contact" vers le tableau "carnet" */
    $("#formulaire")[0].reset() /* Reset du formulaire */
    JqueryToJason = JSON.stringify(carnet) /* conversion des infos contenus dans le tableau "carnet" en données JSON */ 
    localStorage.setItem("carnet", JqueryToJason) /* Enregistrement des données JSON en cache local sur le navigateur */
    $("#contactList").empty()
    listCarnetContact()
}

function onClickClearAddressBook(){
    carnet = []
}

function listCarnetContact(){    
    var carnet = localStorage.getItem("carnet") /* Récupère les infos JSON stockés en local à partir de la clé "carnet" */
    if(carnet == null){ //si le local storage ne renvoie rien car rien d'enregistré
    carnet = [] //liste est un tableau vide
    } else { //sinon
    carnet = JSON.parse(carnet) //converti le JSON en données complexes (ici tableau contenant des objets)
    }
    console.log(carnet)
    for(i=0; i < carnet.length; i++){
        $("#contactList").append("<ul>" + "<li>" + carnet[i].prenom + " " + carnet[i].nom + "</li>" + "</ul>")
    }
}