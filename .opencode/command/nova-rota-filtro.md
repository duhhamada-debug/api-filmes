# Criar uma nova rota de filtro

Quando eu pedir uma nova rota de filtro/busca no catálogo de filmes,
faça sempre nesta ordem, sem pular nenhum passo:

1. Crie a rota seguindo o padrão REST: GET /filmes/<campo>/<valor>
2. A comparação deve ignorar maiúsculas/minúsculas quando o campo for texto
3. Se não houver resultados, retorne lista vazia com status 200 (não é erro)
4. Trate exceções para nunca travar a aplicação (nunca HTTP 500)
5. Adicione comentários em português explicando a rota
6. No final, me diga em uma frase qual URL eu uso pra testar