import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Bookmark = () => {
  const [bookmark, setBookmark] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
    const storedBookmark = localStorage.getItem('bookmark');
    if (storedBookmark) {
      setBookmark(JSON.parse(storedBookmark));
    }
  }, []);

  const openMovie = (id) => {
    localStorage.setItem("idMovie", JSON.stringify(id));
    navigate('/detail-movie');
  };

  const removeBookmark = (id) => {
    const newBookmark = { ...bookmark };
    delete newBookmark[id];
    setBookmark(newBookmark);
    localStorage.setItem('bookmark', JSON.stringify(newBookmark));
  };

  return (
    <main
      className="w-full lg:w-3/4 mx-auto flex flex-col justify-center items-center pb-20"
      data-aos="fade"
      data-aos-duration="1000"
    >
      <div className="flex w-full not-lg:pl-5 text-white text-xl poppins-bold items-center gap-2 mt-10">
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 11 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 14L5.5 10.8889L0 14V1.55556C0 1.143 0.165561 0.747335 0.460261 0.455612C0.754961 0.163888 1.15466 0 1.57143 0H9.42857C9.84534 0 10.245 0.163888 10.5397 0.455612C10.8344 0.747335 11 1.143 11 1.55556V14Z"
            fill="currentColor"
          />
        </svg>
        <h1>BOOKMARKS</h1>
      </div>
      
      <ul className="w-full flex flex-col">
        {Object.entries(bookmark).map(([id, book]) => (
            <li key={id} className="flex w-full gap-5 py-5 px-5">
                <div className="my-auto not-lg:hidden">
                    <svg
                        width="35"
                        height="31"
                        viewBox="0 0 35 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M8.48826 27.125C7.92398 27.125 7.44496 26.9214 7.05119 26.5142C6.65606 26.107 6.4585 25.6123 6.4585 25.0302C6.4585 24.4481 6.65606 23.9521 7.05119 23.5421C7.44631 23.1321 7.92534 22.9271 8.48826 22.9271H32.8454C33.4097 22.9271 33.8887 23.1307 34.2825 23.5379C34.6776 23.9451 34.8752 24.4397 34.8752 25.0218C34.8752 25.6039 34.6776 26.1 34.2825 26.51C33.8873 26.92 33.4083 27.125 32.8454 27.125H8.48826ZM8.48826 14.5312C7.92398 14.5312 7.44496 14.3276 7.05119 13.9204C6.65606 13.5132 6.4585 13.0186 6.4585 12.4365C6.4585 11.8544 6.65606 11.3583 7.05119 10.9483C7.44631 10.5383 7.92534 10.3333 8.48826 10.3333H32.8454C33.4097 10.3333 33.8887 10.5369 34.2825 10.9441C34.6776 11.3513 34.8752 11.846 34.8752 12.4281C34.8752 13.0102 34.6776 13.5062 34.2825 13.9162C33.8873 14.3262 33.4083 14.5312 32.8454 14.5312H8.48826Z"
                        fill="white"
                        />
                    </svg>
                </div>
                {book.poster_path === null ? (
                    <div className="rounded-lg lg:w-[111px] lg:h-[167px] h-[83px] w-14 bg-light flex justify-center items-center animate-pulse">
                        <img src="/img/icon.svg" alt="icon" className="h-[35px]" />
                    </div>
                ) : (
                    <img
                        className="lg:w-[111px] lg:h-[167px] h-[83px] w-14 rounded-lg"
                        src={`https://image.tmdb.org/t/p/w300${book.poster_path}`}
                        alt=""
                    />
                )}
                
                <div className="flex flex-col w-full">
                    <h1 className="text-white text-sm lg:text-3xl poppins-semibold">{book.title}</h1>
                    <p className="text-white text-[10px] lg:text-lg poppins-extralight">
                        {book.genres && book.genres.map(g => g.name).join(' - ')} 
                        {book.runtime && ` (${Math.floor(book.runtime/60)}h ${String(book.runtime%60).padStart(2,'0')}m)`}
                    </p>
                    <button
                        className="py-1 px-3 poppins-regular bg-primary not-lg:text-[10px] rounded-sm hover:cursor-pointer mt-2 text-white hover:brightness-75 w-fit"
                        onClick={() => openMovie(book.id)}
                    >
                        DETAIL FILM
                    </button>
                </div>

                <div className="relative w-fit">
                    <ContextMenu onRemove={() => removeBookmark(book.id)} />
                </div>
            </li>
        ))}
        {Object.keys(bookmark).length === 0 && (
            <div className="w-full text-center text-white mt-10 poppins-regular">
                Belum ada bookmark.
            </div>
        )}
      </ul>
    </main>
  );
};

const ContextMenu = ({ onRemove }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <button
                type="button"
                aria-label="context menu"
                className="inline-flex items-center bg-transparent transition hover:opacity-75 text-white hover:cursor-pointer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="currentColor"
                    className="w-8 h-8"
                >
                    <path
                    fillRule="evenodd"
                    d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                    clipRule="evenodd"
                    />
                </svg>
            </button>
            {isOpen && (
                <div
                    className="absolute top-8 right-0 flex w-fit min-w-24 flex-col divide-y divide-outline overflow-hidden rounded-lg border-outline bg-red-600 hover:brightness-75 hover:cursor-pointer z-10"
                    onClick={onRemove}
                >
                   <ul className="flex flex-col py-1.5" role="none">
                    <li
                        className="flex poppins-regular items-center gap-2 bg-surface-alt px-2 text-sm text-white"
                        role="menuitem"
                        tabIndex="0"
                    >
                        <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            d="M6.42333 3.10083C6.98338 2.70955 7.65014 2.49981 8.33333 2.5H11.6667C12.5507 2.5 13.3986 2.85119 14.0237 3.47631C14.6488 4.10143 15 4.94928 15 5.83333V11.6667M15 15V17.5L10 14.1667L5 17.5V5.83333C5.00056 5.57611 5.02833 5.32694 5.08333 5.08583M2.5 2.5L17.5 17.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        </svg>
                        HAPUS
                    </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Bookmark;
