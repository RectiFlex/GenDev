import { useNavigate } from 'react-router-dom';

export const ROUTES = {
  PROJECTS: '/dashboard/projects',
  DOCUMENTATION: '/documentation',
  SUPPORT: '/support',
  GITHUB: 'https://github.com/your-org/your-repo',
  HELP: '/help',
} as const;

export function useNavigation() {
  const navigate = useNavigate();

  const goToProjects = () => navigate(ROUTES.PROJECTS);
  const goToDocumentation = () => window.open(ROUTES.DOCUMENTATION, '_blank');
  const goToSupport = () => window.open(ROUTES.SUPPORT, '_blank');
  const goToGitHub = () => window.open(ROUTES.GITHUB, '_blank');
  const goToHelp = () => window.open(ROUTES.HELP, '_blank');

  return {
    goToProjects,
    goToDocumentation,
    goToSupport,
    goToGitHub,
    goToHelp,
  };
}