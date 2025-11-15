import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// ⚠️ Ganti dengan API key kamu sendiri
const API_KEY = "AIzaSyDH8E9LelS-dFIbc4oUQeBB7UkhU1rXTY4";
const genAI = new GoogleGenerativeAI(API_KEY);

async function fetchAI(surveyResults, nama, umur, userStory, status) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const prompt = `
Kamu adalah sistem rekomendasi film berbasis AI yang cerdas dan personal.
Tugasmu adalah menganalisis data pengguna untuk menentukan preferensi genre film mereka.

[DAFTAR GENRE TMDB UNTUK OUTPUT]
- Action
- Adventure
- Animation
- Comedy
- Crime
- Documentary
- Drama
- Family
- Fantasy
- History
- Horror
- Music
- Mystery
- Romance
- Science Fiction
- TV Movie
- Thriller
- War
- Western

=== DATA PENGGUNA ===
Nama: ${nama}
Umur: ${umur}
Cerita Pribadi (Konteks): "${userStory}"

=== HASIL SURVEI PREFERENSI ===
${surveyResults}

=== INSTRUKSI UTAMA ===
1.  Berdasarkan *semua* data di atas, tentukan **Top 2 atau 3 genre** (maksimal 3 genre) film yang paling dominan dan cocok untuk pengguna.
2.  Gunakan **Hasil Survei** (terutama jawaban "ya") untuk mengidentifikasi genre-genre yang disukai secara umum.
3.  Gunakan **Cerita Pribadi** sebagai **tambahan referensi** (mood atau kebutuhan pengguna saat ini).
4.  Gunakan **Umur** untuk membantu memperkirakan nada rekomendasi atau sebagai **tambahan referensi**.
5.  Buat **narasi singkat dan personal** (maksimal 3 kalimat) yang merangkum *alasan* kenapa genre-genre itu cocok. Sapa pengguna dengan nama depannya (${nama}).

=== FORMAT OUTPUT (JSON MURNI) ===
Jawaban akhir HARUS dalam format JSON murni tanpa teks tambahan.
Output HARUS berupa array "genres", meskipun kamu hanya menemukan satu genre yang sangat dominan.

{
  "genres": ["Genre 1", "Genre 2", "Genre 3"],
  "description": "Narasi singkat yang menyapa ${nama} (gunakan nama panggilan saja)... dan membahas genres"
}

**JANGAN tambahkan kata pembuka, tanda markdown (\`\`\`json), teks penjelasan, atau karakter lain di luar JSON.**
`;

  try {
    status.loading = true;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    console.log(text);
    const data = JSON.parse(text);
    status.loading = false;
    return data;
  } catch (error) {
    status.loading = false;
    return {isError:true, msg:error}
  }
}

window.fetchAI = fetchAI;
console.log("test")