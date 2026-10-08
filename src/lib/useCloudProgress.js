import { useEffect, useState } from 'react';
import { mergeCompleted, mergeDrafts } from './progress';
import { supabase } from './supabase';

// Håller koll på inloggningen och synkar framstegen med Supabase.
// status: 'loading' när kontot hämtas, 'saving' när något sparas,
// 'synced' när allt är sparat och 'error' om något gick fel.
export function useCloudProgress({
  completedIds,
  setCompletedIds,
  drafts,
  setDrafts,
}) {
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState('synced');
  // Vems framsteg som hämtats. Inget sparas förrän de hämtats, annars
  // kan tomma framsteg skriva över det som finns i kontot.
  const [loadedUserId, setLoadedUserId] = useState(null);
  const userId = session?.user.id ?? null;

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  // Hämta kontots framsteg och slå ihop dem med webbläsarens.
  useEffect(() => {
    if (!supabase || !userId) return;
    let ignore = false;
    supabase
      .from('progress')
      .select('completed_ids, drafts')
      .eq('user_id', userId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (ignore) return;
        if (error) {
          setStatus('error');
          return;
        }
        setCompletedIds(local => mergeCompleted(local, data?.completed_ids));
        setDrafts(local => mergeDrafts(local, data?.drafts));
        setLoadedUserId(userId);
        setStatus('synced');
      });
    return () => {
      ignore = true;
    };
  }, [userId, setCompletedIds, setDrafts]);

  // Spara en sekund efter senaste ändringen, så att inte varje
  // tangenttryckning skickas.
  useEffect(() => {
    if (!supabase || !userId || loadedUserId !== userId) return;
    const timer = setTimeout(async () => {
      setStatus('saving');
      const { error } = await supabase.from('progress').upsert({
        user_id: userId,
        completed_ids: completedIds,
        drafts,
        updated_at: new Date().toISOString(),
      });
      setStatus(error ? 'error' : 'synced');
    }, 1000);
    return () => clearTimeout(timer);
  }, [userId, loadedUserId, completedIds, drafts]);

  async function signIn(email) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + import.meta.env.BASE_URL,
      },
    });
    return error;
  }

  async function signOut() {
    await supabase.auth.signOut();
    setLoadedUserId(null);
  }

  // Inloggad men kontot är inte hämtat än.
  const isLoading = userId && loadedUserId !== userId && status !== 'error';

  return {
    isAvailable: Boolean(supabase),
    user: session?.user ?? null,
    status: isLoading ? 'loading' : status,
    signIn,
    signOut,
  };
}
