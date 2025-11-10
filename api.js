const api =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzU0YjI3NDIzNmU5MzlhOWI4YzIyZTk2NTFlMmJiMyIsIm5iZiI6MTc2MjM5MDU1Mi4yNzAwMDAyLCJzdWIiOiI2OTBiZjIxOGZkMDdhYmI1YWE2MTNjZmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8i3MH2Crs-5CNnb_0TTzsIjty36YRXQPjwWZB3FBJgw";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${api}`,
  },
};

async function fetchMovies(page) {
  let result;
  if (page == 0) return [];
  const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}`;
  try {
    const response = await fetch(url, options);
    result = await response.json();
  } catch (error) {
    result = []
    console.error(error);
  }
  const prevPages = await fetchMovies(page - 1);
  return [...prevPages, ...result.results];
}

function sortByName(movies) {
  return movies.sort((a, b) => a.title.localeCompare(b.title));
  // parameter movies itu array dari objek film yang didapat dari fetchMovies
  // isi algoritma sort disini
  // ini fungsi sort untuk mengurutkan film berdasarkan nama film untuk membantu fungsi search
}

function sortByDate(movies) {
  // parameter movies itu array dari objek film yang didapat dari fetchMovies
  // isi algoritma sort disini
  // ini fungsi sort untuk mengurutkan film berdasarkan tanggal rilis jika user ingin mengurutkan berdasarkan tanggal rilis.
}

// function searchMovies(movie, target) {
//   return movie.filter((mov)=>mov.title.toLowerCase().includes(target.toLowerCase()));
// }

function searchMovies(movies, target) {
  if (target.length <= 0) return movies;
  sortByName(movies);

  const keyword = target.toLowerCase();
  const hasil = [];

  const n = movies.length;
  const step = Math.floor(Math.sqrt(n));
  let start = 0;
  let end = step;

  while (end < n) {
    const namaAkhir = (
      movies[end - 1].title
    ).toLowerCase();

    if (namaAkhir >= keyword) break;

    start = end;
    end += step;
  }

  if (end > n) end = n;

  for (let i = start; i < end; i++) {
    const nama = (movies[i].title).toLowerCase();

    if (nama.includes(keyword)) {
      hasil[hasil.length] = movies[i];
    }
  }

  if (hasil.length === 0) {
    return [];
  }

  return hasil;
}

window.fetchMovies = fetchMovies;
window.searchMovies = searchMovies;
window.sortByDate = sortByDate;
