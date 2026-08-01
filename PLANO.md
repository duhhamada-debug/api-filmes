# Planejamento da API

1. Recurso: Filme
2. Campos:
   - id: inteiro (gerado pelo sistema)
   - titulo: texto (obrigatório)
   - genero: texto (obrigatório)
   - ano: inteiro de 4 dígitos (obrigatório)
   - nota: número de 0 a 10 (obrigatório)
3. Validações:
   - nota deve estar entre 0 e 10
   - ano deve ser positivo com 4 dígitos
   - campos obrigatórios não podem ser vazios
4. Rotas REST:
   - GET /filmes
   - GET /filmes/<id>
   - POST /filmes
   - PUT /filmes/<id>
   - DELETE /filmes/<id>