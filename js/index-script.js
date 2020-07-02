let template1;
let template2;

let templateClone;
let templateClone2;

let newPlace1;
let newPlace2;

let mainTitle;

let template3;
let template4;

let templateClone3;
let templateClone4;

let newPlace3;
let newPlace4;

let charactersDatabase;

let selectedData;

let viewButtons;

let reader;
let result;
let img;
let charName;
let shortDesc;
let charDesc;

function encodeImageFileAsURL(element){
    let file = element.files[0];
    reader= new FileReader();
    reader.onloadend = function() {
        result = reader.result;
        img = result.substring(23, result.length)
        console.log("RESULT", img)
    }
    reader.readAsDataURL(file);
}


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
	template3 = document.getElementById("template-editor").content;
	template4 = document.getElementById("template-delete").content;
	// Stocker la cible dans des variables
	newPlace1 = document.getElementById("target");
	newPlace2 = document.getElementById("target2");
	newPlace3 = document.getElementById("target3");
	newPlace4 = document.getElementById("target4");
	
	// Pour chaque élément de data...
	data.forEach((element) =>
	{
		// Cloner les templates
		templateClone = template1.cloneNode(true);
		templateClone2 = template2.cloneNode(true);
		templateClone3 = template3.cloneNode(true);
		templateClone4 = template4.cloneNode(true);
		
		// Inscrire les données concernées de l'API dans la copie du template
		templateClone.querySelector(".image").src = "data:image/gif;base64," + element.image;
		if (element.image === "")
		{
			templateClone.querySelector(".card__image").style.display = "none";
		}
		templateClone.querySelector(".card__title").innerHTML = element.name;
		templateClone.querySelector(".card__short-description").innerHTML = element.shortDescription;
		templateClone.querySelector(".view").setAttribute("id", element.id);
		templateClone.querySelector(".edit").setAttribute("id", element.id);
		templateClone.querySelector(".delete").setAttribute("id", element.id);
		
		// Placer le clone du template rempli avec les données dans la cible 1
		newPlace1.appendChild(templateClone);
	})


	// Pour voir
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
			document.getElementById("target").style.display = "none";
			// Afficher uniquement la carte du personnage sélectionné
			document.getElementById("target2").style.display = "block";
			
			// Placer les valeurs dans la copie du template 2
			// Placer la valeur de l'image
			templateClone2.querySelector(".image2").src = "data:image/gif;base64," + select.image;
			if (select.image === "")
			{
				templateClone2.querySelector(".card__image2").style.display = "none";
			}
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
	});


	// Pour éditer
	let clickEdit;
    
    document.querySelectorAll(".edit").forEach((element) =>
	{
        element.addEventListener("click", () =>
		{
			changeMainTitleEdit();
			
			clickEdit= element.getAttribute("id");
			let change = data.find(element => element.id == clickEdit);

            document.getElementById("target").style.display = "none";
			
            templateClone3.querySelector(".image").src = "data:image/gif;base64," + change.image;
            
			templateClone3.querySelector(".edit__title").innerHTML = change.name;

			templateClone3.querySelector(".edit__short-description").innerHTML = change.shortDescription;

            templateClone3.querySelector(".edit__description").style.display = "block";
			templateClone3.querySelector(".edit__description").innerHTML = change.description;

            newPlace3.appendChild(templateClone3);
            
            document.getElementById("changes").addEventListener("click", function() {

                charName = document.querySelector(".edit__title").value;
                shortDesc = document.querySelector(".edit__short-description").value;
                charDesc = document.querySelector(".edit__description").value;
                
                fetch("https://character-database.becode.xyz/characters/" + clickEdit, {
            
                    method: "PUT",
                    headers: {
                        Accept: "application/json",                
                        "Content-Type": "application/json; charset=utf-8",
                    },
            
                    body: JSON.stringify({
                        id: clickEdit,
                        name: charName,
                        description: charDesc,
                        shortDescription: shortDesc,
                        image: img || change.image,
                    }),
                });

                setTimeout(function(){
                    location.reload();
                },1000);
            });
        })
	});
	

	// Pour supprimer
	let clickDelete;
    
    document.querySelectorAll(".delete").forEach((element) =>
	{
        element.addEventListener("click", () =>
		{
			changeMainTitleDelete();
			
			clickDelete = element.getAttribute("id");
			let toBeDeleted = data.find(element => element.id == clickDelete);

            document.getElementById("target").style.display = "none";
			
            templateClone4.querySelector(".image").src = "data:image/gif;base64," + toBeDeleted.image;
            
			templateClone4.querySelector(".card__title").innerHTML = toBeDeleted.name;

            newPlace4.appendChild(templateClone4);
            
            document.getElementById("approve-delete").addEventListener("click", function() {
                
                fetch("https://character-database.becode.xyz/characters/" + clickDelete, {
            
                    method: "DELETE",
                
                });

                setTimeout(function(){
                    location.reload();
                },1000);
            });

            document.getElementById("refuse-delete").addEventListener("click", function() {
                location.reload();
            })
        })
	});
	
	// Au clic du bouton, refresh de la page pour réafficher les cartes
	document.getElementById("reload").addEventListener("click", () =>
	{
		location.reload();
	})
});

function changeMainTitle()
{
	mainTitle = document.querySelector("#title");
	mainTitle.innerHTML = "SINGLE CHARACTER";
}

function changeMainTitleEdit()
{
	mainTitle = document.querySelector("#title");
	mainTitle.innerHTML = "EDIT CHARACTER";
}

function changeMainTitleDelete()
{
	mainTitle = document.querySelector("#title");
	mainTitle.innerHTML = "DELETE CHARACTER";
}