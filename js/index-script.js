let template;
let templateClone;
let newPlace;
let charactersDatabase;
let focus = document.hasFocus();


charactersDatabase = fetch("https://character-database.becode.xyz/characters")
.then((data) =>
{
	return data.json();
})
.then((data) =>
{
	template = document.getElementById("template").content;
	newPlace = document.getElementById("target");
	templateClone = template.cloneNode(true);
	
	// if (focus === "index.html")
	// {
		data.forEach((element) =>
		{
			templateClone = template.cloneNode(true);
		
			templateClone.querySelector(".image").src = "data:image/gif;base64," + element.image;
			templateClone.querySelector(".card__title").innerHTML = element.name;
			templateClone.querySelector(".card__id").innerHTML = element.id;
			templateClone.querySelector(".card__short-description").innerHTML = element.shortDescription;
			templateClone.querySelector(".card__description").innerHTML = element.description;

			newPlace.appendChild(templateClone);
		})
	// }
	// else
	// {
		let viewButtons = document.getElementsByClassName("view");
		console.log(viewButtons);

		for (i = 0; i < viewButtons.length; i++)
		{
			viewButtons[i].addEventListener("click", () =>
			{
				if (viewButtons[i] === data)
				{
					
				}
			})
		}
	// }
});