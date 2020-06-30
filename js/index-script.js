let template1;
let template2;
let templateClone;
let templateClone2;
let newPlace1;
let newPlace2;
let charactersDatabase;
let selectedData;
let viewButtons;


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
			clicid = el.getAttribute("id");
			let select = data.find(element => element.id == clicid);

			document.getElementById("target").style.display = "none";
			
			templateClone2.querySelector(".image").src = "data:image/gif;base64," + select.image;
			templateClone2.querySelector(".card__title").innerHTML = select.name;
			
			templateClone2.querySelector(".card__id").style.display = "block";
			templateClone2.querySelector(".card__id").innerHTML = select.id;

			templateClone2.querySelector(".card__short-description").innerHTML = select.shortDescription;
			
			templateClone2.querySelector(".card__description").style.display = "block";
			templateClone2.querySelector(".card__description").innerHTML = select.description;

			newPlace2.appendChild(templateClone2);
		});
	})
});