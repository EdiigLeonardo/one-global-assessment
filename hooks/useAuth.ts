"use client";

export function useAuth() {
  const isAuthenticated =
    typeof document !== "undefined" &&
    document.cookie.includes("session_token=");

  function logout() {
    document.cookie = "session_token=; Max-Age=0; path=/";
    window.location.href = "/login";
  }

  return { isAuthenticated, logout };
}
