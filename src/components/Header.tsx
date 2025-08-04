

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 w-full">
      <h1 className="text-2xl font-bold">My App</h1>
      <nav>
        <ul>
          <li><a href="#section1" className="text-white hover:underline">Section 1</a></li>
          <li><a href="#section2" className="text-white hover:underline">Section 2</a></li>
          <li><a href="#section3" className="text-white hover:underline">Section 3</a></li>
        </ul>
      </nav>
    </header>
  )
}
