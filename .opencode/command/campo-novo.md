# Adicionar um campo novo

Quando eu pedir para adicionar um campo novo no filme, faça sempre nesta ordem, sem pular nenhum passo:
1. Adicione o campo nos dados de exemplo que já estão na lista no `app.py`.
2. Aceite o campo no cadastro (`POST`) e na atualização (`PUT`).
3. Se o campo for obrigatório, recuse com erro HTTP 400 quando faltar.
4. Adicione a coluna do campo na tabela da tela web (`templates/index.html`).
5. Adicione o campo no formulário de cadastro e no de edição.
6. No final, informe em uma frase o que mudou e como eu testo.