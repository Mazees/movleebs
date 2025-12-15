const api = import.meta.env.VITE_TMDB_TOKEN;
const baseURL = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${api}`,
  },
};

export async function fetchMovies(page, status) {
  let result;
  if (page == 0) return [];
  const url = `${baseURL}/discover/movie?language=en-US&page=${page}`;
  try {
    if (status) status.isLoading = true;
    const response = await fetch(url, options);
    result = await response.json();
    if (status) status.isLoading = false;
  } catch (error) {
    result = [];
    console.error(error);
  }
  // This recursive call was in the original, but it might be heavy. Keeping it as is.
  // Actually, wait, fetchMovies(page-1) means it fetches 50 pages recursively?
  // Original: if (page == 0) return []; ... const prevPages = await fetchMovies(page - 1, status); return [...prevPages, ...result.results];
  // Yes, it fetches ALL pages from 1 to `page`.
  const prevPages = await fetchMovies(page - 1, status);
  if (status) status.isLoading = false;
  return [...prevPages, ...result.results];
}

export async function fetchQuestion(url) {
  let result;
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

export async function getDataMovie(id) {
  let result;
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

export async function getGenresList() {
  let result;
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

export async function getCredits(id) {
  let result;
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

export async function getVideos(id) {
  let result;
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


export function mergeSort(movie, props, ascending) {
  // merge sort
  if (movie.length <= 1) return movie;
  if (movie.length === 2) {
    return ascending
      ? movie[0][props] < movie[1][props]
        ? [movie[0],movie[1]]
        : [movie[1], movie[0]]
      : movie[0][props] > movie[1][props]
      ? [movie[0], movie[1]]
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

export function jumpSearch(movies, target) {
  // Jump Search
  if (target.length <= 0) return movies;
  let mov = mergeSort([...movies], 'title', true);

  const keyword = target.toLowerCase();
  const hasil = [];

  const n = mov.length;
  const step = Math.floor(Math.sqrt(n));
  let start = 0;
  let end = step;

  while (end < n) {
    // Check if mov[end-1] exists to be safe, though logic should hold
    if (!mov[end-1]) break;
    const namaAkhir = mov[end - 1].title.toLowerCase();

    if (namaAkhir >= keyword) break;

    start = end;
    end += step;
  }

  if (end > n) end = n;

  for (let i = start; i < end; i++) {
    if (!mov[i]) continue;
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

export function hashTableLookup(movies, userGenres) {
  const filteredMovies = [];
  const genreLookup = {};
  for (let i = 0; i < userGenres.length; i++) {
    const genreID = userGenres[i];
    genreLookup[genreID] = true;
  }

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    
    // Check if genre_ids exists to avoid errors
    if (!movie.genre_ids) continue;

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
