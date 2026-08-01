from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

filmes = []
proximo_id = 1


@app.route("/")
def index():
    return render_template("index.html")


def buscar_filme_por_id(filme_id):
    for filme in filmes:
        if filme["id"] == filme_id:
            return filme
    return None


@app.route("/filmes", methods=["GET"])
def listar_filmes():
    return jsonify(filmes), 200


@app.route("/filmes/<int:filme_id>", methods=["GET"])
def buscar_filme(filme_id):
    filme = buscar_filme_por_id(filme_id)
    if filme is None:
        return jsonify({"erro": "Filme não encontrado"}), 404
    return jsonify(filme), 200


@app.route("/filmes", methods=["POST"])
def criar_filme():
    global proximo_id
    dados = request.get_json()
    if dados is None:
        return jsonify({"erro": "Campos obrigatórios ausentes"}), 400
    campos_obrigatorios = ["titulo", "genero", "ano", "nota", "diretor"]
    for campo in campos_obrigatorios:
        if campo not in dados or dados[campo] is None or dados[campo] == "":
            return jsonify({"erro": "Campos obrigatórios ausentes"}), 400
    try:
        nota = float(dados["nota"])
        if nota < 0 or nota > 10:
            return jsonify({"erro": "Nota deve estar entre 0 e 10"}), 400
    except (ValueError, TypeError):
        return jsonify({"erro": "Nota deve ser um número entre 0 e 10"}), 400
    try:
        ano = int(dados["ano"])
        if ano < 1000 or ano > 9999:
            return jsonify({"erro": "Ano deve ser um número inteiro de 4 dígitos"}), 400
    except (ValueError, TypeError):
        return jsonify({"erro": "Ano deve ser um número inteiro de 4 dígitos"}), 400
    novo_filme = {
        "id": proximo_id,
        "titulo": dados["titulo"],
        "genero": dados["genero"],
        "ano": ano,
        "nota": nota,
        "diretor": dados["diretor"],
    }
    proximo_id += 1
    filmes.append(novo_filme)
    return jsonify(novo_filme), 201


@app.route("/filmes/<int:filme_id>", methods=["PUT"])
def atualizar_filme(filme_id):
    filme = buscar_filme_por_id(filme_id)
    if filme is None:
        return jsonify({"erro": "Filme não encontrado"}), 404
    dados = request.get_json()
    if dados is None:
        return jsonify({"erro": "Campos obrigatórios ausentes"}), 400
    campos_obrigatorios = ["titulo", "genero", "ano", "nota", "diretor"]
    for campo in campos_obrigatorios:
        if campo not in dados or dados[campo] is None or dados[campo] == "":
            return jsonify({"erro": "Campos obrigatórios ausentes"}), 400
    try:
        nota = float(dados["nota"])
        if nota < 0 or nota > 10:
            return jsonify({"erro": "Nota deve estar entre 0 e 10"}), 400
    except (ValueError, TypeError):
        return jsonify({"erro": "Nota deve ser um número entre 0 e 10"}), 400
    try:
        ano = int(dados["ano"])
        if ano < 1000 or ano > 9999:
            return jsonify({"erro": "Ano deve ser um número inteiro de 4 dígitos"}), 400
    except (ValueError, TypeError):
        return jsonify({"erro": "Ano deve ser um número inteiro de 4 dígitos"}), 400
    filme["titulo"] = dados["titulo"]
    filme["genero"] = dados["genero"]
    filme["ano"] = ano
    filme["nota"] = nota
    filme["diretor"] = dados["diretor"]
    return jsonify(filme), 200


@app.route("/filmes/genero/<genero>", methods=["GET"])
def buscar_filmes_por_genero(genero):
    # Filtra os filmes cujo gênero corresponde ao parâmetro, ignorando maiúsculas/minúsculas
    resultado = [f for f in filmes if f["genero"].lower() == genero.lower()]
    return jsonify(resultado), 200


@app.route("/filmes/diretor/<diretor>", methods=["GET"])
def buscar_filmes_por_diretor(diretor):
    # Filtra os filmes cujo diretor corresponde ao parâmetro, ignorando maiúsculas/minúsculas
    resultado = [f for f in filmes if f["diretor"].lower() == diretor.lower()]
    return jsonify(resultado), 200


@app.route("/filmes/<int:filme_id>", methods=["DELETE"])
def deletar_filme(filme_id):
    filme = buscar_filme_por_id(filme_id)
    if filme is None:
        return jsonify({"erro": "Filme não encontrado"}), 404
    filmes.remove(filme)
    return "", 204


if __name__ == "__main__":
    app.run(debug=True)