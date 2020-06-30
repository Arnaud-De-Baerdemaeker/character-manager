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

document.getElementById("submit").addEventListener("click", function() {

    charName = document.getElementById("name").value;
    shortDesc = document.getElementById("short-description").value;
    charDesc = document.getElementById("description").value;
    
    fetch("https://character-database.becode.xyz/characters", {

        method: "POST",
        headers: {
            Accept: "application/json",                
            "Content-Type": "application/json; charset=utf-8",
        },

        body: JSON.stringify({
            name: charName,
            description: charDesc,
            shortDescription: shortDesc,
            image: img,
        }),
    });

});
