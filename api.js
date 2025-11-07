const api = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzU0YjI3NDIzNmU5MzlhOWI4YzIyZTk2NTFlMmJiMyIsIm5iZiI6MTc2MjM5MDU1Mi4yNzAwMDAyLCJzdWIiOiI2OTBiZjIxOGZkMDdhYmI1YWE2MTNjZmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8i3MH2Crs-5CNnb_0TTzsIjty36YRXQPjwWZB3FBJgw"
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${api}`    
  }
};

  async function fetchMovies(page) {
    if (page == 0) return [];
    const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}`;
    const response = await fetch(url, options);
    const result = await response.json();
    const prevPages = await fetchMovies(page - 1);
    return [...prevPages, ...result.results];
  }

function sortByName(movies) {
    // parameter movies itu array dari objek film yang didapat dari fetchMovies
    // isi algoritma sort disini
    // ini fungsi sort untuk mengurutkan film berdasarkan nama film untuk membantu fungsi search
}

function sortByDate(movies) {
    // parameter movies itu array dari objek film yang didapat dari fetchMovies
    // isi algoritma sort disini
    // ini fungsi sort untuk mengurutkan film berdasarkan tanggal rilis jika user ingin mengurutkan berdasarkan tanggal rilis.
}

function searchMovies(movies, target) {
    sortByName(movies);
    // parameter movies itu array dari objek film yang didapat dari fetchMovies
    // parameter target itu string nama film yang dicari
    // isi algoritma search disini
    // ini fungsi search untuk mencari film berdasarkan nama film
}

window.fetchMovies = fetchMovies;
window.searchMovies = searchMovies;
window.sortByDate = sortByDate;