# API Fullstack de Catálogo de Filmes

API REST em Flask com interface web para gerenciamento de um catálogo de filmes em memória, desenvolvida com o auxílio do OpenCode e padronizada via `AGENTS.md` e Skill personalizada.

## Funcionalidades
- CRUD completo de filmes (Criar, Listar, Buscar, Editar, Excluir)
- Campos: título, gênero, ano, nota (0-10) e diretor
- Validações de campos obrigatórios, nota (0-10) e formato de ano (4 dígitos)
- Adição dinâmica de campos via Skill (`.opencode/command/campo-novo.md`) — usada para incluir o campo `diretor`
- Interface Web integrada (HTML/CSS/JS) servida pelo próprio Flask
- Painel indicador de estatísticas em tempo real (Total de filmes e Média das notas) — desafio extra

## Endpoints REST
| Método | Rota | Descrição | Status HTTP |
|---|---|---|---|
| GET | `/filmes` | Lista todos os filmes | 200 |
| GET | `/filmes/<id>` | Busca um filme por ID | 200 / 404 |
| POST | `/filmes` | Cadastra um novo filme | 201 / 400 |
| PUT | `/filmes/<id>` | Atualiza um filme | 200 / 400 / 404 |
| DELETE | `/filmes/<id>` | Remove um filme | 204 / 404 |

## Como Rodar Localmente
```bash
# Criar e ativar o ambiente virtual
py -m venv .venv
.venv\Scripts\activate

# Instalar dependências
pip install flask flask-cors

# Executar a aplicação
python app.py
```

Abra **http://localhost:5000** no navegador.

## Testes Realizados (Postman)

Foram executados os 11 testes previstos na atividade, cobrindo os fluxos de sucesso (listar, cadastrar, buscar, atualizar, excluir) e os fluxos de erro (validações, recurso inexistente e proteção contra id manipulado pelo cliente). Todos os 11 testes passaram.

**Teste — POST com corpo vazio (`{}`) → 400**

![Teste corpo vazio](./prints/teste-corpo-vazio.png)

**Teste — GET em id inexistente (`/filmes/999`) → 404**

![Teste id inexistente](./prints/teste-id-inexistente.png)

**Teste — POST enviando `id` no corpo → o sistema ignora e gera o próprio id → 201**

![Teste id ignorado](./prints/teste-id-ignorado.png)

## Desafio Extra
Foi implementado um **painel de indicadores** na interface web, que exibe em tempo real o total de filmes cadastrados e a média das notas, recalculado automaticamente a cada alteração na lista.

## Uso da IA e Agentes
Este projeto foi gerado utilizando o OpenCode com orientações do arquivo `AGENTS.md`, escrito antes da geração do código, para garantir padronização REST, validações consistentes e tratamento rigoroso de exceções (nunca retornando erro 500). Também foi criada a Skill `/campo-novo` em `.opencode/command/campo-novo.md`, usada para adicionar o campo `diretor` simultaneamente no backend (validação, CRUD) e no frontend (tabela e formulário), sem precisar repetir instruções manuais.