# Planejamento da API

1. Recurso: Filme
2. Campos:
   - id: inteiro (gerado pelo sistema)
   - titulo: texto (obrigatório)
   - genero: texto (obrigatório)
   - ano: inteiro de 4 dígitos (obrigatório)
   - nota: número de 0 a 10 (obrigatório)
   - diretor: texto (obrigatório)
3. Validações:
   - nota deve estar entre 0 e 10
   - ano deve ser um inteiro de 4 dígitos
   - todos os campos obrigatórios (titulo, genero, ano, nota, diretor) não podem ser vazios
4. Rotas REST:
   - GET /filmes
   - GET /filmes/<id>
   - POST /filmes
   - PUT /filmes/<id>
   - DELETE /filmes/<id>