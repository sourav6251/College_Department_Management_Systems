import { create } from 'zustand';

export type NotificationType = {
    id: string;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
};

export type DashboardStats = {
    totalVisits: number;
    totalRevenue: number;
    newUsers: number;
    conversionRate: number;
};

interface DashboardState {
    notifications: NotificationType[];
    stats: DashboardStats;
    isLoading: boolean;
    error: string | null;
    markNotificationAsRead: (id: string) => void;
    markAllNotificationsAsRead: () => void;
    fetchDashboardStats: () => Promise<void>;
}

const initialState = {
    notifications: [
        {
            id: '1',
            title: 'System Update',
            message: 'Dashboard V2 has been released',
            timestamp: new Date().toISOString(),
            read: false,
        },
        {
            id: '2',
            title: 'New User',
            message: 'John Doe joined the platform',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            read: false,
        },
        {
            id: '3',
            title: 'Revenue Milestone',
            message: 'Monthly revenue goal achieved',
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            read: true,
        },
    ],
    stats: {
        totalVisits: 14582,
        totalRevenue: 54689,
        newUsers: 189,
        conversionRate: 3.2,
    },
    isLoading: false,
    error: null,
};

export const useDashboardStore = create<DashboardState>((set, get) => ({
    ...initialState,
    markNotificationAsRead: (id: string) => {
        set((state) => ({
            notifications: state.notifications.map((notification) =>
                notification.id === id ? { ...notification, read: true } : notification
            ),
        }));
    },
    markAllNotificationsAsRead: () => {
        set((state) => ({
            notifications: state.notifications.map((notification) => ({
                ...notification,
                read: true,
            })),
        }));
    },
    fetchDashboardStats: async () => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            set({
                stats: {
                    totalVisits: 14582,
                    totalRevenue: 54689,
                    newUsers: 189,
                    conversionRate: 3.2,
                },
                isLoading: false,
            });
        } catch (error) {
            set({ error: 'Failed to fetch dashboard stats', isLoading: false });
        }
    },
})); 