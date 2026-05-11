import { Outlet } from "react-router-dom";
import Header from "./Common/Header";
import MainContent from "./Common/MainContent";


export const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header
        logoSrc='/logo.jpg'
      />
      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  )
}
