import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Session } from "@supabase/supabase-js";

import { supabase } from "@/src/lib/supabase";

type AuthData = {
  session: Session | null;
  profile: any;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  profile: null,
  isAdmin: false,
});

export default function AuthProvider({children}: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        // fetch profile
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data || null);
      }

      setLoading(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [])

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <AuthContext.Provider value={{ session, profile, isAdmin: profile?.group === 'ADMIN' }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);