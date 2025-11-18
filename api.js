const api =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzU0YjI3NDIzNmU5MzlhOWI4YzIyZTk2NTFlMmJiMyIsIm5iZiI6MTc2MjM5MDU1Mi4yNzAwMDAyLCJzdWIiOiI2OTBiZjIxOGZkMDdhYmI1YWE2MTNjZmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8i3MH2Crs-5CNnb_0TTzsIjty36YRXQPjwWZB3FBJgw";
const baseURL = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${api}`,
  },
};

async function fetchMovies(page, status) {
  let result;
  if (page == 0) return [];
  const url = `${baseURL}/discover/movie?language=en-US&page=${page}`;
  try {
    status.isLoading = true;
    const response = await fetch(url, options);
    result = await response.json();
    status.isLoading = false;
  } catch (error) {
    result = [];
    console.error(error);
  }
  const prevPages = await fetchMovies(page - 1, status);
  status.isLoading = false;
  return [...prevPages, ...result.results];
}

async function fetchQuestion(url) {
  try {
    const response = await fetch(url);
    result = await response.json();
    console.log(result);
  } catch (error) {
    result = [];
    console.error(error);
  }
  return result;
}
async function getDataMovie(id) {
  const url = `${baseURL}/movie/${id}`;
  try {
    const response = await fetch(url, options);
    result = await response.json();
  } catch (error) {
    result = [];
    console.error(error);
  }
  console.log(result);
  return result;
}

async function getGenresList() {
  const url = `${baseURL}/genre/movie/list?language=en`;
  try {
    const response = await fetch(url, options);
    result = await response.json();
  } catch (error) {
    result = [];
    console.error(error);
  }
  console.log(result);
  return result.genres;
}

async function getCredits(id) {
  const url = `${baseURL}/movie/${id}/credits`;
  try {
    const response = await fetch(url, options);
    result = await response.json();
  } catch (error) {
    result = [];
    console.error(error);
  }
  console.log(result);
  return result;
}
async function getVideos(id) {
  const url = `${baseURL}/movie/${id}/videos`;
  try {
    const response = await fetch(url, options);
    result = await response.json();
  } catch (error) {
    result = [];
    console.error(error);
  }
  console.log(result);
  return result.results;
}

function mergeSort(movie, props, ascending) {
  // merge sort
  if (movie.length <= 1) return movie;
  if (movie.length === 2) {
    return ascending
      ? movie[0][props] < movie[1][props]
        ? movie
        : [movie[0], movie[1]]
      : movie[0][props] > movie[1][props]
      ? movie
      : [movie[1], movie[0]];
  }

  const mid = movie.length >> 1;
  const left = movie.slice(0, mid);
  const right = movie.slice(mid);
  const sortLeft = mergeSort(left, props, ascending);
  const sortRight = mergeSort(right, props, ascending);
  let hasil = [];
  while (sortLeft.length > 0 && sortRight.length > 0) {
    if (
      ascending
        ? sortLeft[0][props] < sortRight[0][props]
        : sortLeft[0][props] > sortRight[0][props]
    ) {
      hasil.push(sortLeft.shift());
    } else {
      hasil.push(sortRight.shift());
    }
  }
  hasil = hasil.concat(sortLeft);
  hasil = hasil.concat(sortRight);
  return hasil;
}

function jumpSearch(movies, target, props) {
  // Jump Search
  if (target.length <= 0) return movies;
  let mov = mergeSort([...movies], props, true);

  const keyword = target.toLowerCase();
  const hasil = [];

  const n = mov.length;
  const step = Math.floor(Math.sqrt(n));
  let start = 0;
  let end = step;

  while (end < n) {
    const namaAkhir = mov[end - 1].title.toLowerCase();

    if (namaAkhir >= keyword) break;

    start = end;
    end += step;
  }

  if (end > n) end = n;

  for (let i = start; i < end; i++) {
    const nama = mov[i].title.toLowerCase();

    if (nama.includes(keyword)) {
      hasil[hasil.length] = mov[i];
    }
  }

  if (hasil.length === 0) {
    return [];
  }

  return hasil;
}

function hashTableLookup(movies, userGenres) {
  const filteredMovies = [];
  const genreLookup = {};
  for (let i = 0; i < userGenres.length; i++) {
    const genreID = userGenres[i];
    genreLookup[genreID] = true;
  }

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];

    for (let j = 0; j < movie.genre_ids.length; j++) {
      const genreID = movie.genre_ids[j];
      if (genreLookup[genreID]) {
        filteredMovies.push(movie);
        break;
      }
    }
  }
  return filteredMovies;
}

window.fetchMovies = fetchMovies;
window.fetchQuestion = fetchQuestion;
window.jumpSearch = jumpSearch;
window.getDataMovie = getDataMovie;
window.getCredits = getCredits;
window.getGenresList = getGenresList;
window.getVideos = getVideos;
window.mergeSort = mergeSort;
window.hashTableLookup = hashTableLookup;
