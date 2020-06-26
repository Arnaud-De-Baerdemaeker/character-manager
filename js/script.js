const axios = require('axios').default;

let charactersDatabase = fetch("https://character-database.becode.xyz/characters")
.then(function(charactersDatabase)
{
    return charactersDatabase.json();
})
.then(function(charactersDatabase)
{
    let template = document.getElementById("template").content;
})