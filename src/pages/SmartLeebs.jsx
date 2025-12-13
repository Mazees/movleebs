import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuestion, fetchMovies, hashTableLookup, mergeSort } from '../lib/api';
import { fetchAI } from '../lib/gemini';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SmartLeebs = () => {
    const [step, setStep] = useState(0);
    const [nama, setNama] = useState('');
    const [umur, setUmur] = useState('');
    const [gender, setGender] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState(Array(10).fill(null));
    const [story, setStory] = useState('');
    
    // Movies state for recommendation
    const [movies, setMovies] = useState([]);
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    
    // Gemini State
    const [geminiResult, setGeminiResult] = useState({ genres: null, description: null });
    const [statusGemini, setStatusGemini] = useState({ loading: true });
    const [statusMovies, setStatusMovies] = useState({ isLoading: true });
    
    // Modals
    const [dangerModalIsOpen, setDangerModalIsOpen] = useState(false);
    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
    const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        AOS.init();
        const initData = async () => {
             // Fetch Questions
             // Need to fetch from public/data/question.json. Since using Vite, /data/question.json works.
             const q = await fetchQuestion('/data/question.json');
             // Randomize 10 questions as per original logic
             // Original: loop 10 times, pick random, unique.
             if (q && q.length > 0) {
                 const randomQuestions = [];
                 const selected = new Set();
                 while (randomQuestions.length < 10) {
                     const idx = Math.floor(Math.random() * q.length);
                     if (!selected.has(idx)) {
                         selected.add(idx);
                         randomQuestions.push(q[idx].text);
                     }
                 }
                 setQuestions(randomQuestions);
             }

             // Fetch Movies (Heavy operation)
             setStatusMovies({ isLoading: true });
             const m = await fetchMovies(50, null); // Pass null status, handle local
             setMovies(m);
             setStatusMovies({ isLoading: false });
        };
        initData();
    }, []);

    const handleGenderSelect = (g) => {
        setGender(g);
        setGenderDropdownOpen(false);
    };

    const handleInfoModalComplete = async () => {
        setInfoModalIsOpen(false);
        setStep(prev => prev + 1);
        
        const surveyResults = questions.map((q, i) => `${q} jawaban: ${answers[i]}`);
        
        // Fetch AI
        const result = await fetchAI(surveyResults, nama, umur, story, statusGemini, gender);
        setGeminiResult(result);
        
        // Get Recommendations
        if (result && result.genre_ids) {
             const temp = hashTableLookup(movies, result.genre_ids);
             const sorted = mergeSort(temp, "vote_average", false);
             setRecommendedMovies(sorted);
        }
    };

    const openMovie = (id) => {
        localStorage.setItem("idMovie", JSON.stringify(id));
        navigate('/detail-movie');
    };

    return (
        <main className="w-full flex flex-col justify-center items-center py-20 min-h-screen">
            <section
                data-aos-duration="1000"
                data-aos="zoom-in"
                className="lg:w-3/4 w-[95%] flex gap-5 flex-col h-fit bg-light rounded-2xl py-5 px-5"
            >
                 <h1 className="poppins-bold text-black text-3xl flex items-center gap-2">
                    <img src="/img/ai.png" alt="ai" className="w-[1em] h-[1em]" />SmartLeebs
                </h1>

                {/* Stepper */}
                <div className="flex h-fit justify-center gap-3 items-center px-10 mb-5">
                    {[0, 1, 2, 3].map((s) => (
                        <span key={s} className="flex items-center gap-3">
                            <h1 className={`poppins-bold w-7 h-7 flex items-center justify-center rounded-full ${step === s ? 'text-white bg-primary' : 'text-white bg-black'}`}>
                                {s + 1}
                            </h1>
                            <h1 className={`poppins-medium text-lg lg:flex hidden items-center justify-center rounded-full ${step === s ? 'text-primary' : 'text-black'}`}>
                                {s === 0 && 'Data Diri'}
                                {s === 1 && 'Pertanyaan'}
                                {s === 2 && 'Cerita'}
                                {s === 3 && 'Hasil'}
                            </h1>
                            {s < 3 && <span className="lg:flex hidden h-1 w-16 rounded-2xl bg-black"></span>}
                        </span>
                    ))}
                </div>

                {/* Steps Content */}
                <div className="w-full min-h-[300px]">
                    {step === 0 && (
                        <div className="flex w-full h-full flex-col items-center">
                            <div className="flex not-lg:flex-col w-full flex-wrap not-lg:gap-5 lg:px-10">
                                <div className="flex w-full lg:w-1/2 lg:h-[100px]">
                                    <div className="flex w-full max-w-xs flex-col gap-1">
                                        <label className="w-fit pl-0.5 text-sm poppins-bold text-black">Nama:</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border poppins-regular border-outline bg-black text-white px-2 py-2 text-sm"
                                            placeholder="Masukkan nama anda"
                                            value={nama}
                                            onChange={(e) => setNama(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full lg:w-1/2 lg:h-[100px]">
                                     <div className="flex w-full max-w-xs flex-col gap-1">
                                        <label className="w-fit pl-0.5 text-sm poppins-bold text-black">Umur:</label>
                                        <input
                                            type="number"
                                            className="w-full rounded-lg border poppins-regular border-outline bg-black text-white px-2 py-2 text-sm"
                                            placeholder="Masukkan umur anda"
                                            value={umur}
                                            onChange={(e) => setUmur(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col w-full lg:w-1/2">
                                     <h1 className="w-fit pl-0.5 text-sm poppins-bold text-black">Jenis Kelamin:</h1>
                                     <div className="relative w-fit mt-1">
                                         <button
                                            type="button"
                                            onClick={() => setGenderDropdownOpen(!genderDropdownOpen)}
                                            className="inline-flex items-center gap-2 bg-black rounded-lg text-white px-2 py-1 hover:cursor-pointer hover:bg-secondary"
                                        >
                                            <h1 className="poppins-regular">{gender === null ? 'Pilih' : gender}</h1>
                                            <svg aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                        {genderDropdownOpen && (
                                            <>
                                            <div className="fixed inset-0 z-10" onClick={() => setGenderDropdownOpen(false)}></div>
                                            <div className="flex w-fit min-w-48 flex-col overflow-hidden rounded-radius absolute top-11 left-0 bg-black rounded-lg text-white p-2 z-20">
                                                <span onClick={() => handleGenderSelect('Laki-Laki')} className="px-2 py-2 hover:cursor-pointer rounded-lg hover:bg-secondary poppins-regular">Laki-Laki</span>
                                                <span onClick={() => handleGenderSelect('Perempuan')} className="px-2 py-2 hover:cursor-pointer rounded-lg hover:bg-secondary poppins-regular">Perempuan</span>
                                            </div>
                                            </>
                                        )}
                                     </div>
                                </div>
                            </div>
                            <div className="w-full flex h-full items-end justify-end">
                                <button
                                    onClick={() => {
                                        if (nama && gender && umur) {
                                            setStep(prev => prev + 1);
                                        } else {
                                            setDangerModalIsOpen(true);
                                        }
                                    }}
                                    className="text-primary-dark w-fit bg-black text-white px-4 py-2 mt-10 rounded-lg poppins-regular hover:bg-primary hover:cursor-pointer"
                                >
                                    Lanjut
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="flex w-full h-full flex-col items-center">
                            <ul className="flex-1 flex flex-col gap-5 h-full w-full overflow-y-scroll hide-scrollbar max-h-[400px] pb-5 text-black">
                                {questions.map((question, index) => (
                                    <li key={index} className="w-full flex flex-col gap-2">
                                        <h1 className="poppins-regular not-lg:text-sm">{index + 1}. {question}</h1>
                                        <div className="flex flex-col gap-2">
                                            {['iya', 'biasa aja', 'tidak'].map((val) => (
                                                <label key={val} className="flex w-fit not-lg:text-sm min-w-52 items-center justify-start gap-2 rounded-radius poppins-regular pl-3 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name={`radio-${index}`}
                                                        value={val}
                                                        checked={answers[index] === val}
                                                        onChange={(e) => {
                                                            const newAnswers = [...answers];
                                                            newAnswers[index] = e.target.value;
                                                            setAnswers(newAnswers);
                                                        }}
                                                        className="h-4 w-4 appearance-none rounded-full border border-black checked:bg-primary"
                                                    />
                                                    <span className="text-sm capitalize">{val}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="w-full h-fit flex items-end justify-between mt-4">
                                <button onClick={() => setStep(prev => prev - 1)} className="text-primary-dark w-fit bg-black text-white px-4 py-2 rounded-lg poppins-regular hover:bg-primary hover:cursor-pointer">Kembali</button>
                                <button
                                    onClick={() => {
                                        if (answers.every(item => item !== null)) {
                                            setStep(prev => prev + 1);
                                        } else {
                                            setDangerModalIsOpen(true);
                                        }
                                    }}
                                    className="text-primary-dark w-fit bg-black text-white px-4 py-2 rounded-lg poppins-regular hover:bg-primary hover:cursor-pointer"
                                >
                                    Lanjut
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                         <div className="flex w-full h-full flex-col items-center">
                            <div className="h-full w-full pb-5">
                                <div className="flex w-full h-full flex-col gap-1">
                                    <label htmlFor="textArea" className="w-fit pl-0.5 text-sm lg:text-sm poppins-regular text-black">Tulis Cerita:</label>
                                    <textarea
                                        id="textArea"
                                        className="w-full h-[200px] not-lg:text-sm outline-none resize-none bg-light-secondary p-2 rounded-lg poppins-regular text-white"
                                        rows="3"
                                        value={story}
                                        onChange={(e) => setStory(e.target.value)}
                                        placeholder="Ceritakan suasana hati (mood) anda saat ini/film favorit yang sering kamu tonton/tipe film yang pengen kamu tonton saat ini!"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="w-full h-fit flex items-end justify-between">
                                <button onClick={() => setStep(prev => prev - 1)} className="text-primary-dark w-fit bg-black text-white px-4 py-2 rounded-lg poppins-regular hover:bg-primary hover:cursor-pointer">Kembali</button>
                                <button
                                    onClick={() => {
                                        if (story) {
                                            setInfoModalIsOpen(true);
                                        } else {
                                            setDangerModalIsOpen(true);
                                        }
                                    }}
                                    className="text-primary-dark w-fit bg-black text-white px-4 py-2 rounded-lg poppins-regular hover:bg-primary hover:cursor-pointer"
                                >
                                    Lanjut
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="w-full h-full">
                            {!statusGemini.loading && geminiResult.genres && geminiResult.description ? (
                                <div className="w-full h-full flex flex-col gap-5 mt-5 text-black">
                                    <h1 className="w-full poppins-bold lg:text-xl">Hasil Analisis Genre Yang Cocok Untuk Anda Adalah :</h1>
                                    <ul className="flex w-full flex-wrap gap-3">
                                        {geminiResult.genres.map((genre, idx) => (
                                            <li key={idx} className="bg-primary py-2 px-4 not-lg:text-xs text-white rounded-lg poppins-bold">{genre}</li>
                                        ))}
                                    </ul>
                                    <p className="poppins-light not-lg:text-sm w-full h-full">{geminiResult.description}</p>
                                </div>
                            ) : (
                                <div className="w-full h-full flex flex-col not-lg:justify-center not-lg:pb-10 items-center justify-center min-h-[300px]">
                                    <img src="/img/gemini.webp" alt="gemini" className="h-32 animate-pulse" />
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" className="size-12 fill-blue-500 motion-safe:animate-spin">
                                        <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
                                        <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"/>
                                    </svg>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </section>

            {/* Recommendations Section */}
            {step === 3 && recommendedMovies.length > 0 && (
                <section className="lg:w-3/4 w-[90%] p-5 flex flex-col mt-10 gap-5">
                    <h1 className="w-full text-primary poppins-bold text-xl lg:text-3xl">Rekomendasi Film Yang Bisa Anda Tonton:</h1>
                    {statusMovies.isLoading ? (
                         <div className="flex justify-center items-center h-40">
                             <span className="text-white">Loading Movies...</span>
                         </div>
                    ) : (
                        <ul className="flex lg:justify-between justify-center items-center flex-wrap gap-10 h-fit">
                             {recommendedMovies.map((movie, index) => (
                                <li
                                    key={movie.id || index}
                                    className="w-[300px] h-[500px] flex flex-col hover:cursor-pointer"
                                    onClick={() => openMovie(movie.id)}
                                >
                                    <div className="relative">
                                        {movie.poster_path === null ? (
                                             <span className="rounded-[10px] w-[300px] h-[450px] bg-light flex justify-center items-center animate-pulse">
                                                <img src="/img/icon.svg" alt="icon" className="h-[35px]" />
                                             </span>
                                        ) : (
                                            <img
                                                className="rounded-[10px] w-[300px] h-[450px] transition-all hover:drop-shadow-[0_0_10px_#646cffaa]"
                                                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                                                alt={`poster-${index}`}
                                            />
                                        )}
                                        <span className="absolute left-3 top-3 w-10 h-10 flex justify-center items-center poppins-medium rounded-full bg-yellow-300">
                                            {movie.vote_average ? movie.vote_average.toFixed(1) : ''}
                                        </span>
                                    </div>
                                    <div className="w-full h-fit flex flex-col text-white">
                                        <h1 className="poppins-medium text-sm mt-2">{movie.title}</h1>
                                        <h1 className="poppins-light text-sm">{movie.release_date ? movie.release_date.slice(0, 4) : ''}</h1>
                                    </div>
                                </li>
                             ))}
                        </ul>
                    )}
                </section>
            )}

            {/* Danger Modal */}
            {dangerModalIsOpen && (
                 <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 p-4 pb-8 backdrop-blur-md sm:items-center lg:p-8">
                     <div className="flex max-w-lg flex-col gap-4 overflow-hidden rounded-lg bg-light">
                        <div className="flex items-center justify-between bg-surface-alt/60 px-4 py-2 dark:border-outline-dark dark:bg-surface-dark/20">
                             <div className="flex items-center text-red-600 justify-center rounded-full bg-danger/20 p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6" aria-hidden="true">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd"/>
                                </svg>
                             </div>
                        </div>
                        <div className="px-4 text-black poppins-regular">
                            <h3 className="mb-2 text-center tracking-wide poppins-bold text-xl text-red-600">
                                {step === 2 ? 'YUK CERITA DIKIT AJA!' : 'MOHON LENGKAPI DATA!'}
                            </h3>
                            <p className="text-center">
                                {step === 2 ? (
                                    <>
                                        Kami gunakan ceritamu untuk referensi agar AI bisa menganalisis genre terbaik untukmu secara akurat
                                        <br /><br />
                                        <span className="poppins-regular-italic">
                                            Contoh: <br />
                                            "Aku Mau Nonton Film Yang Gelut-Gelut Tapi Ada Lucu Nya"
                                        </span>
                                    </>
                                ) : (
                                    "Mohon lengkapi semua data sebelum melanjutkan."
                                )}
                            </p>
                        </div>
                        <div className="flex items-center justify-center border-outline p-4 dark:border-outline-dark">
                             <button
                                onClick={() => setDangerModalIsOpen(false)}
                                type="button"
                                className="text-primary-dark w-full bg-red-600 text-white px-4 py-2 rounded-lg poppins-regular hover:opacity-75 hover:cursor-pointer"
                            >
                                CLOSE
                            </button>
                        </div>
                     </div>
                 </div>
            )}

            {/* Info Modal */}
            {infoModalIsOpen && (
                 <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 p-4 pb-8 backdrop-blur-md sm:items-center lg:p-8">
                     <div className="flex max-w-lg flex-col gap-4 overflow-hidden rounded-lg bg-light">
                        <div className="flex items-center justify-between bg-surface-alt/60 px-4 py-2 dark:border-outline-dark dark:bg-surface-dark/20">
                             <div className="flex items-center text-primary justify-center rounded-full bg-danger/20 p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6" aria-hidden="true">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd"/>
                                </svg>
                             </div>
                        </div>
                        <div className="px-4 text-black poppins-regular">
                            <h3 className="mb-2 text-center tracking-wide poppins-bold text-xl text-primary">APAKAH ANDA YAKIN?</h3>
                            <p className="text-center">
                                Setelah anda menyelesaikan survei maka anda akan mendapatkan rekomendasi genre film yang cocok untuk anda
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 items-center justify-center border-outline p-4 dark:border-outline-dark">
                             <button
                                onClick={handleInfoModalComplete}
                                type="button"
                                className="text-primary-dark w-full bg-primary text-white px-4 py-2 rounded-lg poppins-regular hover:opacity-75 hover:cursor-pointer"
                            >
                                SELESAIKAN
                            </button>
                            <button
                                onClick={() => setInfoModalIsOpen(false)}
                                type="button"
                                className="text-primary-dark w-full bg-primary text-white px-4 py-2 rounded-lg poppins-regular hover:opacity-75 hover:cursor-pointer"
                            >
                                KEMBALI
                            </button>
                        </div>
                     </div>
                 </div>
            )}
        </main>
    );
};

export default SmartLeebs;
