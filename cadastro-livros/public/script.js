document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('book-form');
    const message = document.getElementById('message');
    const bookList = document.getElementById('book-list');
  
    if (form) {
      form.addEventListener('submit', async function(event) {
        event.preventDefault();
  
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
  
        try {
          const response = await fetch('http://localhost:3001/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author })
          });
          
          if (response.ok) {
            message.textContent = 'Livro adicionado com sucesso!';
            form.reset();
          } else {
            message.textContent = 'Erro ao adicionar livro.';
          }
        } catch (error) {
          message.textContent = 'Erro ao se comunicar com o servidor.';
        }
      });
    }
  
    if (bookList) {
      const fetchBooks = async () => {
        try {
          const response = await fetch('http://localhost:3001/books');
          const data = await response.json();
          bookList.innerHTML = data.map(book => `
            <li>
              ${book.title} - ${book.author}
              <button class="delete-button" data-id="${book._id}">Excluir</button>
            </li>
          `).join('');
          
          // Adicionar eventos de clique para os botões de exclusão
          document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', async () => {
              const id = button.getAttribute('data-id');
              try {
                const response = await fetch(`http://localhost:3001/books/${id}`, {
                  method: 'DELETE'
                });
                
                if (response.ok) {
                  fetchBooks(); // Atualiza a lista de livros
                } else {
                  alert('Erro ao excluir livro.');
                }
              } catch (error) {
                alert('Erro ao se comunicar com o servidor.');
              }
            });
          });
        } catch (error) {
          bookList.innerHTML = '<li>Erro ao carregar livros.</li>';
        }
      };
  
      fetchBooks();
    }
  });
  