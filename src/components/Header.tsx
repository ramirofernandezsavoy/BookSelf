export default function Header() {
  return (
    <header className="text-white p-4 w-full wrapper">
      <div className="mx-auto flex gap-4">
        <h1 className="text-2xl font-bold bg-violet-950/20 p-6 border-2 border-white rounded-2xl flex-grow">HubbaRama</h1>
        <nav className="bg-violet-950/20 p-6 border-2 border-white rounded-2xl">
          <ul className="flex space-x-4">
            <li>
              <a href="#section1" className="text-white hover:underline">
                Usuario
              </a>
            </li>
            <li>
              <a href="#section2" className="text-white hover:underline">
                Configuracion
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
