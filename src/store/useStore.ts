// src/store/useStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Project } from '../types';

interface StoreState {
  currentProject: Project | null;
  projects: Project[];
  isLoading: boolean;
  error: Error | null;
}

interface StoreActions {
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
  updateProjectFiles: (projectId: string, files: { [path: string]: string }) => void;
  setError: (error: Error | null) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
}

type Store = StoreState & StoreActions;

const initialState: StoreState = {
  currentProject: null,
  projects: [],
  isLoading: false,
  error: null,
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      ...initialState,

      setCurrentProject: (project) => 
        set({ currentProject: project }),

      addProject: (project) =>
        set((state) => ({ 
          projects: [...state.projects, project],
          currentProject: project 
        })),

      updateProject: (projectId, updates) =>
        set((state) => ({
          projects: state.projects.map((p) => 
            p.id === projectId ? { ...p, ...updates } : p
          ),
          currentProject: state.currentProject?.id === projectId 
            ? { ...state.currentProject, ...updates }
            : state.currentProject
        })),

      deleteProject: (projectId) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== projectId),
          currentProject: state.currentProject?.id === projectId 
            ? null 
            : state.currentProject
        })),

      updateProjectFiles: (projectId, files) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId 
              ? { ...p, files: { ...p.files, ...files } }
              : p
          )
        })),

      setError: (error) => set({ error }),
      setLoading: (isLoading) => set({ isLoading }),
      reset: () => set(initialState)
    }),
    {
      name: 'gendev-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        projects: state.projects,
        currentProject: state.currentProject,
      }),
    }
  )
);

export type { Store };