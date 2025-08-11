import "./App.css";
import { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import useStore from "./stores/useStore";
import Filters from "./components/Filters";
import ResourceCard from "./components/ResourceCard";

function App() {
  const { user, signOut } = useAuth();
  const { addResource, resources, loading, fetchResources, updateResource } = useStore();

  const [linkData, setLinkData] = useState({
    title: "",
    description: "",
    url: "",
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<any>(null);

  // Cargar links al montar el componente
  useEffect(() => {
    if (user) {
      fetchResources();
    }
  }, [user, fetchResources]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const openModal = () => {
    setEditingResource(null);
    setIsModalOpen(true);
  };

  const openEditModal = (resource: any) => {
    setEditingResource(resource);
    // Precargar datos del recurso
    const processTags = (tags: any): string[] => {
      if (!tags) return [];
      if (Array.isArray(tags)) return tags;
      if (typeof tags === 'string') {
        try {
          const parsed = JSON.parse(tags);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        }
      }
      return [];
    };

    setLinkData({
      title: resource.title || "",
      description: resource.description || "",
      url: resource.url || "",
      tags: processTags(resource.tags)
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingResource(null);
    // Limpiar formulario al cerrar
    setLinkData({
      title: "",
      description: "",
      url: "",
      tags: []
    });
    setNewTag("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!linkData.title.trim()) {
      setMessage("El título es requerido");
      return;
    }

    if (!linkData.url.trim()) {
      setMessage("La URL es requerida");
      return;
    }

    // Validar URL básica
    try {
      new URL(linkData.url);
    } catch {
      setMessage("Por favor ingresa una URL válida");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      if (editingResource) {
        // Actualizar recurso existente
        await updateResource(editingResource.id, {
          title: linkData.title,
          description: linkData.description,
          url: linkData.url,
          tags: linkData.tags,
        });
        setMessage("✅ Link actualizado exitosamente!");
      } else {
        // Crear nuevo recurso
        await addResource({
          title: linkData.title,
          description: linkData.description,
          url: linkData.url,
          tags: linkData.tags,
        });
        setMessage("✅ Link guardado exitosamente!");
      }
      
      // Recargar la lista
      await fetchResources();
      
      // Cerrar modal y limpiar formulario
      setTimeout(() => {
        closeModal();
      }, 1500); // Esperar un poco para que el usuario vea el mensaje
    } catch (error: any) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !linkData.tags.includes(newTag.trim())) {
      setLinkData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setLinkData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Background animado con esferas - usando variables CSS para adaptarse al tema */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Esfera 1 - Violeta */}
        <div 
          className="absolute w-96 h-96 rounded-full blur-xl transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, var(--sphere-1) 0%, transparent 70%)`,
            top: '20%',
            left: '10%',
            animation: 'float-1 20s ease-in-out infinite'
          }}
        />
        
        {/* Esfera 2 - Azul */}
        <div 
          className="absolute w-80 h-80 rounded-full blur-xl transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, var(--sphere-2) 0%, transparent 70%)`,
            top: '40%',
            right: '20%',
            animation: 'float-2 25s ease-in-out infinite reverse'
          }}
        />
        
        {/* Esfera 3 - Rosa */}
        <div 
          className="absolute w-72 h-72 rounded-full blur-xl transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, var(--sphere-3) 0%, transparent 70%)`,
            bottom: '20%',
            left: '50%',
            animation: 'float-3 30s ease-in-out infinite'
          }}
        />
      </div>

      {/* Contenido principal con z-index más alto */}
      <div className="relative z-10">
        {/* Header de usuario autenticado */}
        <div className="p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 
              className="text-4xl font-bold transition-colors duration-300"
              style={{ color: 'var(--text-primary)' }}
            >
              BookSelf
            </h1>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleSignOut}
                className="p-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm cursor-pointer"
              >
                Cerrar Sesión
              </button>
              <span 
                className="font-medium text-sm transition-colors duration-300"
                style={{ color: 'var(--text-secondary)' }}
              >
                {user?.email}
              </span>
            </div>
          </div>
        </div>

        {/* Filtros y tags en la parte superior */}
        <div className="max-w-7xl mx-auto p-4">
          <Filters />
        </div>

        {/* Lista de recursos */}
        <section className="max-w-7xl mx-auto px-4 pb-6">
          <div className="p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 
                className="font-medium transition-colors duration-300"
                style={{ color: 'var(--text-primary)' }}
              >
                Mis Elementos ({resources.length})
              </h2>
              <button
                onClick={openModal}
                className="px-4 py-2 text-sm rounded-lg transition-all font-medium backdrop-blur-sm"
                style={{
                  backgroundColor: 'var(--button-bg)',
                  color: 'var(--button-text)',
                  border: '1px solid var(--border-primary)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--button-hover-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--button-bg)';
                }}
              >
                Nuevo +
              </button>
            </div>         
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400 mx-auto mb-4"></div>
                <p className="text-gray-400">Cargando...</p>
              </div>
            ) : resources.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>Aún no tenés elementos guardados.</p>
                <p className="text-sm">¡Haz clic en "Nuevo" para empezar!</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resources.map((resource) => (
                  <ResourceCard 
                    key={resource.id}
                    resource={resource}
                    onEdit={openEditModal}
                  />
                ))}
              </div>
            )}
          </div>
        </section>      
        
        {/* Modal para agregar links */}
        {isModalOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <div 
              className="bg-black/60 backdrop-blur-xl border border-cyan-400/30 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5">
                {/* Header del modal */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-white">
                    {editingResource ? 'Editar Link' : 'Agregar Nuevo Link'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-cyan-200 transition-colors p-1 hover:bg-cyan-500/10 rounded-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-xs font-medium mb-1">
                        Título <span className="text-rose-300">*</span>
                      </label>
                      <input
                        type="text"
                        value={linkData.title}
                        onChange={(e) => setLinkData({...linkData, title: e.target.value})}
                        className="w-full p-2 text-sm bg-black/20 backdrop-blur-sm border border-cyan-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/40 focus:bg-black/30 transition-all"
                        placeholder="Nombre del link"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-white text-xs font-medium mb-1">
                        URL <span className="text-rose-300">*</span>
                      </label>
                      <input
                        type="url"
                        value={linkData.url}
                        onChange={(e) => setLinkData({...linkData, url: e.target.value})}
                        className="w-full p-2 text-sm bg-black/20 backdrop-blur-sm border border-cyan-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/40 focus:bg-black/30 transition-all"
                        placeholder="https://ejemplo.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-xs font-medium mb-1">
                      Descripción
                    </label>
                    <textarea
                      value={linkData.description}
                      onChange={(e) => setLinkData({...linkData, description: e.target.value})}
                      className="w-full p-2 text-sm bg-black/20 backdrop-blur-sm border border-cyan-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/40 focus:bg-black/30 transition-all"
                      placeholder="Breve descripción del elemento"
                      rows={2}
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-white text-xs font-medium mb-1">
                      Tags
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        className="flex-1 p-2 text-sm bg-black/20 backdrop-blur-sm border border-cyan-400/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/40 focus:bg-black/30 transition-all"
                        placeholder="Agregar tag"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-3 py-2 text-sm bg-cyan-600/50 backdrop-blur-sm border border-cyan-400/30 text-white rounded-lg hover:bg-cyan-500/60 hover:border-cyan-400/45 transition-all"
                      >
                        +
                      </button>
                    </div>
                    
                    {/* Lista de tags */}
                    {linkData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {linkData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-cyan-600/35 backdrop-blur-sm border border-cyan-400/30 text-white text-xs rounded-full"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="text-cyan-200 hover:text-white"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mensaje de estado */}
                  {message && (
                    <div className={`p-3 text-sm rounded-lg backdrop-blur-sm border ${
                      message.includes('✅') 
                        ? 'bg-cyan-600/25 border-cyan-400/30 text-cyan-200' 
                        : 'bg-rose-600/20 border-rose-400/25 text-rose-200'
                    }`}>
                      {message}
                    </div>
                  )}

                  {/* Botones del modal */}
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 py-2 text-sm bg-gray-700/40 backdrop-blur-sm border border-gray-500/30 text-white rounded-lg hover:bg-gray-600/50 hover:border-gray-500/40 transition-all font-medium"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 py-2 text-sm bg-cyan-600/50 backdrop-blur-sm border border-cyan-400/30 text-white rounded-lg hover:bg-cyan-500/60 hover:border-cyan-400/45 transition-all disabled:opacity-50 font-medium"
                    >
                      {isLoading 
                        ? (editingResource ? 'Actualizando...' : 'Guardando...') 
                        : (editingResource ? 'Actualizar' : 'Guardar')
                      }
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
