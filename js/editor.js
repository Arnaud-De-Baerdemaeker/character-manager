
// mettre dans les déclarations

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

// mettre avant le reste du code

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

 // mettre après le "view"

    let clickEdit;
    
    document.querySelectorAll(".edit").forEach((element) =>
	{
        element.addEventListener("click", () =>
		{
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

    let clickDelete;
    
    document.querySelectorAll(".delete").forEach((element) =>
	{
        element.addEventListener("click", () =>
		{
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




