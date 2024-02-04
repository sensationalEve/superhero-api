const BASE_URL = `https://superheroapi.com/api.php/6953735711390865/`;

const newHeroButton = document.getElementById("newHeroButton");
const heroImageDiv = document.querySelector("#heroImage");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

const getRandomSuperHero = (id, name) => {
  //name: 👉 base_url/search/batman
  //data.results[0].image.url

  //id: 👉 base_url/id
  //data.image.url

  fetch(`${BASE_URL}${id}`)
    .then((response) => response.json())
    .then((data) => {
      showHeroInfo(data);
    });
};

const statToEmoji = {
  intelligence: "🧠",
  strength: "💪",
  speed: "⚡",
  durability: "🏋️",
  power: "📊",
  combat: " ⚔️",
};

const showHeroInfo = (character) => {
  const name = `<h2> ${character.name}</h2>`;
  const img = `<img src='${character.image.url}' height=200 width=200 alt='broken link'/>`;
  const stats = Object.keys(character.powerstats)
    .map((stat) => {
      return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${
        character.powerstats[stat]
      }</p>`;
    })
    .join("");
  heroImageDiv.innerHTML += `
      ${name}
      ${img}
      ${stats}
      `;
};

const getSearchSuperHero = (name) => {
  console.log(searchInput.value);
  fetch(`${BASE_URL}search/${name}`)
    .then((response) => response.json())
    .then((data) => {
      const hero = data.results[0];
      showHeroInfo(hero);
    });
};

const randomHero = () => {
  return Math.floor(Math.random() * 731) + 1;
};

newHeroButton.addEventListener("click", () => {
  getRandomSuperHero(randomHero());
});

searchButton.onclick = () => getSearchSuperHero(searchInput.value);
