

export default function Filters() {
  return (
    <section className="text-white p-4 max-w-7xl mx-auto">
      <div className="bg-violet-950/20 p-6 border-2 border-white rounded-2xl">        
        <input 
          type="text" 
          className="w-full py-3 px-4 rounded-lg bg-transparent border border-white/30 text-white placeholder-gray-400 mb-4 focus:border-blue-400 focus:outline-none" 
          placeholder="Search..."
        />
        <div className="flex space-x-3 justify-start flex-wrap gap-y-3">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium">Todos</button>
          <button className="bg-gray-100 border-gray-300 text-gray-700 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-200">Desarrollo</button>
          <button className="bg-gray-100 border-gray-300 text-gray-700 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-200">Diseño</button>
          <button className="bg-gray-100 border-gray-300 text-gray-700 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-200">Marketing</button>
          <button className="bg-gray-100 border-gray-300 text-gray-700 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-200">Herramientas</button>
          <button className="bg-gray-100 border-gray-300 text-gray-700 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-200">Educación</button>
          <button className="bg-gray-100 border-gray-300 text-gray-700 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-200">+ Más</button>
        </div>
      </div>
    </section>
  );
}
