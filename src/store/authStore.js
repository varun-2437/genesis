import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: {
    id: 'usr_mock_1',
    name: 'Varun M',
    email: 'varun@genesis.edu',
    role: 'student', // 'student' | 'tpo' | 'recruiter' | 'faculty' | 'management' | 'alumni' | 'admin'
    permissions: ['*'],
  },
  token: 'mock_jwt_token',
  isAuthenticated: true,
  setUser: (user) => set({ user, isAuthenticated: Boolean(user) }),
  setRole: (role) => set((state) => ({ user: { ...state.user, role } })),
  logout: () => {
    localStorage.removeItem('genesis_auth_token')
    set({ user: null, token: null, isAuthenticated: false })
  },
}))
