import { ToastContainer } from "react-toastify"
import BookList from "./components/BookList.tsx"
import Footer from "./components/Footer.tsx"
import Header from "./components/Header"

const App = () => {

  return (
    <>
      <section className="flex flex-col justify-center items-center w-full">
        <Header />
        <main className="container mx-auto relative top-[50px]">
          <ToastContainer autoClose={3000} />
          <BookList />
          <Footer />
        </main>
      </section>
    </>
  )
}

export default App
