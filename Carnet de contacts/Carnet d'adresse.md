---


---

<h1 id="carnet-dadresse">Carnet d’adresse</h1>
<p>Le but du carnet d’adresse est de permettre à l’utilisateur de saisir les informations d’un contact et ensuite de les afficher dans une liste avec la possibilité de voir les détails du contact, mais également de le modifier.</p>
<blockquote>
<p>Même si l’utilisateur rafraîchi la page, les contacts s’affichent toujours. On a donc une persistance des données (= elles sont stockées quelque part).</p>
</blockquote>
<h2 id="stocker-les-données--localstorage">Stocker les données : localStorage</h2>
<p>Le localStorage permet de stocker des données dans le navigateur web.</p>
<p>⚠️On ne peut pas stocker de données complexes dans le localStorage (tableau, objets…). il va donc falloir les <strong>sérialiser</strong> (=convertir en texte) avant de les stocker dans le localStorage</p>
<blockquote>
<p>Pour ce faire, on va utiliser la conversion au format de données JSON &gt; <a href="https://la-cascade.io/json-pour-les-debutants/">en savoir plus sur le JSON</a></p>
</blockquote>
<ul>
<li>Mettre quelque chose dedans : <code>localStorage.setItem('nomItem', données en JSON)</code></li>
<li>Récupérer le contenu du localStorage : <code>var datas = localStorage.getItem('nomItem')</code></li>
</ul>
<p>⚠️ Pour utiliser les données récupérées depuis le localStorage, il va falloir les désérialiser = les convertir d’un texte JSON vers un objet <em>complexe</em></p>
<h2 id="les-gestionnaires-dévénement">Les gestionnaires d’événement</h2>
<ol>
<li>quand on clique sur l’icône <code>➕</code>, le formulaire s’affiche</li>
<li>quand on clique sur <code>ENREGISTRER</code>, cela appelle une fonction qui enregistre le contact (<code>onClickSaveContact</code>)</li>
<li>quand on clique sur l’icône poubelle, cela supprime la liste de contacts (<code>onClickClearAddressBook</code>)</li>
<li>quand on clique sur le nom d’un contact dans la liste, ça nous affiche le détail du contact dans une section</li>
<li>dans cette section, on a un lien pour éditer le contact, ce qui nous affiche le formulaire pré-rempli</li>
</ol>
<h2 id="fonction-dajout-de-contact">Fonction d’ajout de contact</h2>
<p>⚠️  s’assurer que le submit du formulaire natif ne se fasse pas, s’il se fait, trouver comment l’annuler en JS</p>
<p>Récupérer les informations saisies par l’utilisateur et les stocker dans un objet qui doit au final ressembler à :</p>
<pre><code> {
	 firstName : "Toto",
	 lastName : "Gribouille",
	 phone : "0123456789",
	 title : "M."
  }
</code></pre>
<p>On stocke ensuite cet objet nouvellement créé dans un tableau qu’on vient ajouter dans le localStorage.</p>
<blockquote>
<p>Créer une fonction qui se charge de l’ajout des données reçues dans le localStorage. Bien penser à sérialiser ces données.</p>
</blockquote>
<p>Une fois l’ajout terminé, on vide le formulaire et on le cache.</p>
<h3 id="vérification">Vérification</h3>
<p>On vérifie dans l’outil de développement &gt; onglet <strong>Application</strong> ou <strong>stockage</strong> &gt; que notre item (nom défini dans le setItem) apparait bien et que les valeurs sont bien celles du formulaire. Ca doit ressembler à ça :</p>
<pre><code>[{"firstName":"Toto","lastName":"Gribouille","phone":"0123456789","title":"M."}]
</code></pre>
<p>C’est bon ? Cool, on passe à la suite 🎉</p>
<h2 id="pouvoir-ajouter-plusieurs-contacts">Pouvoir ajouter plusieurs contacts</h2>
<blockquote>
<p>⚠️ SetItem vient écraser le contenu déjà présent à l’item dans le localStorage, si on vient rajouter une donnée, par exemple un contact, celui-ci va écraser d’éventuels contacts déjà présents.</p>
</blockquote>
<p>Il faut donc au préalable récupérer la liste de contacts existants (donc un tableau de contacts).<br>
A cette liste on ajoute notre nouveau contact, et c’est cette liste là (ce tableau) qu’on enregistre avec le setItem (rappelez vous le CSV 😉)</p>
<p>Il va donc falloir créer une fonction qui récupère le contenu du localStorage, et le désérialise de façon à transformer le JSON en objet complexe.</p>
<h2 id="affichage-des-contacts">Affichage des contacts</h2>
<p>Quand on arrive sur la page, et quand on ajoute un contact, il faut afficher les contacts enregistrés dans le localStorage.</p>
<p>La génération de cette liste HTML se fait donc à partir du JS (un peu à l’instar du echo de PHP, on va ici créer notre liste de contacts <code>ul/li</code> en JS et venir la mettre dans le HTML).</p>
<blockquote>
<p>Cette fonction d’affichage de contacts doit donc être appelée dès le chargement de la page HTML mais aussi dès qu’on ajoute un contact afin de voir le nouveau contact apparaitre sans avoir à rafraichir la page.</p>
</blockquote>
<p>Pour récupérer la liste de contacts, on a déjà une fonction qui va chercher les infos dans le localStorage : réutilisons la ! Elle nous retourne un tableau sur lequel il suffit de boucler pour générer la liste.</p>
<h2 id="détail-du-contact">Détail du contact</h2>
<p>Le nom du contact est dans un lien, quand on clique dessus, ses informations sont affichées dans un <code>&lt;aside&gt;</code> qui est initialement caché et et existant dans le HTML qui s’affiche quand on clique sur le nom du contact. On a également un bouton ou lien <code>EDITER</code> qui nous permet de modifier ses informations.</p>
<blockquote>
<p>Comment identifier le contact sur lequel on a cliqué, et donc récupérer ses infos ? Sa position est déterminée par un index dans un tableau…on peut donc l’identifier du moment que cet index est conservé dans un attribut HTML (ex: data attributs, id ou class)</p>
</blockquote>
<h2 id="éditer-le-contact">Éditer le contact</h2>
<p>Quand on clique sur le lien d’édition du contact, le formulaire s’affiche pré-rempli. Il s’agit toujours du même formulaire, sauf que cette fois-ci il n’ai pas en <code>data-mode="add"</code> mais passe en <code>data-mode="edit"</code>.</p>
<p>La fonction appelée à l’enregistrement est toujours la même, il va falloir l’adapter : si le formulaire est en mode ajout, on fait ce que la fonction faisait avant (ajout de l’objet contact dans le tableau), sinon, on vient modifier la ligne du tableau à l’index du contact choisi.</p>
<h2 id="vider-la-liste-de-contacts">Vider la liste de contacts</h2>
<p>La fonctionnalité la plus facile : supprimer tous les contacts quand on appuie sur le bouton poubelle</p>

