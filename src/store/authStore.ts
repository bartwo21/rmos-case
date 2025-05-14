import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

const setCookie = (token: string) => {
  Cookies.set("auth-storage-token", token, {
    expires: 7,
    path: "/",
    sameSite: "strict",
  });
};

const removeCookie = () => {
  Cookies.remove("auth-storage-token", { path: "/" });
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => {
        setCookie(token);
        set({ token });
      },
      logout: () => {
        removeCookie();
        set({ token: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
