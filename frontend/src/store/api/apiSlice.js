import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['User', 'Waste', 'Carbon', 'Community', 'SharedItem'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    
    // Waste management endpoints
    getWasteItems: builder.query({
      query: () => '/waste',
      providesTags: ['Waste'],
    }),
    addWasteItem: builder.mutation({
      query: (wasteData) => ({
        url: '/waste',
        method: 'POST',
        body: wasteData,
      }),
      invalidatesTags: ['Waste'],
    }),
    updateWasteItem: builder.mutation({
      query: ({ id, ...wasteData }) => ({
        url: `/waste/${id}`,
        method: 'PUT',
        body: wasteData,
      }),
      invalidatesTags: ['Waste'],
    }),
    deleteWasteItem: builder.mutation({
      query: (id) => ({
        url: `/waste/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Waste'],
    }),
    
    // Carbon tracking endpoints
    getCarbonActivities: builder.query({
      query: () => '/carbon',
      providesTags: ['Carbon'],
    }),
    addCarbonActivity: builder.mutation({
      query: (carbonData) => ({
        url: '/carbon',
        method: 'POST',
        body: carbonData,
      }),
      invalidatesTags: ['Carbon'],
    }),
    
    // Community endpoints
    getCommunityIssues: builder.query({
      query: () => '/community',
      providesTags: ['Community'],
    }),
    createCommunityIssue: builder.mutation({
      query: (issueData) => ({
        url: '/community',
        method: 'POST',
        body: issueData,
      }),
      invalidatesTags: ['Community'],
    }),
    
    // Sharing endpoints
    getSharedItems: builder.query({
      query: () => '/sharing',
      providesTags: ['SharedItem'],
    }),
    createSharedItem: builder.mutation({
      query: (itemData) => ({
        url: '/sharing',
        method: 'POST',
        body: itemData,
      }),
      invalidatesTags: ['SharedItem'],
    }),
    
    // Analytics endpoints
    getAnalytics: builder.query({
      query: () => '/analytics',
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetWasteItemsQuery,
  useAddWasteItemMutation,
  useUpdateWasteItemMutation,
  useDeleteWasteItemMutation,
  useGetCarbonActivitiesQuery,
  useAddCarbonActivityMutation,
  useGetCommunityIssuesQuery,
  useCreateCommunityIssueMutation,
  useGetSharedItemsQuery,
  useCreateSharedItemMutation,
  useGetAnalyticsQuery,
} = apiSlice