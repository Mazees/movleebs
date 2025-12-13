# MovLeebs

Movleebs membantu kamu menemukan film terbaik dengan pencarian cerdas dan rekomendasi genre kesukaan kamu dengan teknologi AI.

# Anggota Kelompok
- Mada Putra Adhadriyanto	(24081010192)
- Muhammad Fakhri Anshary Yusaf	(24081010124)
- Risyad Maulana Daffa 	(24081010057)
- Muhammad Rizky Puspojati	(24081010019)
- Arjuna Sandya Raissa Naryama	(24081010119)

## Panduan Instalasi

### Persyaratan

1. Pastikan [Node.js](https://nodejs.org/) sudah terinstal di komputer Anda
2. Editor kode (direkomendasikan: [Visual Studio Code](https://code.visualstudio.com/))

### Langkah-Langkah Instalasi

1. **Unduh atau Clone Project**

   ```sh
   git clone https://github.com/yourusername/movleebs.git
   cd movleebs
   ```

2. **Instal Dependensi**

   ```sh
   npm install
   ```

3. **Konfigurasi Environment Variables**

   Salin file `.env-copy` menjadi `.env` dan isi dengan API keys Anda:

   ```sh
   cp .env-copy .env
   ```

   Kemudian edit file `.env` dan isi dengan API keys yang valid:
   - **TMDB API**: Daftar di [TMDB](https://www.themoviedb.org/settings/api) dan buat API key
   - **Gemini AI**: Dapatkan dari [Google AI Studio](https://makersuite.google.com/app/apikey)
   - **Supabase**: Buat project di [Supabase](https://supabase.com), lalu ambil URL dan anon key dari Project Settings > API

4. **Jalankan Server Development**
   ```sh
   npm run dev
   ```

## Fitur

- Menampilkan daftar film
- Pencarian film
- Pengurutan film berdasarkan parameter
- Tampilan detail film
- Bookmark film favorit
- Rekomendasi film dengan AI (SmartLeebs)
- Halaman feedback dan laporan
- Admin dashboard dengan autentikasi
  - Login admin dengan Supabase Auth
  - Manajemen feedback (view, update status, delete)
  - Pagination data feedback

## Teknologi yang Digunakan
- **Frontend**: React, TailwindCSS
- **API**: TMDB (The Movie Database)
- **AI**: Gemini AI
- **Database & Auth**: Supabase
- **Animation**: AOS (Animate On Scroll)
- **Routing**: React Router

## Catatan untuk Pemula

- Pastikan semua perintah dijalankan di terminal/command prompt
- Terminal dapat dibuka di VS Code dengan menekan `Ctrl + ` ` (backtick/tanda kutip)
- Jika Anda mengalami error saat instalasi, pastikan Node.js terinstal dengan benar dengan menjalankan:
  ```sh
  node --version
  npm --version
  ```

## Penyelesaian Masalah

Jika Anda mengalami masalah:

1. Pastikan semua dependensi terinstal (`npm install`)
2. Periksa apakah Node.js sudah terinstal dengan benar
3. Coba hapus folder `node_modules` dan jalankan `npm install` lagi
