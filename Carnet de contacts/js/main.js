var liste /* Cette variable va enregistrer l'ensemble des contacts sous forme de tableau d'objets, 1 objet représentant 1 contact. Je la rend accessible à l'ensemble des fonctions qui vont en avoir besoin. */

/* Cette fonction permet d'afficher ou de faire disparaitre le formulaire de la page web */
function onClicshowForm(){
    /* 3 versions possible pour cacher/montrer le formulaire */
    // $("form").toggleClass('hide')
    // $("form").toggle()
    $("form").fadeToggle()
    $("form").data("mode", "add") /* passe l'attribut "mode" du formulaire en mode "add" (ajout) */
}

/* Cette fonction permet de consulter le cache local du nagivateur web, et le cas échant, de retourner les infos qui y sont stockées. */
function checkLocalStorage(){
    liste = localStorage.getItem("carnet") /* Récupère les infos JSON stockés, en cache local sur le navigateur, à partir de la clé "carnet" */
    if(liste == null){ /*si le local storage ne renvoie rien car rien d'enregistré */
    liste = [] /* liste est un tableau vide */
    } else { /* sinon */
    liste = JSON.parse(liste) /* converti les données JSON en données complexes (ici tableau contenant des objets) */
    }
}

/* Cette fonction sert à enregistrer un nouveau contact au moment où l'on clic sur le bouton "enregistrer" du formulaire, mais pas que... cf:voir les commentaires de la fonction */
function onClickSaveContact(event){
    event.preventDefault() /* Interruption de l'action submit du formulaire, afin de pouvoir executer les instructions de ma fonction */
    checkLocalStorage() /* récupération des infos JSON stockées en local, s'il y'en a */

    var mode = $("#formulaire").data("mode")
    var index= $("#infosContact a").data('index')

    var contact = new Object()  /* création d'un objet qui va récupérer les infos du formulaire */
    contact.civilite = $("#civilite").val() /* récupération depuis le formulaire et stockage de la civilité du contact dans l'objet "contact" */
    contact.nom = $("#nom").val()  /* récupération depuis le formulaire et stockage du Nom du contact dans l'objet "contact" */
    contact.prenom = $("#prenom").val() /* récupération depuis le formulaire et stockage du Prénom du contact dans l'objet "contact" */ 
    contact.telephone = $("#telephone").val() /* récupération depuis le formulaire et stockage du téléphone du contact dans l'objet "contact" */

    
    if (mode == "edit") {
        checkLocalStorage()
        liste[index].civilite = $("#civilite").val()
        liste[index].nom = $("#nom").val()
        liste[index].prenom = $("#prenom").val()
        liste[index].telephone = $("#telephone").val()
    } 
    
    else {
        liste.push(contact) /* envoi des infos contenus dans l'objet "contact" vers le tableau "liste" */
    }    
    $("#formulaire")[0].reset() /* Reset du formulaire */
    var JqueryToJason = JSON.stringify(liste, null, '\t') /* conversion des infos contenus dans le tableau "liste" en données JSON */ 
    localStorage.setItem("carnet", JqueryToJason) /* Enregistrement des données JSON en cache local sur le navigateur */
    $("#contactList").empty() /* Effacement de l'ancienne liste de contacts dans la page web*/
    listCarnetContact() /* Mise à jour de la liste de contact */
    $("form").fadeToggle() /* On cache le formulaire */
}

/* Cette fonction sert à effacer complètement la liste de contact, y compris dans le cache local */
function onClickClearAddressBook(){
    $("#contactList").empty() /* Effacement de l'ancienne liste de contacts affichée sur la page web */
    $("#infosContact h3, #infosContact p").empty() /* Effacement des infos sur le contact affichée sur la page web */
    localStorage.clear() /* Effacement de l'ensemble des données contenues dans le cache local du navigateur */
}

/* Cette fonction affiche la liste de contact sur la page web */
function listCarnetContact(){    
    checkLocalStorage() /* appel à la fonction "checkLocalStorage" */
    $('#contactList').html('<ul>') /* Création d'une ul pour y insérer les li correspondant à nos contacts enregistrés */
    for(i=0; i < liste.length; i++){ /* pour chaque objets contenus dans le tableau "liste" */
        $("#contactList ul").append("<li>" + '<a href="#" data-index="' +i+ '">'+ liste[i].prenom + " " + liste[i].nom + "</a>" + "</li>") /* Affiche le prénom suivi du nom dans une li et attribut à chaque li un index qui sera utilisé pour afficher le détail du contact lorsqu'on clic sur son nom.*/
    }
}

function displayContact(){
    if(infosContact.style.display == "none"){
        $("#infosContact").toggle()        
    }    
    var index = $(this).attr('data-index') /* Récupère l'index du contact sur lequel on a clic */
    switch (liste[index].civilite) {
        case "1":
            civilite = "Madame" 
            $("#infosContact h3").text("Madame " + liste[index].prenom + " " + liste[index].nom)
            break;
        case "2":
            civilite = "Mademoiselle" 
            $("#infosContact h3").text("Mademoiselle " + liste[index].prenom + " " + liste[index].nom)
            break;
        case "3":
            civilite = "Monsieur" 
            $("#infosContact h3").text("Monsieur " + liste[index].prenom + " " + liste[index].nom)
            break;
    }
    $("#infosContact p").text(liste[index].telephone)
    $("#infosContact a").data('index', index)
}

function editContact(){
    var index = $(this).data('index') /* Récupère l'index du contact sur lequel on a clic */
    /* affiche le formulaire et indique qu'on est en mode "edit" */
    $("#formulaire").data("mode", "edit").fadeIn()
    /* Récupère les infos des contacts enregistrés en cache local */
    checkLocalStorage()
    /* afficher la valeur de chaque champs pour le contact qu'on edit */
    $("#civilite").val(liste[index].civilite)
    $("#nom").val(liste[index].nom)
    $("#prenom").val(liste[index].prenom)
    $("#telephone").val(liste[index].telephone)
}

/* code qui ne s'éxécute qu'une fois que la page HTML est bien chargée */
$(document).ready(function(){
    $("#plus").on('click', onClicshowForm) /* mise en place d'un écouteur d'évènement */
    $("#btn").on('click', onClickSaveContact) /* mise en place d'un écouteur d'évènement */
    $("#effacer").on('click', onClickClearAddressBook) /* mise en place d'un écouteur d'évènement */
    $("form").toggle() /* On cache le formulaire */
    $("#infosContact").toggle() /* On cache les détails des contacts */
    $("#contactList").on('click', 'ul li a', displayContact) /* mise en place d'un écouter d'évènement qui se déclenchera lorsqu'on va clic sur le nom d'un contact */
    $("#infosContact a").on('click', editContact)
    checkLocalStorage() /* appel à la fonction "checkLocalStorage" afin de verifier s'il exite des données dans le cache local au moment du chargement de la page */
    listCarnetContact() /* appel à la fonction "listCarnetContact" afin d'afficher la liste de contact au moment du chargement de la page */
    })
