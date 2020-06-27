// const axios = require('axios').default;

let charactersDatabase = fetch("https://character-database.becode.xyz/characters")
.then((charactersDatabase) =>
{
	return charactersDatabase.json();
})
.then((charactersDatabase) =>
{
	let template = document.getElementById("template").content;
	let newPlace = document.getElementById("target");
	

	charactersDatabase.forEach((element) =>
	{
		let templateClone = template.cloneNode(true);
		
		templateClone.getElementById("image").src = "data:image/gif;base64," + element.image;
		templateClone.getElementById("name").innerHTML = element.name;
		templateClone.getElementById("short-description").innerHTML = element.shortDescription;

		newPlace.appendChild(templateClone);
	})
})