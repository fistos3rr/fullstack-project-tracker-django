import { ProjectList } from './components/ProjectList'
import { Button } from './components/ui/Button'
import Header from './components/Common/Header'

function App() {
  return (
    <>
      <Header
        logoSrc='/logo.jpg'
      />
      <main className="pt-20">
        <ProjectList />
        <Button size='xs' variant='gradient'>New project</Button>
      </main>
    </>
  )
}

export default App
