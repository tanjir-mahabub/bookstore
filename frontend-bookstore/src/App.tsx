import { ToastContainer } from "react-toastify";
import React, { useState, useEffect } from "react";
import BookList from "./components/BookList.tsx";
import Footer from "./components/Footer.tsx";
import Header from "./components/Header";
import PageLoader from "./components/PageLoader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="flex flex-col justify-center items-center w-full">
        <Header />
        <main className="container mx-auto relative top-[50px]">
          <ToastContainer autoClose={3000} />
          {isLoading ? <PageLoader /> : <BookList />}
        </main>
        <Footer />
      </section>
    </>
  );
};

export default App;
