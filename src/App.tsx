import './App.css'
import Header from './components/Header'

function App() {
  return (
    <div className="App bg-red-300">
      <Header />
      <main>
        <h2 className="text-xl font-bold">Welcome to My App</h2>
        <p className="mt-4">This is a simple app using React and Zustand.</p>
      </main>
    </div>
  )
}

export default App

