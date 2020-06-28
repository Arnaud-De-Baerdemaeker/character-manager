// const axios = require('axios');

async function getCharactersFromDatabase()
{
	let charactersDatabase = await fetch("https://character-database.becode.xyz/characters");
	let data = await charactersDatabase.json();
	return data;
}

getCharactersFromDatabase()
.then((data) =>
{
	let template = document.getElementById("template").content;
	let newPlace = document.getElementById("target");
	
	data.forEach((element) =>
	{
		let templateClone = template.cloneNode(true);
		
		templateClone.getElementById("image").src = "data:image/gif;base64," + element.image;
		templateClone.getElementById("name").innerHTML = element.name;
		templateClone.getElementById("short-description").innerHTML = element.shortDescription;

		newPlace.appendChild(templateClone);
	})
})