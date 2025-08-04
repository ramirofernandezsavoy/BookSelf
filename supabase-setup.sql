-- Crear tabla de recursos
CREATE TABLE resources (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT NOT NULL,
  tags TEXT[]
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Política para permitir SELECT a todos
CREATE POLICY "Allow public read" ON resources
  FOR SELECT TO public
  USING (true);

-- Política para permitir INSERT a todos (temporal - puedes restringir después)
CREATE POLICY "Allow public insert" ON resources
  FOR INSERT TO public
  WITH CHECK (true);
