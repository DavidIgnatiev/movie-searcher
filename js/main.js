import { getMovie, getMovieById } from "./api.js";
import { addToFavorites, isFavorite, removeFromFavorites, getFavorites } from "./favorites.js";
import { renderCurrentMovies, renderMovieDetails, renderFavoriteMovies } from "./ui.js";


const search = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const errorMsg = document.getElementById("errorMsg");
const popularMovies = document.getElementById("popularMovies");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const saved = document.getElementById("saved");
const back = document.getElementById("backBtn");

const queries = [
    "batman", "marvel", "star wars", "spider", "iron man",
    "avengers", "dark", "lord", "fast", "mission impossible",
    "james bond", "harry potter", "jurassic", "terminator",
    "matrix", "inception", "alien", "predator", "transformers",
    "pirates", "sherlock", "superman", "wonder woman", "thor"
];

let isFavoriteMode = false;
let lastMovies = null;


const loader = document.getElementById("loader");
const showLoader = () => loader.style.display = "block";
const hideLoader = () => loader.style.display = "none";

async function searchMovies(query) {
    if (query.length < 3) {
        errorMsg.innerHTML = "Must be longer than 3 symbols";
        return;
    }
    isFavoriteMode = false;
    showLoader();
    const movies = await getMovie(query);
    hideLoader();
    lastMovies = movies;
    if (movies.length === 0) {
        errorMsg.innerHTML = "Movies not found";
        return;
    }
    renderCurrentMovies(movies);
}

async function showFavorites() {
    const favorites = getFavorites();
    showLoader();
    const movies = await Promise.all(favorites.map(id => getMovieById(id).catch(() => null)));
    hideLoader();
    renderFavoriteMovies(movies.filter(m => m !== null));
}


renderCurrentMovies(await getMovie(queries[Math.floor(Math.random() * queries.length)]));


searchBtn.addEventListener("click", () => searchMovies(search.value));

search.addEventListener("keydown", (event) => {
    if (event.key === "Enter") searchMovies(search.value);
});

popularMovies.addEventListener("click", async (e) => {
    const btn = e.target.closest(".saveToFavorites");
    if (btn) {
        e.stopPropagation();
        const id = btn.dataset.id;
        btn.classList.toggle("active");
        if (isFavorite(id)) {
            removeFromFavorites(id);
            if (isFavoriteMode) showFavorites();
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

saved.addEventListener("click", async () => {
    isFavoriteMode = true;
    showFavorites();
    document.getElementById("backBtnBlock").style.display = "block";
});

back.addEventListener("click", () => {
    document.getElementById("backBtnBlock").style.display = "none";
    isFavoriteMode = false;
    if (lastMovies) {
        renderCurrentMovies(lastMovies);
    } else {
        popularMovies.innerHTML = "";
    }
});

document.querySelector(".logoBlock h1").addEventListener("click", () => back.click());