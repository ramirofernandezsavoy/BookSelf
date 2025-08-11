# 🌟 Hubbarama - Resource Manager

Una aplicación moderna para gestionar y organizar tus recursos web con autenticación segura y un diseño cyberpunk elegante.

## ✨ Características

- 🔐 **Autenticación completa** con Supabase Auth
- 📝 **CRUD completo** - Crear, leer, editar y eliminar recursos
- 🔍 **Búsqueda y filtros** - Encuentra recursos por título, descripción o tags
- 🏷️ **Sistema de tags** - Organiza tus recursos con etiquetas coloridas
- 🎨 **Diseño cyberpunk** - Interfaz moderna con efectos glassmorphism
- ✨ **Animaciones fluidas** - Esferas flotantes y transiciones suaves
- 📱 **Responsive design** - Funciona perfectamente en todos los dispositivos

## 🚀 Deploy Rápido

### Opción 1: Vercel (Recomendado)
```bash
# 1. Fork este repositorio
# 2. Conecta con Vercel
# 3. Agrega las variables de entorno
# 4. Deploy automático!
```

### Opción 2: Netlify
```bash
# 1. npm run build
# 2. Sube la carpeta dist/
# 3. Configura las variables de entorno
```

## ⚙️ Setup Local

### Prerrequisitos
- Node.js 18+
- Cuenta en Supabase

### Instalación
```bash
# Clonar repositorio
git clone [tu-repo-url]
cd hubbarama

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales de Supabase

# Iniciar desarrollo
npm run dev
```

### Variables de Entorno Requeridas
```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

## 🗄️ Configuración de Base de Datos

### Estructura de la tabla `links`:
```sql
CREATE TABLE links (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security)
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own links" ON links
  FOR ALL USING (auth.uid() = user_id);
```

## 🛠️ Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción  
- `npm run preview` - Preview del build
- `npm run lint` - Linting con ESLint

## 🎨 Stack Tecnológico

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS 4 + Glassmorphism
- **Estado**: Zustand
- **Backend**: Supabase (Auth + Database)
- **Deploy**: Vercel/Netlify

## 📝 Uso

1. **Registro/Login** - Crea una cuenta o inicia sesión
2. **Agregar recursos** - Haz clic en "Add New Resource"
3. **Organizar** - Usa tags para categorizar tus recursos
4. **Buscar** - Filtra por texto o tags específicos
5. **Editar/Eliminar** - Gestiona tus recursos con los botones de acción

---

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
