# AGENTS.md

## O que é este projeto
Sistema em Flask para gerenciar um catálogo de filmes em memória (lista Python), sem banco de dados.
Cada filme possui: `id`, `titulo`, `genero`, `ano` e `nota`.

## Padrões Técnicos
- Python 3 com Flask e Flask-CORS
- Todo o código backend em um arquivo único: `app.py`
- Comentários em português explicando cada função

## Regras Obrigatórias
1. Não permitir cadastro sem `titulo`, `genero`, `ano` e `nota`. Retorne HTTP 400 e `{"erro": "Campos obrigatórios ausentes"}` caso algum tente ser cadastrado sem.
2. Validações:
   - `nota` deve ser entre 0 e 10.
   - `ano` deve ser um número inteiro de 4 dígitos.
3. O `id` é gerado automaticamente pelo sistema. Se enviado pelo cliente no POST, ignore.
4. Trate exceções para evitar o travamento da aplicação (evite HTTP 500).
5. Todas as mensagens de erro devem usar a chave `"erro"`.
6. Status HTTP:
   - 200: Sucesso em listagem, busca e atualização
   - 201: Sucesso na criação
   - 200/204: Sucesso na remoção
   - 400: Dados inválidos ou campos ausentes
   - 404: Recurso não encontrado

## Endereços REST
- GET /filmes
- GET /filmes/<int:id>
- POST /filmes
- PUT /filmes/<int:id>
- DELETE /filmes/<int:id>