const form = document.getElementById('form-filme');
const corpoTabela = document.getElementById('corpo-tabela');
const semDados = document.getElementById('sem-dados');
const mensagemErro = document.getElementById('mensagem-erro');
const mensagemSucesso = document.getElementById('mensagem-sucesso');
const btnSalvar = document.getElementById('btn-salvar');
const btnCancelar = document.getElementById('btn-cancelar');
const filmeIdHidden = document.getElementById('filme-id');
const painelResumo = document.getElementById('painel-resumo');
const totalFilmes = document.getElementById('total-filmes');
const mediaNotas = document.getElementById('media-notas');

function mostrarErro(msg) {
  mensagemErro.textContent = msg;
  mensagemErro.style.display = 'block';
  mensagemSucesso.style.display = 'none';
  setTimeout(function() {
    mensagemErro.style.display = 'none';
  }, 5000);
}

function mostrarSucesso(msg) {
  mensagemSucesso.textContent = msg;
  mensagemSucesso.style.display = 'block';
  mensagemErro.style.display = 'none';
  setTimeout(function() {
    mensagemSucesso.style.display = 'none';
  }, 3000);
}

function esconderMensagens() {
  mensagemErro.style.display = 'none';
  mensagemSucesso.style.display = 'none';
}

function atualizarPainel(filmes) {
  if (filmes.length === 0) {
    painelResumo.style.display = 'none';
    return;
  }
  painelResumo.style.display = 'flex';
  totalFilmes.textContent = filmes.length;
  var soma = filmes.reduce(function(acc, f) { return acc + f.nota; }, 0);
  var media = (soma / filmes.length).toFixed(2);
  mediaNotas.textContent = media;
}

function carregarFilmes() {
  fetch('/filmes')
    .then(function(response) {
      if (!response.ok) {
        return response.json().then(function(data) {
          throw new Error(data.erro || 'Erro ao carregar filmes');
        });
      }
      return response.json();
    })
    .then(function(filmes) {
      corpoTabela.innerHTML = '';
      if (filmes.length === 0) {
        semDados.style.display = 'block';
      } else {
        semDados.style.display = 'none';
        filmes.forEach(function(filme) {
          var row = document.createElement('tr');
          row.innerHTML =
            '<td>' + filme.id + '</td>' +
            '<td>' + escapeHtml(filme.titulo) + '</td>' +
            '<td>' + escapeHtml(filme.genero) + '</td>' +
            '<td>' + filme.ano + '</td>' +
            '<td>' + filme.nota + '</td>' +
            '<td>' + escapeHtml(filme.diretor) + '</td>' +
            '<td class="acoes-cell">' +
              '<button class="btn-editar" onclick="editarFilme(' + filme.id + ')">Editar</button>' +
              '<button class="btn-excluir" onclick="excluirFilme(' + filme.id + ')">Excluir</button>' +
            '</td>';
          corpoTabela.appendChild(row);
        });
      }
      atualizarPainel(filmes);
    })
    .catch(function(err) {
      mostrarErro(err.message);
    });
}

function escapeHtml(text) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

function editarFilme(id) {
  fetch('/filmes/' + id)
    .then(function(response) {
      if (!response.ok) {
        return response.json().then(function(data) {
          throw new Error(data.erro || 'Erro ao buscar filme');
        });
      }
      return response.json();
    })
    .then(function(filme) {
filmeIdHidden.value = filme.id;
       document.getElementById('titulo').value = filme.titulo;
       document.getElementById('genero').value = filme.genero;
       document.getElementById('ano').value = filme.ano;
       document.getElementById('nota').value = filme.nota;
       document.getElementById('diretor').value = filme.diretor;
      btnSalvar.textContent = 'Atualizar';
      btnCancelar.style.display = 'inline-block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
    .catch(function(err) {
      mostrarErro(err.message);
    });
}

function excluirFilme(id) {
  if (!confirm('Tem certeza que deseja excluir este filme?')) {
    return;
  }
  fetch('/filmes/' + id, { method: 'DELETE' })
    .then(function(response) {
      if (!response.ok) {
        return response.json().then(function(data) {
          throw new Error(data.erro || 'Erro ao excluir filme');
        });
      }
      mostrarSucesso('Filme excluído com sucesso.');
      carregarFilmes();
    })
    .catch(function(err) {
      mostrarErro(err.message);
    });
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  esconderMensagens();

  var id = filmeIdHidden.value;
  var dados = {
    titulo: document.getElementById('titulo').value.trim(),
    genero: document.getElementById('genero').value.trim(),
    ano: parseInt(document.getElementById('ano').value, 10),
    nota: parseFloat(document.getElementById('nota').value),
    diretor: document.getElementById('diretor').value.trim()
  };

  var url = '/filmes';
  var method = 'POST';

  if (id) {
    url = '/filmes/' + id;
    method = 'PUT';
  }

  fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
    .then(function(response) {
      return response.json().then(function(data) {
        if (!response.ok) {
          throw new Error(data.erro || 'Erro ao salvar filme');
        }
        return data;
      });
    })
    .then(function(data) {
      mostrarSucesso(id ? 'Filme atualizado com sucesso.' : 'Filme cadastrado com sucesso.');
      form.reset();
      filmeIdHidden.value = '';
      btnSalvar.textContent = 'Cadastrar';
      btnCancelar.style.display = 'none';
      carregarFilmes();
    })
    .catch(function(err) {
      mostrarErro(err.message);
    });
});

btnCancelar.addEventListener('click', function() {
  form.reset();
  filmeIdHidden.value = '';
  btnSalvar.textContent = 'Cadastrar';
  btnCancelar.style.display = 'none';
  esconderMensagens();
});

carregarFilmes();