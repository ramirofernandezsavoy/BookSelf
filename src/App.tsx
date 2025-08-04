import './App.css'
import Header from './components/Header'
import Filters from './components/Filters'
import Resources from './components/Resources'
import AddItem from './components/AddItem'

function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Filters />
        <div className="max-w-7xl mx-auto p-4">
          {/* Contenido principal */}
          <Resources />
        </div>
      </main>
      
      {/* Modal de AddItem */}
      <AddItem />
    </>
  )
}

export default App

