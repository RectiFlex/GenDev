import { create } from 'zustand';
import { Project } from '../types';

interface AppState {
  currentProject: Project | null;
  projects: Project[];
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProjectFiles: (projectId: string, files: { [path: string]: string }) => void;
  deleteProject: (projectId: string) => void;
}

export const useStore = create<AppState>((set) => ({
  currentProject: null,
  projects: [],
  setCurrentProject: (project) => set({ currentProject: project }),
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  updateProjectFiles: (projectId, files) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId ? { ...p, files: { ...p.files, ...files } } : p
      ),
    })),
  deleteProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== projectId),
      currentProject: state.currentProject?.id === projectId ? null : state.currentProject,
    })),
}));