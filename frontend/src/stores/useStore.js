import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Main app store using Zustand
const useStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      isAuthenticated: false,
      ecoPoints: 0,
      carbonScore: 0,
      trustScore: 0,

      // Dashboard stats
      stats: {
        totalEcoPoints: 0,
        carbonSaved: 0,
        issuesResolved: 0,
        itemsShared: 0,
        wasteRecycled: 0,
      },

      // Waste management
      wasteItems: [],
      recyclers: [],
      transactions: [],

      // Carbon tracking
      activities: [],
      carbonGoals: {},
      monthlyTrends: [],

      // Community issues
      communityIssues: [],
      userIssues: [],
      nearbyIssues: [],

      // Sharing economy
      sharedItems: [],
      borrowRequests: [],
      lentItems: [],

      // Notifications
      notifications: [],
      unreadCount: 0,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
      
      updateStats: (newStats) => set((state) => ({
        stats: { ...state.stats, ...newStats }
      })),

      addWasteItem: (item) => set((state) => ({
        wasteItems: [...state.wasteItems, { ...item, id: Date.now() }]
      })),

      addActivity: (activity) => set((state) => ({
        activities: [...state.activities, { ...activity, id: Date.now() }]
      })),

      addCommunityIssue: (issue) => set((state) => ({
        communityIssues: [...state.communityIssues, { ...issue, id: Date.now() }],
        userIssues: [...state.userIssues, { ...issue, id: Date.now() }]
      })),

      addSharedItem: (item) => set((state) => ({
        sharedItems: [...state.sharedItems, { ...item, id: Date.now() }]
      })),

      addNotification: (notification) => set((state) => ({
        notifications: [...state.notifications, { ...notification, id: Date.now() }],
        unreadCount: state.unreadCount + 1
      })),

      markNotificationsRead: () => set({ unreadCount: 0 }),

      // Initialize with sample data
      initializeSampleData: () => {
        set({
          stats: {
            totalEcoPoints: 1250,
            carbonSaved: 45.8,
            issuesResolved: 12,
            itemsShared: 8,
            wasteRecycled: 25.5,
          },
          ecoPoints: 1250,
          carbonScore: 45.8,
          trustScore: 4.7,
        });
      },
    }),
    {
      name: 'ecofy-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        stats: state.stats,
        ecoPoints: state.ecoPoints,
        carbonScore: state.carbonScore,
        trustScore: state.trustScore,
      }),
    }
  )
);

export default useStore;
