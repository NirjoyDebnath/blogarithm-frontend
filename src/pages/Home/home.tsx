import Header from "../../components/Header/header";
import { getUserName } from "../../helpers/jwtHelper";

const Home = () => {
  const userName = getUserName();
  console.log("Home", userName);
  return (
    <>
      <Header />
      <div className="flex-grow">home</div>
    </>
  );
};

export default Home;
