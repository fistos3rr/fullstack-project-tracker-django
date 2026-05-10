import { ProjectList } from './components/Projects/ProjectList'
import { Button } from './components/ui/Button'
import Header from './components/Common/Header'
import MainContent from './components/Common/MainContent'

function App() {
  return (
    <>
    <div className='flex flex-col min-h-screen'>
      <Header
        logoSrc='/logo.jpg'
      />
      <MainContent>
        <Button size='xs' variant='gradient'>New Project</Button>
        <ProjectList />
      </MainContent>
    </div>
    </>
  );
};

export default App
