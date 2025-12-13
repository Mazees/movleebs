import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies, jumpSearch, mergeSort } from "../lib/api";
import AOS from "aos";
import "aos/dist/aos.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [moviesCopy, setMoviesCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [page] = useState(50); // Hardcoded as per original

  useEffect(() => {
    console.log("Current data:", moviesCopy,length);
  },[moviesCopy])

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
    const loadMovies = async () => {
      setIsLoading(true);
      const data = await fetchMovies(page, null);
      setMovies(data);
      setMoviesCopy(data);
      setIsLoading(false);
    };
    loadMovies();
  }, [page]);

  const handleSearch = (q) => {
    setKeyword(q);
    if (!q) {
      setMoviesCopy(movies);
      return;
    }
    const result = jumpSearch(movies, q);
    setMoviesCopy(result);
  };

  const handleSort = (props, asc) => {
    const sorted = mergeSort([...moviesCopy], props, asc);
    setMoviesCopy(sorted);
  };

  const openMovie = (id) => {
    localStorage.setItem("idMovie", JSON.stringify(id));
    navigate("/detail-movie");
  };

  return (
    <main
      className="lg:w-[70%] w-[80%] h-[calc(100vh-70px)] mx-auto flex flex-col justify-center items-center pb-10"
      data-aos="fade"
      data-aos-duration="1000"
    >
      <div className="w-full flex px-5 lg:flex-row flex-col lg:gap-0 gap-3 justify-between mt-10 mb-5">
        <div className="border-l-8 border-primary pl-3 poppins-regular text-white text-lg flex items-center">
          Cari Film Favoritmu!
        </div>
        <div className="rounded-sm poppins-regular h-fit py-3 px-4 flex justify-between bg-tertiary">
          <input
            className="mr-auto placeholder:text-sm text-primary text-sm focus:outline-none w-3/4 bg-transparent"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} // Live search? Original used x-model + button. Button calls searchMovie(keyword).
            // Let's support both onChange (optional) or just on button click.
            // Original: x-model="keyword", button @click="searchMovie(keyword)"
            // Also simpler binding.
            name="cari"
            id="cari"
            placeholder="Search movies..."
          />
          <button
            onClick={() => handleSearch(keyword)}
            className="hover:text-white w-1/4 flex justify-end text-primary hover:cursor-pointer"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 19L14.66 14.66M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Sort Dropdown */}
      <div className="w-full mb-5 px-5 poppins-light">
        <SortDropdown onSort={handleSort} reset={() => setMoviesCopy(movies)} />
      </div>

      {isLoading ? (
        <ul className="flex lg:justify-between justify-center items-center p-5 flex-wrap gap-10 overflow-y-scroll h-[70vh] hide-scrollbar">
          {Array.from({ length: page }).map((_, index) => (
            <li key={index} className="w-[300px] h-[500px] flex flex-col">
              <span className="rounded-[10px] w-[300px] h-[450px] bg-light flex justify-center items-center animate-pulse">
                <img src="/img/icon.svg" alt="icon" className="h-[35px]" />
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex lg:justify-between justify-center items-center p-5 flex-wrap gap-10 overflow-y-scroll h-[70vh] hide-scrollbar">
          {moviesCopy.length ? (
            <>
              {moviesCopy.map((movie, index) => (
                <li
                  key={index}
                  className="w-[300px] h-[500px] flex flex-col hover:cursor-pointer"
                  onClick={() => openMovie(movie.id)}
                >
                  <div className="relative">
                    {movie.poster_path === null ? (
                      <span className="rounded-[10px] w-[300px] h-[450px] bg-light flex justify-center items-center animate-pulse">
                        <img
                          src="/img/icon.svg"
                          alt="icon"
                          className="h-[35px]"
                        />
                      </span>
                    ) : (
                      <img
                        className="rounded-[10px] w-[300px] h-[450px] transition-all hover:drop-shadow-[0_0_10px_#646cffaa]"
                        src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                        alt={`poster-${index}`}
                      />
                    )}
                    <span className="absolute left-3 top-3 w-10 h-10 flex justify-center items-center poppins-medium rounded-full bg-yellow-300">
                      {movie.vote_average
                        ? movie.vote_average.toFixed(1)
                        : "N/A"}
                    </span>
                  </div>
                  <div className="w-full h-fit flex flex-col text-white">
                    <h1 className="poppins-medium text-sm mt-2">
                      {movie.title}
                    </h1>
                    <h1 className="poppins-light text-sm">
                      {movie.release_date ? movie.release_date.slice(0, 4) : ""}
                    </h1>
                  </div>
                </li>
              ))}
            </>
          ) : (
            <li className="w-full flex flex-col items-center justify-center gap-5 opacity-80 h-full">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-24 h-24 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <div className="text-center flex flex-col gap-2">
                    <h1 className="text-2xl text-primary poppins-bold">Pencarian Tidak Ditemukan</h1>
                    <p className="text-white poppins-light text-sm max-w-md">
                        Maaf, kami tidak dapat menemukan film yang cocok dengan kata kunci tersebut. Coba cari judul lain!
                    </p>
                </div>
            </li>
          )}
        </ul>
      )}
    </main>
  );
};

const SortDropdown = ({ onSort, reset }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-fit">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-radius border border-outline bg-primary px-4 py-2 text-xs font-medium tracking-wide transition hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-outline-strong text-white"
        aria-haspopup="true"
      >
        Urutkan Berdasarkan
        <svg
          aria-hidden="true"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="size-4 rotate-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div
            className="absolute top-11 z-20 left-0 py-2 flex w-fit min-w-48 flex-col overflow-hidden rounded-radius border border-outline bg-primary"
            role="menu"
          >
            <button
              className="text-left bg-surface-alt px-4 py-2 text-sm hover:bg-black/20 text-white"
              onClick={() => {
                reset();
                setIsOpen(false);
              }}
            >
              Default
            </button>
            <button
              className="text-left bg-surface-alt px-4 py-2 text-sm hover:bg-black/20 text-white"
              onClick={() => {
                onSort("title", true);
                setIsOpen(false);
              }}
            >
              Nama Film (A-Z)
            </button>
            <button
              className="text-left bg-surface-alt px-4 py-2 text-sm hover:bg-black/20 text-white"
              onClick={() => {
                onSort("title", false);
                setIsOpen(false);
              }}
            >
              Nama Film (Z-A)
            </button>
            <button
              className="text-left bg-surface-alt px-4 py-2 text-sm hover:bg-black/20 text-white"
              onClick={() => {
                onSort("release_date", true);
                setIsOpen(false);
              }}
            >
              Tanggal Rilis (Paling Lama)
            </button>
            <button
              className="text-left bg-surface-alt px-4 py-2 text-sm hover:bg-black/20 text-white"
              onClick={() => {
                onSort("release_date", false);
                setIsOpen(false);
              }}
            >
              Tanggal Rilis (Paling Baru)
            </button>
            <button
              className="text-left bg-surface-alt px-4 py-2 text-sm hover:bg-black/20 text-white"
              onClick={() => {
                onSort("vote_average", true);
                setIsOpen(false);
              }}
            >
              Rating (Terendah)
            </button>
            <button
              className="text-left bg-surface-alt px-4 py-2 text-sm hover:bg-black/20 text-white"
              onClick={() => {
                onSort("vote_average", false);
                setIsOpen(false);
              }}
            >
              Rating (Tertinggi)
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieList;
