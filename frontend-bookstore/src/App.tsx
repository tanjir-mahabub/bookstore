import BookList from "./components/BookList.tsx"
import Footer from "./components/Footer.tsx"
import Header from "./components/Header"

const App = () => {

  return (
    <>
      <section className="flex flex-col justify-center items-center w-full">
        <Header />
        <main className="container mx-auto">
          <BookList />
        </main>
        <Footer />
      </section>
    </>
  )
}

export default App
