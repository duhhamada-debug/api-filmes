# API Fullstack de Catálogo de Filmes

API REST em Flask com interface web para gerenciamento de um catálogo de filmes em memória, desenvolvida com o auxílio do OpenCode e padronizada via `AGENTS.md` e Skill personalizada.

## Funcionalidades
- CRUD completo de filmes (Criar, Listar, Buscar, Editar, Excluir)
- Validações de campos obrigatórios, nota (0-10) e formato de ano
- Adição dinâmica de campos via Skill (`.opencode/command/campo-novo.md`)
- Interface Web integrada (HTML/CSS/JS) servida pelo próprio Flask
- Painel indicador de estatísticas (Total de filmes e Média de notas)

## Endpoints REST
| Método | Rota | Descrição | Status HTTP |
|---|---|---|---|
| GET | `/filmes` | Lista todos os filmes | 200 |
| GET | `/filmes/<id>` | Busca um filme por ID | 200 / 404 |
| POST | `/filmes` | Cadastra um novo filme | 201 / 400 |
| PUT | `/filmes/<id>` | Atualiza um filme | 200 / 400 / 404 |
| DELETE | `/filmes/<id>` | Remove um filme | 200 / 204 / 404 |

## Como Rodar Localmente
```bash
# Criar e ativar o ambiente virtual
py -m venv .venv
.venv\Scripts\activate

# Instalar dependências
pip install flask flask-cors

# Executar a aplicação
python app.py

Uso da IA e Agentes
Este projeto foi gerado utilizando o OpenCode com orientações do arquivo AGENTS.md para garantir padronização REST e tratamento rigoroso de exceções. Também foi criada a Skill /campo-novo em .opencode/command/campo-novo.md para incluir novos campos no backend e frontend simultaneamente.