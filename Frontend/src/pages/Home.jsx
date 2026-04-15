import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

const Home = () => {
  const { currentUser } = useSelector((state) => state.users);
  return (
    <>
      <Navbar currentUser={currentUser} />
    </>
  );
};

export default Home;
