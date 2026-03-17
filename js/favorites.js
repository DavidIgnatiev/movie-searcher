const KEY = "favorites";


export function getFavorites() {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
}

export function addToFavorites(id) {
    let data = getFavorites();
    data.push(id);
    localStorage.setItem(KEY, JSON.stringify(data))
}

export function removeFromFavorites(id) {
    let data = getFavorites().filter((item) => item != id);
    localStorage.setItem(KEY, JSON.stringify(data));
}

export function isFavorite(id) {
    return getFavorites().includes(id);
}




