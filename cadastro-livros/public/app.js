const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/cadastro-livros', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definir o esquema e modelo do livro
const livroSchema = new mongoose.Schema({
  title: String,
  author: String
});

const Livro = mongoose.model('Livro', livroSchema);

// Rota para criar um novo livro com validação
app.post('/books', async (req, res) => {
  const { title, author } = req.body;
  
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  try {
    const novoLivro = new Livro({ title, author });
    const resultado = await novoLivro.save();
    res.status(201).json(resultado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para o frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
db.livros.find().pretty()
