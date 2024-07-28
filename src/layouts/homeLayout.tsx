import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/footer";

const HomeLayout = () => {
  console.log("layout");

  return (
    <>
      <div className="flex flex-col gap-0 items-stretch min-h-screen">
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default HomeLayout;
