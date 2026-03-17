import { getMovieById } from "./api.js";
import { addToFavorites, removeFromFavorites, isFavorite } from "./favorites.js";

const popularMovies = document.getElementById("popularMovies");
const errorMsg = document.getElementById("errorMsg");
export async function renderCurrentMovies(movies) {    
    errorMsg.innerHTML = "";
    popularMovies.innerHTML = movies.map((movie) => {
        return `
            <div class="popularMovie" data-id="${movie["imdbID"]}">
            
            <div class="overlay">
                More...
                <button class="saveToFavorites ${isFavorite(movie["imdbID"]) ? "active" : ""}" data-id="${movie["imdbID"]}">★</button>
            </div>
            <img src="${movie["Poster"] !== "N/A" ? movie["Poster"] : "./images/image-1.png"}" onerror="this.src='./images/image-1.png'">


            <div class="popularDescription">
                <h1>${movie["Title"]}</h1>
                <p>Released: ${movie["Year"]}</p>
                <p>Type: ${movie["Type"]}</p>
            </div>

            </div>
        `
    }).join("");
}


const modal = document.getElementById("modal");
export async function renderMovieDetails(id) {
    let data = await getMovieById(id);
    modal.innerHTML = `
        <div class="modalPoster">
            <img src="${data["Poster"] !== "N/A" ? data["Poster"] : "./images/image-1.png"}" onerror="this.src='./images/image-1.png'">
            <button class="saveToFavorites ${isFavorite(data["imdbID"]) ? "active" : ""}" data-id="${data["imdbID"]}">★</button>
        </div>

        <div class="modalInfo">
            <h1>${data["Title"]}</h1>
            <p>Released: ${data["Released"]}</p>
            <p>Actors: ${data["Actors"]}...</p>
            <p>Awards: ${data["Awards"]}</p>
            <p>Genre: ${data["Genre"]}</p>
            <p>Plot: ${data["Plot"]}</p>
            <p>Type: ${data["Type"]}<p>
            <p>Director: ${data["Director"]}</p>
            <p>Runtime: ${data["Runtime"]} ${data["Runtime"] == "N/A" ? "" : `( ${ (Math.floor(parseInt(data["Runtime"])/60))}h ${parseInt(data["Runtime"]) % 60  }min)` }<p>
            <div class="ratings">
                ${data["Ratings"].map((item) => {
                    return `<span class="rating">${item["Source"]}: ${item["Value"]} ⭐</span>`
                }).join("")}
            </div>
        </div>
    `;
        return data;
}


export async function renderFavoriteMovies(movies) {
    popularMovies.innerHTML = movies.map((movie) => {
        return `
            <div class="popularMovie" data-id="${movie["imdbID"]}">
            
            <div class="overlay">
                More...
                <button class="saveToFavorites ${isFavorite(movie["imdbID"]) ? "active" : ""}" data-id="${movie["imdbID"]}">★</button>
            </div>
            <img src="${movie["Poster"] !== "N/A" ? movie["Poster"] : "./images/image-1.png"}" onerror="this.src='./images/image-1.png'">


            <div class="popularDescription">
                <h1>${movie["Title"]}</h1>
                <p>Released: ${movie["Year"]}</p>
                <p>Type: ${movie["Type"]}</p>
            </div>

            </div>
        `
    }).join("");
}



