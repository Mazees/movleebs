import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../db/api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      // PERBAIKAN 1: Destructuring langsung (pecah data dan error)
      const { data, error } = await loginUser(email, password);

      // PERBAIKAN 2: Cek error dari Supabase dulu
      if (error) {
        setLoginError(error.message); // Tampilkan pesan asli dari Supabase (misal: "Invalid login credentials")
        return; // Stop proses
      }

      // PERBAIKAN 3: Cek data user
      if (data?.user) {
        console.log("Login berhasil! User ID:", data.user.id);
        navigate("/admin");
      } else {
        // Jaga-jaga jika sukses tapi data kosong (jarang terjadi)
        setLoginError("Login gagal. Silakan coba lagi.");
      }
    } catch (err) {
      setLoginError("Terjadi kesalahan sistem.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full min-h-[calc(100vh-70px)] bg-blackpurple flex items-center justify-center p-10">
      <section className="w-full max-w-md bg-secondary rounded-xl p-8 shadow-2xl border border-tertiary flex flex-col items-center">
        <div className="flex gap-3 mb-6">
          <img src="/img/icon.svg" className="size-10" alt="icon" />
          <h1 className="poppins-bold text-primary text-3xl">
            Admin <span className="text-white">Login</span>
          </h1>
        </div>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-white poppins-regular text-sm"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-tertiary text-white poppins-light text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-light-secondary/50"
              placeholder="admin@movleebs.com"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-white poppins-regular text-sm"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-tertiary text-white poppins-light text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-light-secondary/50"
              placeholder="********"
              required
            />
          </div>
          {loginError && (
            <p className="text-white bg-red-600/50 py-2 px-3 rounded-lg poppins-bold w-full text-sm mt-1">
              {loginError}
            </p>
          )}
          <button
            type="submit"
            className=" bg-primary text-white poppins-semibold py-3 rounded-lg hover:brightness-110 transition-all shadow-lg hover:shadow-primary/50 w-full"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
};

export default AdminLogin;
