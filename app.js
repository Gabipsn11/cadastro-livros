const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

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

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Rota para criar um novo livro
app.post('/books', async (req, res) => {
    try {
      const novoLivro = new Livro({
        title: req.body.title,
        author: req.body.author
      });
      const resultado = await novoLivro.save();
      res.status(201).json(resultado);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
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
  app.get('/books', async (req, res) => {
    try {
      const livros = await Livro.find();
      res.json(livros);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  // Rota para deletar um livro
app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Livro.findByIdAndDelete(id);
    
    if (!resultado) {
      return res.status(404).json({ message: 'Livro não encontrado.' });
    }
    
    res.status(200).json({ message: 'Livro excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Importa o modelo Livro
const Livro = require('./models/livro');

// Rota para excluir um livro
app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Livro.findByIdAndDelete(id);
    
    if (!resultado) {
      return res.status(404).json({ message: 'Livro não encontrado.' });
    }
    
    res.status(200).json({ message: 'Livro excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

  