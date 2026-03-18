const API_KEY = "24283a68";

export async function getMovie(movie) {
    const firstPage = await fetch(`https://www.omdbapi.com/?s=${movie}&apikey=${API_KEY}`).then(r => r.json());
    if (firstPage.Response === "False") return [];
    const totalResults = firstPage.totalResults;
    const numberOfPages = Math.ceil(totalResults / 10);
    const promises = [];
    for (let i = 2; i <= numberOfPages; i++) {
        promises.push(fetch(`https://www.omdbapi.com/?s=${movie}&apikey=${API_KEY}&page=${i}`).then(r => r.json()));
    }
    const results = await Promise.all(promises);
    const allMovies = [firstPage, ...results].flatMap(r => r.Search || [])
    return allMovies;
}



export async function getMovieById(id) {
    let result = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
    return result.json();
}