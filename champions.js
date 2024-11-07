let champions = []; // Array to hold champions data

// Function to fetch champions data from JSON file
async function fetchChampions() {
    try {
        const response = await fetch('champions-list.json'); // Path to your JSON file
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        champions = await response.json(); // Store the fetched champions data
        createChampionCards(); // Create champion cards after fetching data
        changeImageObjectPosition();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Function to create champion cards dynamically
function createChampionCards() {
    const grid = document.getElementById("js-champion-grid");
    grid.innerHTML = '';  // Clear the grid before populating it

    champions.forEach(champion => {
        const card = document.createElement("div");
        card.classList.add("champion-card");
        card.setAttribute("data-roles", champion.roles.join(',')); // Store roles as a comma-separated string
        
        card.innerHTML = `
            <img src="${champion.image}" alt="${champion.name}">
            <div class="overlay">
                <h2> ${champion.name} </h2>
                <p> Role <p> 
                 <p class="role">${champion.roles}</p>
        `;

        grid.appendChild(card);
    });
}


// Function to filter champions based on selected role
function filterChampions(role) {
    const championCards = document.querySelectorAll('.champion-card');

    championCards.forEach(champion => {
        const roles = champion.getAttribute('data-roles').split(',');  // Get all roles of the champion

        // If 'all' is selected, show all champions
        if (role === 'all' || roles.includes(role)) {
            champion.style.display = 'block'; // Show champion
        } else {
            champion.style.display = 'none'; // Hide champion
        }
    });
}

function searchChampions() {
    const searchInput = document.getElementById("search-bar").value.toLowerCase();
    const championCards = document.querySelectorAll('.champion-card');

    let visibleCardsCount = 0; // Initialize a counter for visible cards

    championCards.forEach(champion => {
        const championName = champion.querySelector('h2').textContent.toLowerCase();

        // Show all champions if the search input is empty
        if (searchInput.length === 0) {
            champion.style.display = 'block'; // Show champion
            visibleCardsCount++; // Increment visible cards count
        } else if (searchInput.length === 1) {
            // If the input length is 1, check only the first letter
            if (championName.charAt(0) === searchInput.charAt(0)) {
                champion.style.display = 'block';
                visibleCardsCount++;
            } else {
                champion.style.display = 'none';
            }
        } else {
            // If the input length is greater than 1, check the full name
            if (championName.includes(searchInput)) {
                champion.style.display = 'block';
                visibleCardsCount++;
            } else {
                champion.style.display = 'none';
            }
        }
    });

    // Adjust the gap based on the number of visible cards
    adjustGridGap(visibleCardsCount);
}

// Function to adjust the gap in the grid based on visible cards
function adjustGridGap(visibleCount) {
    const grid = document.querySelector('.css-champion-grid');
    if (visibleCount < 2) {
        grid.style.gap = '0.5rem'; // Closer gap for fewer cards
    } else {
        grid.style.gap = '1rem'; // Default gap for more cards
    }
}

// Function to add event listeners to filter buttons
function addFilterEventListeners() {
    const filterButtons = document.querySelectorAll('.filter-button');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const role = this.getAttribute('data-role');
            filterChampions(role); // Call the filter function when a button is clicked
        });
    });
}

function changeImageObjectPosition() {
    const objectPositionMap = {
        "30% 50%": [84], // Naafiri
        "40% 50%": [54, 71, 128], // K'Sante, Lillia, Syndra
        "45% 50%": [35, 82, 114, 160], // Galio, Mordekaiser, Seraphine, Yuumi
        "60% 50%": [0, 1, 4, 24, 32, 39, 44, 52, 101, 103, 105, 106, 111, 112, 121, 125, 139, 141],       // Aatrox, Ahri, Alistar, Fiddlesticks, Gragas, Hwei, Jhin, Rakan, Rek'Saim Renata Glasc, Renekton, Samira, Sejuani, Sivir, Soraka, Twitch, Urgot
        "65% 50%": [6, 13, 21, 22, 45, 56, 75, 77, 78, 93, 102, 136, 145, 149, 151],      // Anivia, Bard, Cassiopeia, Cho'Gath, Illaoi, Kalista, Lux, Malzahar, Maokai, Olaf, Rammus, Trundle, Vel'Koz, Viktor, Vladimir
        "70% 50%": [3, 5, 9, 15, 31, 33, 42, 50, 59, 60, 69, 73, 86, 90, 91, 92, 97, 100, 107, 120, 129, 131, 134, 144, 146, 153, 154, 161, 162],   // Akshan, Amumu, Ashe, Blitzcrank, Ezreal, Fiora, Hecarim, Jax, Kassadin, Katarina, Leesin, Lucian, Nasus, Nilah, Nocturne, Nunu, Rengar, Sion, Tahm Kench, Talon, Thresh, Veigar, Vex, Wukong Xayah, Zac, Zed
        "75% 50%": [12, 23, 25, 36, 53, 58, 67, 68, 72, 74, 76, 109, 118, 119, 124, 126, 135, 137, 138, 152, 159], // Azir, Corki, Diana, Gangplank, Jinx, Karthus, Kog'Maw, Leblanc, Lissandra, Lulu, Malphite, Poppy, Rumble, Shyvana, Singed, Sona, Swain, Tristana, Tryndamere, Twisted Fate, Warwick
        "80% 50%": [19, 28, 29, 43, 49, 57, 64, 81, 94, 110, 116, 117, 130, 147, 148, 150, 157, 164], // Caitlyn, Ekko, Elise, Heimerdinger, Jarvan IV, Kalista, Kha'Zix, Miss Fortune, Oriannam, Ryze, Shaco, Shen, Taliyah, Vi, Viego, Vladimir, Yasuo, Ziggs
        "85% 50%": [7, 16, 17, 27, 37, 38, 40, 51 , 61, 63, 65, 66, 70, 83, 85, 87, 89, 108, 132, 143, 167],  // Annie, Brand, Braum, Draven, Garen, Gnar, Gragas, Jayce, Kayle, Kennen, Kindred, Kled, Leona, Morgana, Nami, Nautilus, Nidalee, Riven, Taric, Vayne, Zyra
        "90% 50%": [20, 34, 48, 79], // Camille, Fizz, Janna, Master Yi

        
    };
    
  

    const images = document.querySelectorAll('.champion-card img');
    
    for (let i = 0; i < images.length; i++) {
        for (const [position, indices] of Object.entries(objectPositionMap)) {
            if (indices.includes(i)) {
                images[i].style.objectPosition = position;
                break; // Exit the loop once the position is found
            }                          
        }
    }
}

function handleSearchInput() {
    const searchInput = document.querySelector('.searchbar-container input');
    const championGrid = document.querySelector('.css-champion-grid');

    // Check if the search input and champion grid exist before adding event listener
    if (searchInput && championGrid) {
        searchInput.addEventListener('input', function() {
            if (searchInput.value.trim()) {
                championGrid.classList.add('searching'); // Add class when searching
            } else {
                championGrid.classList.remove('searching'); // Remove class when search is cleared
            }
        });
    } else {
        console.error('Search input or champion grid element not found');
    }
}

// Call the fetch function and other setups when the page loads
window.onload = function () {
    fetchChampions(); // Fetch the champions data
    addFilterEventListeners(); // Add filter button event listeners
    changeImageObjectPosition(); // Adjust the image object position

    // Call the function to handle the search input
    handleSearchInput();
};