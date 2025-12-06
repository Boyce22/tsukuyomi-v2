# Tarefas Pendentes – Projeto Mangás

## Funcionalidades Principais

### 1. Armazenar os mangás
- [ ] **Definir modelo de dados**  
  - Estruturar tabela ou coleção: título, autor, gênero, capítulos, capa, data de lançamento.  
- [ ] **Criar serviço de persistência**  
  - Funções para criar, atualizar e consultar mangás.  
- [ ] **Validação e sanitização**  
  - Garantir que dados obrigatórios estejam presentes.  
  - Normalizar strings (trimming, capitalização).  
- [ ] **Testes unitários**  
  - Testar criação, leitura, atualização e remoção (CRUD).

### 2. Paginação dos mangás
- [x] **Definir parâmetros**  
  - Página, limite de itens por página, ordenação (ex: por data ou título).  
- [x] **Implementar API paginada**  
  - Endpoint `/mangas?page=1&limit=20`.  
- [x] **Testar limites e bordas**  
  - Páginas vazias, último registro, paginação com menos de `limit` itens.

### 3. Upload das imagens
- [ ] **Configurar armazenamento**  
  - Local (`/uploads`) ou cloud (S3, GCP, etc.).  
- [ ] **Validar tipos de arquivo**  
  - Permitidos: `.jpg`, `.png`, `.webp`.  
  - Limitar tamanho máximo (ex: 5MB por imagem).  
- [ ] **Gerar nomes únicos**  
  - UUID + timestamp para evitar sobrescrita.  
- [ ] **Criar API para upload**  
  - Endpoint protegido: `/mangas/:id/upload-capa`.  
- [ ] **Testes**  
  - Upload de arquivo grande, inválido e correto.

### 4. Adsense
- [ ] **Criar conta/ID do Adsense**  
  - Configurar para a aplicação.  
- [ ] **Integrar anúncios no front-end**  
  - Decidir posições estratégicas: header, entre capítulos, sidebar.  
- [ ] **Testar exibição e responsividade**  
  - Mobile e desktop.

### 5. Comentar
- [x] **Modelar comentários**  
  - Campos: usuário, mangá, capítulo (opcional), mensagem, data.  
- [x] **Criar CRUD de comentários**  
  - Endpoints para criar, listar e deletar comentários.  
- [ ] **Validação e moderação**  
  - Limite de caracteres, palavras proibidas.  
- [ ] **Front-end**  
  - Área de comentários visível no mangá/capítulo.  

---

## MVP2

### 1. Notas
- [ ] **Adicionar sistema de notas**  
  - Permitir que usuários avaliem mangás (ex: 1 a 5 estrelas).  
- [ ] **Calcular média**  
  - Exibir nota média para cada mangá.  
- [ ] **Validar votos únicos por usuário**  
  - Cada usuário só pode avaliar uma vez por mangá.  
- [ ] **Testes**  
  - Inserção de notas, atualização e cálculo correto da média.


// adicionar opção de deletar os comentários