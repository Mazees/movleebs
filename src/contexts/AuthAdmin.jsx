import React, { createContext, useContext, useState, useEffect } from "react";
import supabase from "../db/supabase";

const AuthContext = createContext({
  session: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  // Ambil Sesi Saat Ini
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    // Setup Listener (Pemantau) Real-time
    // Ini memastikan status terupdate jika user login/logout di tab lain
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
    // Bersihkan listener saat komponen dilepas
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  // Nilai yang akan dibagikan ke seluruh aplikasi
  const value = {
    session,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
