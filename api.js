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

async function fetchGenres() {
  const url = `${baseURL}/genre/movie/list?language=en`;
  try {
    const response = await fetch(url, options);
    result = await response.json();
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

function merge(A, B) {
  let C = [];
  while (A.length > 0 && B.length > 0) {
    if (A[0].title < B[0].title) {
      C.push(A.shift());
    } else {
      C.push(B.shift());
    }
  }
  C = C.concat(A);
  C = C.concat(B);
  return C;
}

function sortByName(movie) {
  if (movie.length <= 1) return movie;
  if (movie.length === 2) {
    if (movie[0] < movie[1]) return movie;
    return [movie[1], movie[0]];
  }

  const mid = movie.length >> 1;
  const left = movie.slice(0, mid);
  const right = movie.slice(mid);
  const sortLeft = sortByName(left);
  const sortRight = sortByName(right);
  return merge(sortLeft, sortRight);
  // return movies.sort((a, b) => a.title.localeCompare(b.title));
  // parameter movies itu array dari objek film yang didapat dari fetchMovies
  // isi algoritma sort disini
  // ini fungsi sort untuk mengurutkan film berdasarkan nama film untuk membantu fungsi search
}

function sort(movie) {
  if (movie.length <= 1) return movie;
  if (movie.length === 2) {
    if (movie[0] < movie[1]) return movie;
    return [movie[1], movie[0]];
  }

  const mid = movie.length >> 1;
  const left = movie.slice(0, mid);
  const right = movie.slice(mid);
  const sortLeft = sort(left);
  const sortRight = sort(right);
  return merge(sortLeft, sortRight);
}

console.log(sort([1, 3, 5, 2]));

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
  let mov = sortByName([...movies]);

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

window.fetchMovies = fetchMovies;
window.searchMovies = searchMovies;
window.sortByDate = sortByDate;
window.fetchGenres = fetchGenres;
window.getDataMovie = getDataMovie;
