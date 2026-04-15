import { useSelector } from "react-redux";
import AllQuiz from "../components/AllQuiz";

const Home = () => {
  const { currentUser } = useSelector((state) => state.users);
  return (
    <>
      <AllQuiz/>
    </>
  );
};

export default Home;
