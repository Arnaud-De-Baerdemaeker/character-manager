


document.getElementById("submit").addEventListener("click", function() {
    
    let charName = document.getElementById("name").value;
    let shortDesc = document.getElementById("short-description").value;
    let charDesc = document.getElementById("description").value;
    
    fetch("https://character-database.becode.xyz/characters", {

        method: "POST",
        headers: {
            Accept: "application/json",                
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            name: charName,
            description: charDesc,
            shortDescription: shortDesc,
        }),
    });

});
