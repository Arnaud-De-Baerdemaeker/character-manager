let template1;
let template2;
let templateClone;
let templateClone2;
let newPlace1;
let newPlace2;
let mainTitle;


charactersDatabase = fetch("https://character-database.becode.xyz/characters")
.then((data) =>
{
	return data.json();
})
.then((data) =>
{
	template1 = document.getElementById("template-list").content;
	template2 = document.getElementById("template-character").content;
	newPlace1 = document.getElementById("target");
	newPlace2 = document.getElementById("target2");
	
	data.forEach((element) =>
	{
		templateClone = template1.cloneNode(true);
		templateClone2 = template2.cloneNode(true);
		
		templateClone.querySelector(".image").src = "data:image/gif;base64," + element.image;
		templateClone.querySelector(".card__title").innerHTML = element.name;
		templateClone.querySelector(".card__short-description").innerHTML = element.shortDescription;
		templateClone.querySelector(".view").setAttribute("id", element.id);
		
		newPlace1.appendChild(templateClone);
	})

	let clicid;

	document.querySelectorAll(".view").forEach((el) =>
	{
		el.addEventListener("click", () =>
		{
			changeMainTitle();
			
			clicid = el.getAttribute("id");
			let select = data.find(element => element.id == clicid);

			// Masquer l'affichage des cartes
			document.getElementById("target").style.display = "none";

			document.getElementById("target2").style.display = "block";
			// document.getElementById("target2").style.width = "400px";
			
			// Placement des valeurs dans la copie du template
			templateClone2.querySelector(".image2").src = "data:image/gif;base64," + select.image;
			templateClone2.querySelector(".card__title2").innerHTML = select.name;
			
			// Afficher l'id et attribuer sa valeur
			templateClone2.querySelector(".card__id2").style.display = "block";
			templateClone2.querySelector(".card__id2").innerHTML = select.id;

			templateClone2.querySelector(".card__short-description2").innerHTML = select.shortDescription;
			
			// Afficher la description et attribuer sa valeur
			templateClone2.querySelector(".card__description2").style.display = "block";
			templateClone2.querySelector(".card__description2").innerHTML = select.description;

			newPlace2.appendChild(templateClone2);
		});

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