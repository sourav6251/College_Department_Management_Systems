import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    user: Record<string, any> | null;
    role: string | null;
    isAuthenticated: boolean;
    token: string | null;
    departmentid:String|null;
    department:String|null;
    login: (user: Record<string, any>, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            role: null,
            isAuthenticated: false,
            token: null,
            departmentid:null,
            department:null,
            login: (user, token) =>
                set({
                    user,
                    role: user.role,
                    isAuthenticated: true,
                    token: token,
                    departmentid:user.departmentId,
                    department:user.department
                }),
            logout: () =>
                set({
                    user: null,
                    isAuthenticated: false,
                    role: null,
                    departmentid:null
                }),
        }),
        {
            name: "auth-storage",
        }
    )
);
