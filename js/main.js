import { getMovie, getMovieById } from "./api.js";
import { addToFavorites, isFavorite, removeFromFavorites, getFavorites } from "./favorites.js";
import { renderCurrentMovies, renderMovieDetails, renderFavoriteMovies} from "./ui.js";

console.log('Movie Searcher initialized');



const search = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

let isFavoriteMode = false;
let lastMovies = null;

const queries = [
    "batman", "marvel", "star wars", "spider", "iron man",
    "avengers", "dark", "lord", "fast", "mission impossible",
    "james bond", "harry potter", "jurassic", "terminator",
    "matrix", "inception", "alien", "predator", "transformers",
    "pirates", "sherlock", "superman", "wonder woman", "thor"
];


renderCurrentMovies(await getMovie(queries[Math.floor(Math.random() * queries.length)]));

const errorMsg = document.getElementById("errorMsg");
searchBtn.addEventListener("click", async () => {
    if (search.value.length < 3) {
        errorMsg.innerHTML = "Must be longer than 3 symbols";
        return;
    }
    isFavoriteMode = false;
    document.getElementById("loader").style.display = "block";
    const movies = await getMovie(search.value);
    document.getElementById("loader").style.display = "none";
    lastMovies = movies;
    if (movies.length === 0) {
        errorMsg.innerHTML = "Movies not found";
        return;
    }
    renderCurrentMovies(movies);
});


search.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        if (search.value.length < 3) {
            errorMsg.innerHTML = "Must be longer than 3 symbols";
            return;
        }

        isFavoriteMode = false;
        document.getElementById("loader").style.display = "block";
        const movies = await getMovie(search.value);
        document.getElementById("loader").style.display = "none";
        lastMovies = movies;
        if (movies.length === 0) {
            errorMsg.innerHTML = "Movies not found";
            return;
        }
        renderCurrentMovies(movies);
    }
});


const popularMovies = document.getElementById("popularMovies");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");

popularMovies.addEventListener("click", async (e) => {
    let btn = e.target.closest(".saveToFavorites");
    if (btn) {
        e.stopPropagation();
        let id = btn.dataset.id;
        btn.classList.toggle("active");
        if (isFavorite(id)) {
            removeFromFavorites(id);
            if (isFavoriteMode) {
                showFavorites();
            }
        } else {
            addToFavorites(id);
        }
        return;
    } 


    const card = e.target.closest(".popularMovie");
    if (card) {
        const id = card.dataset.id;
        await renderMovieDetails(id);
        overlay.style.display = "block";
        modal.style.display = "flex";
    }
});

overlay.addEventListener("click", () => {
    modal.style.display = "none";
    overlay.style.display = "none";
});


modal.addEventListener("click", (e) => {
    const btn = e.target.closest(".saveToFavorites");
    if (btn) {
        btn.classList.toggle("active");
        const id = btn.dataset.id;
        if (isFavorite(id)) {
            removeFromFavorites(id);
        } else {
            addToFavorites(id);
        }
        const card = popularMovies.querySelector(`[data-id="${id}"] .saveToFavorites`);
        if (card) card.classList.toggle("active");
    }
});

async function showFavorites() {
    const favorites = getFavorites();
    document.getElementById("loader").style.display = "block";
    const movies = await Promise.all(favorites.map(id => getMovieById(id).catch(() => null)));
    document.getElementById("loader").style.display = "none";
    renderFavoriteMovies(movies.filter(m => m !== null));
}

const saved = document.getElementById("saved");
saved.addEventListener("click", async () => {
    isFavoriteMode = true;
    showFavorites();
    document.getElementById("backBtnBlock").style.display = "block";
});


const back = document.getElementById("backBtn");
back.addEventListener("click", () => {
    document.getElementById("backBtnBlock").style.display = "none";
    isFavoriteMode = false;
    if (lastMovies) {
        renderCurrentMovies(lastMovies);
    } else {
        popularMovies.innerHTML = "";
    }
});


document.querySelector('.logoBlock h1').addEventListener('click', () => {
    document.getElementById("backBtn").click();
});
