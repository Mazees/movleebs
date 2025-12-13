import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <main>
      <section className="w-full h-[calc(100vh-70px)] bg-black relative">
        <img
          src="/img/bg-hero.png"
          alt="bg-hero"
          className="w-full h-full object-cover object-top blur-xs brightness-50"
        />
        <div className="absolute w-full h-full left-0 top-0 flex flex-col items-center justify-center">
          <div className="flex-col flex gap-5 lg:w-fit w-3/4">
            <h1
              className="text-white poppins-extrabold text-3xl lg:text-6xl"
              data-aos="fade-right"
            >
              Temukan Film Favoritmu<br />
              dengan Gaya Baru
            </h1>
            <p
              className="text-white poppins-extralight text-sm lg:text-lg"
              data-aos="fade-right"
            >
              Movleebs membantu kamu menemukan film terbaik dengan pencarian
              cerdas dan<br />
              rekomendasi genre kesukaan kamu dengan teknologi AI.
            </p>
            <Link
              data-aos="fade-right"
              to="/smartleebs"
              className="px-4 py-2 bg-primary transition-all rounded-sm text-white w-fit hover:bg-white hover:text-primary poppins-regular hover:cursor-pointer flex items-center gap-2"
            >
              COBA SEKARANG
            </Link>
          </div>
        </div>
      </section>
      <div className="bg-blackpurple">
        <section className="w-full flex flex-col justify-center items-center py-30">
          <h1
            className="text-white poppins-bold text-3xl lg:text-4xl mb-20"
            data-aos="fade-down"
          >
            FITUR UNGGULAN
          </h1>
          <ul
            className="w-[90%] gap-10 flex flex-col lg:flex-row items-center justify-between"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <li className="flex group hover:cursor-pointer hover:bg-primary justify-center transition-all items-center bg-light w-[300px] h-[350px] px-6 py-5 rounded-lg">
              <div className="flex flex-col h-full w-fit group-hover:text-white transition-all">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M32.0625 21.375C29.0938 21.375 26.5707 20.3363 24.4934 18.259C22.416 16.1817 21.3766 13.6578 21.375 10.6875C21.3734 7.71717 22.4129 5.19413 24.4934 3.11838C26.5739 1.04263 29.0969 0.00317388 32.0625 7.21336e-06C35.0281 -0.00315945 37.5519 1.0363 39.634 3.11838C41.7161 5.20047 42.7547 7.72351 42.75 10.6875C42.75 11.7563 42.5917 12.7656 42.275 13.7156C41.9583 14.6656 41.5625 15.5563 41.0875 16.3875L47.025 22.325C47.4604 22.7604 47.6781 23.3146 47.6781 23.9875C47.6781 24.6604 47.4604 25.2146 47.025 25.65C46.5896 26.0854 46.0354 26.3031 45.3625 26.3031C44.6896 26.3031 44.1354 26.0854 43.7 25.65L37.7625 19.7125C36.9312 20.1875 36.0406 20.5833 35.0906 20.9C34.1406 21.2167 33.1312 21.375 32.0625 21.375ZM32.0625 16.625C33.725 16.625 35.1302 16.051 36.2781 14.9031C37.426 13.7552 38 12.35 38 10.6875C38 9.02501 37.426 7.6198 36.2781 6.47188C35.1302 5.32397 33.725 4.75001 32.0625 4.75001C30.4 4.75001 28.9948 5.32397 27.8469 6.47188C26.699 7.6198 26.125 9.02501 26.125 10.6875C26.125 12.35 26.699 13.7552 27.8469 14.9031C28.9948 16.051 30.4 16.625 32.0625 16.625ZM4.75 47.5C3.44375 47.5 2.32592 47.0353 1.3965 46.1059C0.467083 45.1765 0.00158333 44.0578 0 42.75V9.50001C0 8.19376 0.4655 7.07592 1.3965 6.14651C2.3275 5.21709 3.44533 4.75159 4.75 4.75001H14.9625C15.6354 4.75001 16.1896 5.03738 16.625 5.61213C17.0604 6.18688 17.1792 6.80992 16.9812 7.48126C16.8625 8.03542 16.7833 8.60938 16.7437 9.20313C16.7042 9.79688 16.6844 10.3708 16.6844 10.925C16.6844 15.2396 18.2083 18.8417 21.2563 21.7313C24.3042 24.6208 27.926 26.0656 32.1219 26.0656C32.874 26.0656 33.626 26.0158 34.3781 25.916C35.1302 25.8163 35.9021 25.6484 36.6938 25.4125L41.3844 30.1031C41.8198 30.5385 42.1562 31.0428 42.3937 31.616C42.6313 32.1892 42.75 32.7932 42.75 33.4281V42.75C42.75 44.0563 42.2853 45.1741 41.3559 46.1035C40.4265 47.0329 39.3078 47.4984 38 47.5H4.75Z"
                    fill="currentColor"
                  />
                </svg>
                <h1 className="poppins-bold text-2xl mt-5">Mencari Film</h1>
                <p className="poppins-extralight text-lg w-3/4 mt-2">
                  Temukan film favoritmu dengan cepat hanya dengan mengetik
                  judulnya.
                </p>
              </div>
            </li>
            <li className="flex group hover:cursor-pointer hover:bg-primary justify-center transition-all items-center bg-light w-[300px] h-[350px] px-6 py-5 rounded-lg">
              <div className="flex flex-col h-full w-fit text-black group-hover:text-white transition-all">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 11 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 14L5.5 10.8889L0 14V1.55556C0 1.143 0.165561 0.747335 0.460261 0.455612C0.754961 0.163888 1.15466 0 1.57143 0H9.42857C9.84534 0 10.245 0.163888 10.5397 0.455612C10.8344 0.747335 11 1.143 11 1.55556V14Z"
                    fill="currentColor"
                  />
                </svg>
                <h1 className="poppins-bold text-2xl mt-5">Menyimpan Film</h1>
                <p className="poppins-extralight text-lg w-3/4 mt-2">
                  Simpan film favorit yang sudah kamu pilih dengan fitur
                  bookmark
                </p>
              </div>
            </li>
            <li className="flex group hover:cursor-pointer text-black hover:bg-primary justify-center transition-all items-center bg-light w-[300px] h-[350px] px-6 py-5 rounded-lg">
              <div className="flex flex-col h-full w-fit group-hover:text-white transition-all">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 4L6 8H9L7 4H9L11 8H14L12 4H14L16 8H19L17 4H20C20.55 4 21.021 4.196 21.413 4.588C21.805 4.98 22.0007 5.45067 22 6V18C22 18.55 21.8043 19.021 21.413 19.413C21.0217 19.805 20.5507 20.0007 20 20H4C3.45 20 2.97933 19.8043 2.588 19.413C2.19667 19.0217 2.00067 18.5507 2 18V6C2 5.45 2.196 4.97933 2.588 4.588C2.98 4.19667 3.45067 4.00067 4 4Z"
                    fill="currentColor"
                  />
                </svg>
                <h1 className="poppins-bold text-2xl mt-5">Detail Film</h1>
                <p className="poppins-extralight text-lg w-3/4 mt-2">
                  Detail film yang sangat lengkap, mulai dari rating, jumlah
                  pendapatan dan detail lainnya.
                </p>
              </div>
            </li>
            <li className="flex group hover:cursor-pointer text-black hover:bg-primary justify-center transition-all items-center bg-light w-[300px] h-[350px] px-6 py-5 rounded-lg">
              <div className="flex flex-col h-full w-fit group-hover:text-white transition-all">
                <svg
                  width="57"
                  height="55"
                  viewBox="0 0 57 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M54.8955 31.5024C55.1463 35.929 53.1682 40.1843 49.63 42.7832L51.7752 47.0384C52.416 48.3236 52.4996 49.8372 51.9424 51.1795C51.413 52.5218 50.3265 53.5784 48.9892 54.0354L46.7883 54.7493C45.8717 55.0646 44.8827 55.0829 43.9556 54.8019C43.0285 54.5209 42.2083 53.9541 41.6063 53.1786L35.7 46.0389C33.2205 45.6105 30.8802 44.5253 28.9022 42.8974C27.5092 43.3258 26.1162 43.5543 24.7232 43.5543C22.2715 43.5543 19.8198 42.7832 17.7582 41.2981C16.2816 41.755 14.7772 41.955 13.2449 41.9264C11.0439 41.955 8.87084 41.498 6.83706 40.6413C4.87847 39.7473 3.20485 38.3063 2.00764 36.4831C0.810417 34.6599 0.137931 32.5281 0.0670885 30.3315C-0.155791 28.2752 0.178529 26.1904 1.04219 24.3056C0.234249 22.1636 0.150668 19.8218 0.847168 17.6513C1.87799 14.9382 3.82819 12.6821 6.252 11.2541C7.86788 6.42769 12.4091 3.20053 17.396 3.54324C21.8536 -0.740598 28.6793 -1.19754 33.6384 2.48656C34.8085 2.17241 36.0343 2.00106 37.2602 2.00106C41.0491 1.91538 44.6431 3.62891 47.0112 6.68472C52.6946 8.19834 56.7622 13.3961 56.985 19.4505C57.1243 22.6206 56.2885 25.7335 54.5891 28.3895C54.7841 29.4176 54.8955 30.4457 54.8955 31.5024ZM40.9655 27.4756C42.5536 27.6755 43.8073 28.9035 43.8073 30.5314C43.8073 31.2888 43.5137 32.0152 42.9913 32.5508C42.4688 33.0864 41.7602 33.3873 41.0213 33.3873H39.2661C38.3746 35.9576 36.8144 38.2137 34.7528 39.9273C35.4493 40.1843 36.1736 40.3271 36.898 40.527C51.1902 40.3271 49.5186 31.3882 49.5186 31.2454C49.4827 30.2738 49.2603 29.319 48.8641 28.4356C48.4679 27.5522 47.9057 26.7575 47.2096 26.097C46.5136 25.4366 45.6973 24.9233 44.8076 24.5865C43.9178 24.2496 42.972 24.096 42.0242 24.1342C41.2853 24.1342 40.5767 23.8333 40.0542 23.2977C39.5317 22.7621 39.2382 22.0357 39.2382 21.2783C39.2382 20.5209 39.5317 19.7945 40.0542 19.2589C40.5767 18.7233 41.2853 18.4224 42.0242 18.4224C45.451 18.5081 48.7385 19.8218 51.3016 22.1351C51.4409 21.3069 51.5245 20.4501 51.5245 19.5933C51.3573 16.052 49.7972 12.9677 43.5287 12.3679C40.0462 3.9145 31.2703 8.59816 31.2703 11.2256C31.1867 11.8824 31.8553 13.2818 31.9668 13.3675C32.7057 13.3675 33.4143 13.6684 33.9368 14.204C34.4592 14.7396 34.7528 15.466 34.7528 16.2234C34.7528 17.7941 33.4991 19.0793 31.9668 19.0793C30.4902 19.0222 29.0972 18.451 27.9828 17.48C26.6455 18.3653 25.1132 18.9079 23.5252 19.0793C21.9372 19.2221 20.6278 18.0797 20.5442 16.509C20.4937 16.136 20.5179 15.7565 20.6153 15.3934C20.7127 15.0304 20.8812 14.6916 21.1107 14.3975C21.3401 14.1035 21.6256 13.8606 21.9498 13.6835C22.2739 13.5064 22.6298 13.3989 22.9959 13.3675C23.4416 13.3104 25.6147 12.9677 25.6147 11.1685C25.6147 9.28358 26.3112 7.48437 27.5092 6.05642C24.9461 5.34245 22.1879 6.28489 19.4019 9.74052C14.2757 8.91231 12.1862 9.62628 10.6539 15.1953C8.00718 16.5375 6.61418 17.48 6.00127 20.3359C9.01014 19.7076 12.1026 19.9646 14.9722 21.0498C16.3652 21.5925 17.1453 23.1918 16.6159 24.7339C16.0866 26.219 14.4707 26.9615 13.022 26.4189C10.9882 25.505 8.70368 25.4479 6.61418 26.2476C5.72267 27.0187 5.72267 28.618 5.72267 29.8745C5.72267 31.9879 6.75348 33.9585 8.50866 35.1008C9.98524 35.8719 11.629 36.2717 13.2727 36.2432C12.8548 35.5006 12.4926 34.7296 12.1862 33.9299C11.9669 33.1962 12.0337 32.4038 12.3726 31.7195C12.7114 31.0352 13.296 30.5123 14.0033 30.2608C14.7106 30.0092 15.4855 30.0487 16.165 30.3708C16.8445 30.6929 17.3756 31.2726 17.6467 31.9879C18.7611 35.2436 21.6029 37.4712 24.9461 37.8425C28.7629 37.6426 32.1618 35.3293 33.8334 31.7594C34.4742 27.8183 37.5666 27.4756 40.9655 27.4756ZM46.5375 48.8091L44.8102 45.0964L42.8322 45.5534L45.6182 49.1232L46.5375 48.8091ZM33.5826 24.2199C33.6069 23.4903 33.3576 22.7789 32.8861 22.2319C32.4146 21.6848 31.7567 21.3436 31.0474 21.2783C29.0693 21.1641 27.147 21.8495 25.6704 23.1918C24.0824 24.8482 23.2466 27.1329 23.3302 29.4462C23.3302 30.2036 23.6237 30.93 24.1462 31.4656C24.6687 32.0012 25.3773 32.302 26.1162 32.302C27.7042 32.302 28.9022 31.0169 28.9022 29.4462C28.9022 28.6751 29.0972 27.904 29.5429 27.2757C29.8773 26.9901 30.2952 26.8473 30.7409 26.8473C32.2732 26.933 33.5826 25.7621 33.5826 24.2199Z"
                    fill="currentColor"
                  />
                </svg>

                <h1 className="poppins-bold text-2xl mt-5">SmartLeebs</h1>
                <p className="poppins-extralight text-lg w-3/4 mt-2">
                  Fitur cerdas berbasis AI yang siap membantumu menemukan film
                  yang paling cocok dengan suasana hati dan seleramu!
                </p>
              </div>
            </li>
          </ul>
        </section>
        <section className="w-full flex flex-col justify-center items-center py-30">
          <h1 className="text-white poppins-extrabold text-3xl lg:text-4xl mb-20">
            TIM KAMI
          </h1>
          <ul
            className="w-3/4 flex flex-col gap-20 relative"
            data-aos="fade"
            data-aos-duration="1000"
          >
            <span className="absolute -left-5 top-0 rounded-2xl lg:-translate-x-1/2 w-[5px] h-full bg-white"></span>
            <li className="poppins-bold lg:text-3xl text-2xl not-lg:ml-5 text-white w-full flex">
              Muhammad Rizky Puspojati <br />
              (24081010019)
            </li>
            <li className="poppins-bold lg:text-3xl text-2xl not-lg:ml-5 text-white w-full flex">
              Risyad Maulana Daffa <br />
              (24081010057)
            </li>
            <li className="poppins-bold lg:text-3xl text-2xl not-lg:ml-5 text-white w-full flex">
              Arjuna Sandya Raissa Naryama <br />
              (24081010119)
            </li>
            <li className="poppins-bold lg:text-3xl text-2xl not-lg:ml-5 text-white w-full flex">
              Muhammad Fakhri Anshary Yusaf <br />
              (24081010124)
            </li>
            <li className="poppins-bold lg:text-3xl text-2xl not-lg:ml-5 text-white w-full flex">
              Mada Putra Adhadriyanto <br />
              (24081010192)
            </li>
          </ul>
        </section>
        <section
          data-aos="fade"
          data-aos-duration="1000"
          className="w-full flex flex-col justify-center items-center py-30 gap-20"
        >
          <h1 className="text-white poppins-extrabold text-3xl w-full text-center lg:text-4xl mb-10">
            TOOLS YANG KAMI GUNAKAN
          </h1>
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-20">
            <span className="w-[200px] h-[200px] bg-light p-3 rounded-2xl">
              <img className="w-full h-full" src="/img/alpine.webp" alt="alpine" />
            </span>
            <span className="w-[200px] h-[200px] bg-light p-3 rounded-2xl">
              <img className="w-full h-full" src="/img/gemini.webp" alt="gemini" />
            </span>
          </div>
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-20">
            <span className="w-[200px] h-[200px] bg-light p-3 rounded-2xl">
              <img
                className="w-full h-full"
                src="/img/tailwind.webp"
                alt="tailwind"
              />
            </span>
            <span className="w-[200px] h-[200px] bg-light p-3 rounded-2xl">
              <img
                className="w-full h-full"
                src="/img/themoviedb.png"
                alt="themoviedb.png"
              />
            </span>
          </div>
        </section>
      </div>
      <section
        className="w-full bg-primary flex relative items-center overflow-hidden not-lg:px-5 not-lg:py-8"
        data-aos="fade"
        data-aos-duration="1000"
      >
        <div className="flex justify-center items-center h-full w-3/4">
          <span className="flex flex-col gap-3 relative z-10 w-[500px]">
            <h1 className="text-white poppins-bold text-4xl lg:text-5xl">
              BINGUNG MAU NONTON APA??
            </h1>
            <p className="text-light/80 not-lg:text-sm poppins-bold w-full max-w-[500px]">
              Movleebs punya SmartLeebs, fitur cerdas berbasis AI yang siap
              membantumu menemukan film yang paling cocok dengan suasana
              hati dan seleramu!
            </p>
            <Link
              to="/smartleebs"
              className="px-4 py-2 bg-white transition-all rounded-sm text-primary w-fit hover:brightness-90 poppins-bold hover:cursor-pointer flex items-center gap-2"
            >
              MULAI SEKARANG
            </Link>
          </span>
        </div>
        <img
          src="/img/avatar.png"
          alt=""
          className="flex-1 h-full object-cover w-[500px] not-lg:absolute bottom-0 -right-[100px]"
        />
      </section>
    </main>
  );
};

export default Home;
