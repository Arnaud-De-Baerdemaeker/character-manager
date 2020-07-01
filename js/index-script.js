let template1;
let template2;
let templateClone;
let templateClone2;
let newPlace1;
let newPlace2;
let mainTitle;


// Récupération des données de l'API
charactersDatabase = fetch("https://character-database.becode.xyz/characters")
.then((data) =>
{
	return data.json();
})
.then((data) =>
{
	// Récupération des éléments du template 1
	template1 = document.getElementById("template-list").content;
	// Récupération des éléments du template 2
	template2 = document.getElementById("template-character").content;
	// Stocker la cible dans des variables
	newPlace1 = document.getElementById("target");
	newPlace2 = document.getElementById("target2");
	
	// Pour chaque élément de data...
	data.forEach((element) =>
	{
		// Cloner les templates
		templateClone = template1.cloneNode(true);
		templateClone2 = template2.cloneNode(true);
		
		// Inscrire les données concernées de l'API dans la copie du template
		templateClone.querySelector(".image").src = "data:image/gif;base64," + element.image;
		templateClone.querySelector(".card__title").innerHTML = element.name;
		templateClone.querySelector(".card__short-description").innerHTML = element.shortDescription;
		templateClone.querySelector(".view").setAttribute("id", element.id);
		
		// Placer le clone du template rempli avec les données dans la cible 1
		newPlace1.appendChild(templateClone);
	})

	let clicid;

	// Pour chaque bouton cliqué...
	document.querySelectorAll(".view").forEach((el) =>
	{
		// On écoute sur quel bouton on appuie
		el.addEventListener("click", () =>
		{
			// Fonction pour changer le titre
			changeMainTitle();
			
			// On récupère la valeur de l'attribut "id" de l'élément cliqué dans une variable
			clicid = el.getAttribute("id");
			
			// On cherche dans les données de l'API quel élément correspond à la valeur de l'id stockée dans la variable "clicid" et on stocke dans une variable
			let select = data.find(element => element.id == clicid);

			// Masquer l'affichage des cartes
			// document.getElementById("target").style.display = "none";
			swipeDown();
			// Afficher uniquement la carte du personnage sélectionné
			document.getElementById("target2").style.display = "block";
			
			// Placer les valeurs dans la copie du template 2
			// Placer la valeur de l'image
			templateClone2.querySelector(".image2").src = "data:image/gif;base64," + select.image;
			// Placer la valeur de name
			templateClone2.querySelector(".card__title2").innerHTML = select.name;
			// Afficher l'id
			templateClone2.querySelector(".card__id2").style.display = "block";
			// Placer la valeur de id
			templateClone2.querySelector(".card__id2").innerHTML = select.id;
			// Placer la valeur de short-description
			templateClone2.querySelector(".card__short-description2").innerHTML = select.shortDescription;
			// Afficher description
			templateClone2.querySelector(".card__description2").style.display = "block";
			// Placer la valeur de description
			templateClone2.querySelector(".card__description2").innerHTML = select.description;

			// Placer le clone de template 2 rempli avec les données dans la cible 2
			newPlace2.appendChild(templateClone2);
		});

		// Au clic du bouton, refresh de la page pour réafficher les cartes
		document.getElementById("reload").addEventListener("click", () =>
		{
			location.reload();
		})
	});
});

function changeMainTitle()
{
	mainTitle = document.querySelector("#title");
	mainTitle.innerHTML = "SINGLE CHARACTER";
}

function swipeDown()
{
	let targetClass = document.querySelector(".target");
	targetClass.classList.add("targetDown");
	targetClass.classList.remove("target");
}