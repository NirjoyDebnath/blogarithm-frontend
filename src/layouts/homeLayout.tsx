import { Outlet } from 'react-router-dom'
import Header from "../components/Header/header";
import Footer from '../components/Footer/footer';

const HomeLayout = () => {
  
  return (<>
    <div className="flex flex-col justify-between gap-0 items-stretch min-h-screen">
        <Header />
        <Outlet />
        <Footer />
      </div>
  </>)
};

export default HomeLayout;
