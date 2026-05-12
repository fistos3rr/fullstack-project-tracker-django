import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ROUTES } from '../config/routes';
import { MainLayout } from '../components/MainLayout';
import { Loading } from '../components/ui/Loading';


const ProjectListPage = lazy(() => import('../components/Pages/ProjectListPage'));
const ProjectPage = lazy(() => import('../components/Pages/ProjectPage'));
const ProjectCreatePage = lazy(() => import('../components/Pages/ProjectCreatePage')) 


const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType<any>>) => (
  <Suspense fallback={<Loading/>}>
    <Component />
  </Suspense>
)

const protectedLoader = () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    return redirect(ROUTES.LOGIN);
  }
  return null;
};

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Navigate to={ROUTES.HOME}/> },
      { path: ROUTES.PROJECTS, element: withSuspense(ProjectListPage) },
      { path: ROUTES.PROJECT_DETAIL(), element: withSuspense(ProjectPage) },
      { 
        path: ROUTES.PROJECT_CREATE, 
        element: withSuspense(ProjectCreatePage),
        loader: protectedLoader,
      },
    ]
  }
])
