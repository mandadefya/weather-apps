import React, { createContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) =>
      setUser(data.session?.user || null)
    );
    const { data: listener } = supabase.auth.onAuthStateChange((_, sess) =>
      setUser(sess?.user || null)
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

  const signUp = (email, password, role = "guest") =>
    supabase.auth.signUp({
      email,
      password,
      options: { data: { role } },
    });

  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}