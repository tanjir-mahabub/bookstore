import BookList from "./components/BookList.tsx"
import Header from "./components/Header"

const App = () => {

  return (
    <>
      <section className="flex flex-col justify-center items-center">
        <Header />
        <BookList />
      </section>
    </>
  )
}

export default App
