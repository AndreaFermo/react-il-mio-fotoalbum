import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const DefaultLayout = () => {
  return (
    <>
      <Header></Header>

      <main className=" min-h-[75vh]">
        <Outlet></Outlet>
      </main>

      <Footer></Footer>
    </>
  );
};

export default DefaultLayout;
