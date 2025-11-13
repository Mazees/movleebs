const { GoogleGenerativeAI } = require("@google/generative-ai");

// ⚠️ Ganti dengan API key kamu sendiri
const API_KEY = "AIzaSyDH8E9LelS-dFIbc4oUQeBB7UkhU1rXTY4";
const genAI = new GoogleGenerativeAI(API_KEY);

async function getDataSurvey(answers, userStory) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // === PERTANYAAN SURVEI ===
  const questions = [
    {
      text: "1. Apakah kamu suka film dengan adegan perkelahian dan aksi cepat? (ya/tidak)",
    },
    {
      text: "2. Apakah kamu menikmati kisah cinta yang romantis dan emosional? (ya/tidak)",
    },
    {
      text: "3. Apakah kamu suka film yang bikin tertawa dan ringan? (ya/tidak)",
    },
    {
      text: "4. Apakah kamu menyukai film yang menyeramkan dan menegangkan? (ya/tidak)",
    },
    {
      text: "5. Apakah kamu tertarik dengan dunia masa depan dan teknologi canggih? (ya/tidak)",
    },
    {
      text: "6. Apakah kamu suka film bertema peperangan atau sejarah? (ya/tidak)",
    },
    {
      text: "7. Apakah kamu menyukai dunia fantasi dengan sihir dan makhluk mistis? (ya/tidak)",
    },
    {
      text: "8. Apakah kamu suka film dengan kisah keluarga dan nilai kehidupan? (ya/tidak)",
    },
    {
      text: "9. Apakah kamu suka memecahkan misteri atau teka-teki dalam film? (ya/tidak)",
    },
    {
      text: "10. Apakah kamu suka film musikal atau yang punya banyak lagu? (ya/tidak)",
    },
    {
      text: "11. Apakah kamu suka kisah petualangan di alam liar atau tempat baru? (ya/tidak)",
    },
    {
      text: "12. Apakah kamu suka film bertema kriminal dan penyelidikan polisi? (ya/tidak)",
    },
    {
      text: "13. Apakah kamu suka film koboi dan kehidupan barat lama? (ya/tidak)",
    },
    {
      text: "14. Apakah kamu menikmati film ringan yang biasanya tayang di TV? (ya/tidak)",
    },
    {
      text: "15. Apakah kamu suka dokumenter dengan kisah nyata dan fakta menarik? (ya/tidak)",
    },
  ];

  // === CONTOH JAWABAN USER ===
  const answers = [
    "ya",
    "tidak",
    "ya",
    "tidak",
    "ya",
    "tidak",
    "ya",
    "ya",
    "tidak",
    "tidak",
    "ya",
    "tidak",
    "tidak",
    "tidak",
    "tidak",
  ];

  const surveyResults = questions
    .map((question, idx) => `${question.text} → ${answers[idx]}`)
    .join("\n");

  const prompt = `
Kamu adalah sistem rekomendasi film berbasis AI. 
Gunakan hasil survei pengguna di bawah ini untuk menentukan genre film yang paling cocok dari daftar berikut:

[DAFTAR GENRE TMDB]
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

=== HASIL SURVEI PENGGUNA ===
${surveyResults}
Gunakan dua sumber data ini:
1. Hasil survei preferensi film (ya/tidak)
2. Cerita pribadi pengguna berikut: "${userStory}"

Berdasarkan dua sumber di atas, tentukan **satu genre** film yang paling cocok untuk pengguna.  
Tuliskan juga **narasi singkat dan interaktif** (maksimal 2 kalimat) yang menjelaskan alasan genre itu cocok untuk pengguna.

Jawaban akhir HARUS dalam format JSON murni tanpa teks tambahan:

{
  "genre": "nama genre",
  "description": "narasi singkat dan interaktif"
}
JANGAN tambahkan kata pembuka, tanda markdown (\`\`\`json), teks penjelasan, atau karakter lain di luar JSON.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    console.log(text);

    // 🔍 Coba parsing JSON
    const data = JSON.parse(text);

    console.log("🎬 Genre Cocok:", data.genre);
    console.log("🗣️ Deskripsi:", data.description);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

run();
