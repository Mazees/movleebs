import React, { useState, useEffect, useRef } from 'react';
import { getDataMovie, getCredits, getVideos } from '../lib/api';

const DetailMovie = () => {
    const [dataMovie, setDataMovie] = useState(null);
    const [dataCredits, setDataCredits] = useState(null);
    const [dataVideos, setDataVideos] = useState(null);
    const [dataCast, setDataCast] = useState([]);
    const [dataCrew, setDataCrew] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [bookmark, setBookmark] = useState({});

    const castContainerRef = useRef(null);
    const crewContainerRef = useRef(null);

    useEffect(() => {
        const init = async () => {
            const idMovie = localStorage.getItem('idMovie');
            if (!idMovie) return; // Handle no ID?

            setLoading(true);
            const movie = await getDataMovie(idMovie);
            const credits = await getCredits(idMovie);
            const videos = await getVideos(idMovie);

            setDataMovie(movie);
            setDataCredits(credits);
            setDataVideos(videos);
            setDataCast(credits.cast ? [...credits.cast] : []);
            setDataCrew(credits.crew ? [...credits.crew] : []);
            
            setLoading(false);
            
            // Get bookmark
            const b = localStorage.getItem('bookmark');
            if (b) setBookmark(JSON.parse(b));
        };
        init();
    }, []);

    const addBookmark = (id, title, genres, runtime, poster_path) => {
        const newBookmark = { ...bookmark };
        newBookmark[id] = { id, title, genres, runtime, poster_path };
        setBookmark(newBookmark);
        localStorage.setItem('bookmark', JSON.stringify(newBookmark));
    };

    const removeBookmark = (id) => {
        const newBookmark = { ...bookmark };
        delete newBookmark[id];
        setBookmark(newBookmark);
        localStorage.setItem('bookmark', JSON.stringify(newBookmark));
    };

    const handleCastScroll = (e) => {
        const { scrollLeft, clientWidth, scrollWidth } = e.target;
        if (scrollLeft + clientWidth >= scrollWidth - 200) {
            setDataCast(prev => [...prev, ...prev]);
        }
    };

    const handleCrewScroll = (e) => {
        const { scrollLeft, clientWidth, scrollWidth } = e.target;
        if (scrollLeft + clientWidth >= scrollWidth - 200) {
            setDataCrew(prev => [...prev, ...prev]);
        }
    };

    if (loading || !dataMovie) {
        return (
             <main className="flex flex-col justify-center items-center h-screen bg-background">
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                     {/* Loading Skeleton mimicking the layout loosely or just spinner */}
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" className="size-12 fill-primary motion-safe:animate-spin">
                        <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
                        <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"/>
                    </svg>
                </div>
             </main>
        )
    }

    return (
        <main className="flex flex-col justify-center items-center w-full">
            <section className="h-[calc(100vh-70px)] w-screen relative overflow-hidden bg-background">
                {dataMovie.backdrop_path && (
                    <img
                        className="w-full h-[238px] object-cover blur-lg"
                        src={`https://image.tmdb.org/t/p/original/${dataMovie.backdrop_path}`}
                        alt="backdrop"
                    />
                )}
                
                <div className="absolute overflow-y-scroll hide-scrollbar top-0 left-0 w-full lg:px-20 px-10 pb-10 h-full pt-10 lg:pt-30 flex flex-col">
                    <div className="flex lg:flex-row flex-col lg:items-start items-center w-full gap-5 lg:gap-10">
                        {dataMovie.poster_path === null ? (
                            <div className="rounded-[10px] w-[167px] h-[250px] bg-light flex justify-center items-center animate-pulse">
                                <img src="/img/icon.svg" alt="icon" className="h-[35px]" />
                            </div>
                        ) : (
                            <img
                                className="w-[167px] h-[250px] rounded-[20px]"
                                src={`https://image.tmdb.org/t/p/w300/${dataMovie.poster_path}`}
                                alt="poster"
                            />
                        )}

                        <div className="flex-1 h-fit lg:h-[250px] text-white py-5 flex flex-col">
                            <h1 className="poppins-extrabold text-2xl lg:text-5xl lg:w-[60%] w-full lg:text-start text-center">
                                {dataMovie.title}
                            </h1>
                            <h2 className="poppins-medium mt-3 lg:text-start text-center">
                                {dataMovie.original_title} • {Math.floor(dataMovie.runtime / 60)}h {String(dataMovie.runtime % 60).padStart(2, '0')}m
                            </h2>

                            <div className="flex flex-col gap-2 mt-7 items-center lg:items-start">
                                <div className="flex flex-col lg:flex-row gap-2 not-lg:w-full w-fit">
                                     <button
                                        onClick={() => setModalIsOpen(true)}
                                        type="button"
                                        className="px-4 py-2 bg-primary rounded-sm not-lg:w-full hover:bg-white hover:text-primary poppins-regular hover:cursor-pointer flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:opacity-100 active:outline-offset-0 text-white"
                                    >
                                        <svg width="1em" height="1em" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.39279e-08 1.11137C-5.21e-05 0.915876 0.0463191 0.72383 0.134432 0.554621C0.222544 0.385411 0.349278 0.24503 0.501837 0.147651C0.654396 0.0502717 0.827378 -0.000657228 1.00332 6.40356e-06C1.17926 0.000670035 1.35192 0.0529028 1.50388 0.151431L7.50192 4.03895C7.65329 4.13655 7.77896 4.27657 7.86636 4.44504C7.95377 4.6135 7.99985 4.80451 8 4.99897C8.00015 5.19342 7.95437 5.38451 7.86723 5.55315C7.78009 5.72178 7.65464 5.86205 7.50342 5.95994L1.50388 9.84857C1.35192 9.9471 1.17926 9.99933 1.00332 9.99999C0.827378 10.0007 0.654396 9.94973 0.501837 9.85235C0.349278 9.75497 0.222544 9.61459 0.134432 9.44538C0.0463191 9.27617 -5.21e-05 9.08412 4.39279e-08 8.88863V1.11137Z" fill="currentColor"/>
                                        </svg>
                                        PUTAR VIDEO
                                    </button>
                                    
                                     <button
                                        onClick={() => {
                                            if (bookmark[dataMovie.id]) {
                                                removeBookmark(dataMovie.id);
                                            } else {
                                                addBookmark(dataMovie.id, dataMovie.title, dataMovie.genres, dataMovie.runtime, dataMovie.poster_path);
                                            }
                                        }}
                                        className="px-4 py-2 bg-primary rounded-sm hover:bg-white not-lg:w-full hover:text-primary poppins-regular hover:cursor-pointer flex items-center gap-2 text-white"
                                    >
                                        {bookmark[dataMovie.id] ? (
                                           <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.42333 3.10083C6.98338 2.70955 7.65014 2.49981 8.33333 2.5H11.6667C12.5507 2.5 13.3986 2.85119 14.0237 3.47631C14.6488 4.10143 15 4.94928 15 5.83333V11.6667M15 15V17.5L10 14.1667L5 17.5V5.83333C5.00056 5.57611 5.02833 5.32694 5.08333 5.08583M2.5 2.5L17.5 17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        ) : (
                                            <svg width="1em" height="1em" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 14L5.5 10.8889L0 14V1.55556C0 1.143 0.165561 0.747335 0.460261 0.455612C0.754961 0.163888 1.15466 0 1.57143 0H9.42857C9.84534 0 10.245 0.163888 10.5397 0.455612C10.8344 0.747335 11 1.143 11 1.55556V14Z" fill="currentColor"/>
                                            </svg>
                                        )}
                                        <h1>{bookmark[dataMovie.id] ? 'HAPUS DARI BOOKMARK' : 'TAMBAHKAN KE BOOKMARK'}</h1>
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                     <h2 className="poppins-medium">
                                        Released on: {dataMovie.release_date.slice(5, 7)}/{dataMovie.release_date.slice(8, 10)}/{dataMovie.release_date.slice(0, 4)}
                                     </h2>
                                      <span className="flex items-center gap-1">
                                        <img src="/img/star.png" alt="rating" className="h-4" />
                                        <h1 className="poppins-bold text-white">
                                            {dataMovie.vote_average.toFixed(1)}/10
                                        </h1>
                                      </span>
                                </div>
                            </div>
                        </div>

                    </div>
                    
                    <p className="poppins-regular text-white lg:w-[70vw] lg:mt-5 lg:text-start text-center">
                        {dataMovie.overview}
                    </p>

                     <div className="flex flex-col gap-3 mt-10">
                        <h1 className="text-white poppins-bold text-xl">Genre:</h1>
                        <ul className="flex flex-wrap poppins-bold gap-3">
                            {dataMovie.genres.map(genre => (
                                <li key={genre.id} className="text-black bg-light px-2 py-1 rounded-sm">
                                    {genre.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3 mt-10">
                        <h1 className="text-white poppins-bold text-xl">Movie Cast:</h1>
                         <div className="flex w-full items-center gap-10">
                             <ul
                                ref={castContainerRef}
                                onScroll={handleCastScroll}
                                className="flex overflow-x-scroll poppins-bold w-full sm:w-[800px] gap-3 hide-scrollbar snap-x snap-mandatory"
                             >
                                {dataCast.map((cast, index) => (
                                    <li key={`${cast.id}-${index}`} className="text-black bg-light shrink-0 rounded-lg w-[200px] h-[400px] overflow-hidden snap-start">
                                        {cast.profile_path ? (
                                            <img
                                                className="w-full h-[300px]"
                                                src={`https://image.tmdb.org/t/p/w200/${cast.profile_path}`}
                                                alt={cast.name}
                                            />
                                        ) : (
                                            <div className="w-full h-[300px] flex justify-center items-center text-primary bg-gray-500">
                                                 <span className="text-5xl">?</span>
                                            </div>
                                        )}
                                        <h1 className="poppins-bold px-2 mt-2">{cast.name}</h1>
                                        <p className="poppins-regular px-2 text-sm">{cast.character}</p>
                                    </li>
                                ))}
                             </ul>
                             <button
                                onClick={() => castContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })}
                                className="text-white hover:cursor-pointer sm:block hidden hover:text-primary"
                             >
                                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask0_cast" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="1" y="1" width="22" height="22">
                                        <path d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z" fill="black" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                                        <path d="M10.5 16.5L15 12L10.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </mask>
                                    <g mask="url(#mask0_cast)">
                                        <path d="M0 0H24V24H0V0Z" fill="currentColor"/>
                                    </g>
                                </svg>
                             </button>
                         </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-10">
                         <h1 className="text-white poppins-bold text-xl">Movie Crew:</h1>
                         <div className="flex w-full items-center gap-10">
                            <ul
                                ref={crewContainerRef}
                                onScroll={handleCrewScroll}
                                className="flex overflow-x-scroll poppins-bold w-full sm:w-[800px] gap-3 hide-scrollbar snap-x snap-mandatory"
                            >
                                {dataCrew.map((crew, index) => (
                                     <li key={`${crew.id}-${index}`} className="text-black bg-light shrink-0 rounded-lg w-[200px] h-[400px] overflow-hidden snap-start">
                                        {crew.profile_path ? (
                                            <img
                                                className="w-full h-[300px]"
                                                src={`https://image.tmdb.org/t/p/w200/${crew.profile_path}`}
                                                alt={crew.name}
                                            />
                                        ) : (
                                            <div className="w-full h-[300px] flex justify-center items-center text-primary bg-gray-500">
                                                 <span className="text-5xl">?</span>
                                            </div>
                                        )}
                                        <h1 className="poppins-bold px-2 mt-2">{crew.name}</h1>
                                        <p className="poppins-regular px-2 text-sm">{crew.job}</p>
                                     </li>
                                ))}
                            </ul>
                             <button
                                onClick={() => crewContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })}
                                className="text-white hover:cursor-pointer sm:block hidden hover:text-primary"
                             >
                                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask0_crew" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="1" y="1" width="22" height="22">
                                        <path d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z" fill="black" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                                        <path d="M10.5 16.5L15 12L10.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </mask>
                                    <g mask="url(#mask0_crew)">
                                        <path d="M0 0H24V24H0V0Z" fill="currentColor"/>
                                    </g>
                                </svg>
                             </button>
                         </div>
                    </div>

                </div>
            </section>

             {/* Video Modal */}
             {modalIsOpen && (
                 <>
                    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 p-4 pb-8 backdrop-blur-md sm:items-center lg:p-8">
                         <div className="flex lg:w-[70vw] w-[500px] h-[70vh] lg:h-[500px] flex-col gap-4 overflow-hidden rounded-radius border border-tertiary bg-background text-light">
                             <div className="flex items-center justify-between border-b border-tertiary bg-secondary p-4">
                                  <h3 className="poppins-bold tracking-wide text-light">TONTON VIDEO</h3>
                                  <button onClick={() => setModalIsOpen(false)} className="hover:cursor-pointer text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.4" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                             </div>
                             <ul className="flex-1 w-full overflow-y-scroll hide-scrollbar flex flex-col gap-3 p-4">
                                {dataVideos && dataVideos.map((video) => (
                                    (video.site === 'YouTube') && (
                                        <li
                                            key={video.key}
                                            className="flex items-center group hover:cursor-pointer"
                                            onClick={() => window.open(`https://www.youtube.com/watch?v=${video.key}`, '_blank')}
                                        >
                                            <span className="w-[50px] h-[50px] mx-3 text-primary group-hover:text-white flex justify-center items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                   <mask id={`mask0_${video.key}`} style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="1" y="1" width="45" height="45">
                                                     <path d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                                                     <path d="M10 11.9999V8.53589L13 10.2679L16 11.9999L13 13.7319L10 15.4639V11.9999Z" fill="black" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
                                                   </mask>
                                                   <g mask={`url(#mask0_${video.key})`}>
                                                     <path d="M0 0H24V24H0V0Z" fill="currentColor"/>
                                                   </g>
                                                </svg>
                                            </span>
                                            <div className="flex flex-col text-white">
                                                <h1 className="poppins-bold not-lg:max-w-[250px]">{video.name}</h1>
                                                <p className="poppins-extralight">{video.type}</p>
                                            </div>
                                        </li>
                                    )
                                ))}
                             </ul>
                         </div>
                    </div>
                 </>
             )}

        </main>
    );
};

export default DetailMovie;
