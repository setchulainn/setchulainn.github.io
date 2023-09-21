// Sélectionnez les éléments DOM
const characterList = document.getElementById('character-select');;
const characterPassives = document.getElementById("character-passives");
const selectedScrolls = document.getElementById("selected-scroll-list");
const totalStats = document.getElementById("character-stats-list");
const availableScrollsList = document.getElementById("available-scroll-list");
const ScrollSearch = document.getElementById("search-scroll-input");

// Liste des parchemins disponibles (à partir de vos données existantes)
const availableScrolls = [
    "Scroll 1",
    "Scroll 2",
    "Scroll 3",
    // Ajoutez d'autres parchemins ici
];

// Fonction pour afficher les compétences passives d'un personnage sélectionné
function displayPassives(characterName) {
    fetch("characters.json")
        .then(response => response.json())
        .then(charactersData => {
            const character = charactersData.find(char => char.name === characterName);
            if (character) {
                characterPassives.innerHTML = character.talents.map(talent => `<p>${talent.name}: ${talent.description}</p>`).join("");
            } else {
                characterPassives.innerHTML = "";
            }
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de la récupération des données des personnages : ", error);
        });
}

// Fonction pour ajouter un parchemin sélectionné
function addSelectedScroll(ScrollName) {
    const ScrollItem = document.createElement("div");
    ScrollItem.textContent = ScrollName;
    selectedScrolls.appendChild(ScrollItem);

    // Mettez à jour les statistiques cumulatives ici

    // Supprimez le parchemin de la liste des parchemins disponibles
    const index = availableScrolls.indexOf(ScrollName);
    if (index !== -1) {
        availableScrolls.splice(index, 1);
        updateAvailableScrollsList();
    }

    // Écouteur d'événement pour désélectionner un parchemin en double-cliquant
    ScrollItem.addEventListener("dblclick", () => {
        selectedScrolls.removeChild(ScrollItem);

        // Ajoutez le parchemin de nouveau à la liste des parchemins disponibles
        availableScrolls.push(ScrollName);
        updateAvailableScrollsList();
    });
}

// Fonction pour mettre à jour la liste des parchemins disponibles
function updateAvailableScrollsList() {
    availableScrollsList.innerHTML = availableScrolls.map(Scroll => `<li>${Scroll}</li>`).join("");
}

// Écouteur d'événement pour le double-clic sur un parchemin disponible
availableScrollsList.addEventListener("dblclick", event => {
    const selectedScroll = event.target.textContent;
    addSelectedScroll(selectedScroll);
});

// Fonction pour rechercher des parchemins
function searchScrolls(query) {
    const filteredScrolls = availableScrolls.filter(Scroll => {
        return Scroll.toLowerCase().includes(query.toLowerCase());
    });

    availableScrollsList.innerHTML = filteredScrolls.map(Scroll => `<li>${Scroll}</li>`).join("");
}

// Écouteur d'événement pour la recherche de parchemins
ScrollSearch.addEventListener("input", () => {
    const searchTerm = ScrollSearch.value;
    searchScrolls(searchTerm);
});

// Initialisation de la liste des personnages depuis characters.json
fetch("characters.json")
    .then(response => response.json())
    .then(charactersData => {
        charactersData.forEach(character => {
            const option = document.createElement("option");
            option.value = character.name;
            option.textContent = character.name;
            characterList.appendChild(option);
        });
    })
    .catch(error => {
        console.error("Une erreur s'est produite lors de la récupération des données des personnages : ", error);
    });


// Initialisation de la liste des parchemins disponibles
updateAvailableScrollsList();
