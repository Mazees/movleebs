import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// ⚠️ Ganti dengan API key kamu sendiri
const API_KEY = "AIzaSyDH8E9LelS-dFIbc4oUQeBB7UkhU1rXTY4";
const genAI = new GoogleGenerativeAI(API_KEY);

async function fetchAI(surveyResults, nama, umur, userStory, status, gender) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const genres = await getGenresList();

  const prompt = `
Kamu adalah sistem rekomendasi film berbasis AI yang cerdas dan personal.
Tugasmu adalah menganalisis data pengguna untuk menentukan preferensi genre film mereka.

[DAFTAR ID DAN NAMA GENRE TMDB UNTUK OUTPUT]

${JSON.stringify(genres)}

=== DATA PENGGUNA ===
Nama: ${nama}
Umur: ${umur}
Jenis Kelamin: ${gender}
Cerita Pribadi (Konteks Utama): "${userStory}"

=== HASIL SURVEI PREFERENSI ===
${surveyResults}

=== INSTRUKSI UTAMA ===
1.  Berdasarkan *semua* data di atas, tentukan 1 sampai 3 genre film yang paling dominan dan cocok untuk pengguna.
2.  Gunakan **Cerita Pribadi** sebagai **referensi utama** (mood atau kebutuhan pengguna saat ini).
3.  Gunakan **Hasil Survei** untuk mengidentifikasi genre-genre yang disukai secara umum.
4.  Gunakan **Umur** dan **Jenis Kelamin** untuk membantu memperkirakan nada rekomendasi atau sebagai **tambahan referensi**.
5.  Buat **narasi personal** 3 kalimat yang merangkum *alasan* kenapa genre-genre itu cocok yang tidak terlalu panjang dan tidak terlalu pendek juga. Sapa pengguna dengan nama depannya (${nama}).

=== FORMAT OUTPUT (JSON MURNI) ===
Jawaban akhir HARUS dalam format JSON murni tanpa teks tambahan.
Output HARUS berupa array "genres", meskipun kamu hanya menemukan satu genre yang sangat dominan, lalu untuk **genre_ids harus cocok dengan data diatas** dan berbentuk **number**

{
  "genres": ["genres.name 1", "genres.name 2", "genres.name 3"],
  "genre_ids": [genres.id 1,genres.id 2,genres.id 3],
  "description": "Narasi singkat yang menyapa ${nama} (gunakan nama panggilan saja)... dan membahas genres"
}

=== PERINGATAN KERAS ===
**JANGAN tambahkan kata pembuka, tanda markdown (\`\`\`json), teks penjelasan, atau karakter lain di luar JSON.**
`;

  console.log(prompt);

  try {
    status.loading = true;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    text = text
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/\s*```$/, "");
    console.log(text);
    console.log(text);
    const data = JSON.parse(text);
    status.loading = false;
    return data;
  } catch (error) {
    status.loading = false;
    return { isError: true, msg: error };
  }
}

window.fetchAI = fetchAI;
console.log("test");
