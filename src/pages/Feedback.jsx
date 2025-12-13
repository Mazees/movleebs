import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { addFeedback } from "../db/api";

const Feedback = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await addFeedback(
      formData.name,
      formData.email,
      formData.category,
      formData.message
    );
    if (error) {
      alert(error);
      return;
    }
    console.log("Feedback Submitted:", formData);
    alert("Terima kasih atas masukan Anda!");
    setFormData({ name: "", email: "", category: "General", message: "" });
  };

  return (
    <main className="w-full min-h-[calc(100vh-70px)] bg-blackpurple flex items-center justify-center p-10">
      <section
        className="w-full max-w-2xl bg-secondary rounded-xl p-8 shadow-2xl border border-tertiary"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="text-center mb-8">
          <h1 className="text-white poppins-bold text-xl lg:text-3xl mb-2">
            Kirim <span className="text-primary">Masukan</span>
          </h1>
          <p className="text-light-secondary max-w-md mx-auto poppins-light text-xs">
            Bantu kami meningkatkan MovLeebs dengan memberikan kritik, saran,
            atau laporan bug.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1 flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-white poppins-regular text-sm"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama Anda"
                className="bg-tertiary text-white poppins-light text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-light-secondary/50"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-white poppins-regular text-sm"
              >
                Email (Opsional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nama@email.com"
                className="bg-tertiary text-white poppins-light text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-light-secondary/50"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="category"
              className="text-white poppins-regular text-sm"
            >
              Kategori
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="bg-tertiary text-white poppins-light text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer appearance-none"
            >
              <option value="General">Umum</option>
              <option value="Bug">Laporan Bug</option>
              <option value="Feature">Saran Fitur</option>
              <option value="Other">Lainnya</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-white poppins-regular text-sm"
            >
              Pesan
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tuliskan masukan Anda di sini..."
              className="bg-tertiary text-white poppins-light text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-light-secondary/50 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-4 bg-primary text-white poppins-semibold py-3 rounded-lg hover:brightness-110 transition-all shadow-lg hover:shadow-primary/50"
          >
            Kirim Masukan
          </button>
        </form>
      </section>
    </main>
  );
};

export default Feedback;
