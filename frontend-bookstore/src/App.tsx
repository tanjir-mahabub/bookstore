import BookList from "./components/BookList"

const App = () => {

  return (
    <>
      <div>
        <h1 className="text-red-800 text-3xl">
          BookStore App
        </h1>

        <div>
          <BookList />
        </div>
      </div>
    </>
  )
}

export default App
