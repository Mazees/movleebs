const { GoogleGenerativeAI } = require("@google/generative-ai");

// Ganti dengan API Key Anda yang sebenarnya
const API_KEY = "AIzaSyDH8E9LelS-dFIbc4oUQeBB7UkhU1rXTY4"; 

const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
  // Pilih model yang ingin Anda gunakan
  // Contoh: 'gemini-pro' untuk teks, 'gemini-pro-vision' untuk multimodal
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = "Berikan saya ide resep makanan cepat saji yang sehat.";

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

run();