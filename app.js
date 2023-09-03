"use strict";
const info = document.querySelector(".poke-info");
const pokemonImg = document.querySelector(".project-image");
const btn = document.querySelector(".poke-btn");
const name = document.querySelector(".name");
const type = document.querySelector(".type");
const height = document.querySelector(".height");
const errorMsg = document.querySelector(".error");

btn.addEventListener("click", function () {
  const pokemonSearch = document.querySelector("#search").value;
  getPokemon(pokemonSearch);
});

const getPokemon = function (pokemon) {
  info.classList.remove("hide");
  errorMsg.classList.add("hide");
  const pokemonInfo = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      pokemonImg.src = data.sprites.front_default;
      name.textContent = data.name;
      type.textContent = data.types[0].type.name;
      height.textContent = data.height + " ft";
      // Erase the previous pokemon's abilities
      const elementsToRemove = document.querySelectorAll(".ability");
      elementsToRemove.forEach((element) => {
        element.remove();
      });

      // Add the abilities
      for (let i = 0; i < data.abilities.length; i++) {
        let move = document.createElement("div");
        move.classList.add("info");
        move.classList.add("ability");
        let abilities = document.createElement("h2");
        abilities.textContent = `Ability ${i + 1}:`;
        let abilityName = document.createElement("h2");
        abilityName.textContent = data.abilities[i].ability.name;
        move.appendChild(abilities);
        move.appendChild(abilityName);
        info.appendChild(move);
      }
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
      pokemonImg.src = "logo.png";
      errorMsg.classList.remove("hide");
      info.classList.add("hide");
    });
};
