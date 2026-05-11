import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ROUTES } from '../config/routes';
import { MainLayout } from '../components/MainLayout';
import { Loading } from '../components/ui/Loading';


const ProjectsPage = lazy(() => import('../components/Pages/ProjectsPage'));


const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType<any>>) => (
  <Suspense fallback={<Loading/>}>
    <Component />
  </Suspense>
)


export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: ROUTES.PROJECTS, element: withSuspense(ProjectsPage) },
    ]
  }
])
