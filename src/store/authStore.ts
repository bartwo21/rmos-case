import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
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
      isLoading: false,
      setToken: (token) => {
        setCookie(token);
        set({ token });
      },
      logout: () => {
        set({ isLoading: true });
        removeCookie();
        set({ token: null });
        set({ isLoading: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
