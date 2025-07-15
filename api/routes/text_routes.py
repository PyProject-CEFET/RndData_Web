from flask import Blueprint, request, jsonify
from services.text_utils import *

text_bp = Blueprint('text', __name__)

@text_bp.route('/text/stats', methods=['POST'])
def texto_stats():
    texto = request.json.get('text', '')
    return jsonify(contar_texto(texto))


@text_bp.route('/text/number-to-words', methods=['POST'])
def numero_extenso():
    valor = request.json.get('value')
    tipo = request.json.get('type', 'numero')  # 'numero' ou 'monetario'
    estilo = request.json.get('case', 'minusculo')  # minusculo, maiusculo, primeira
    moeda = request.json.get('currency', 'real')

    if not isinstance(valor, (int, float)):
        return jsonify({'error': 'Invalid value'}), 400

    resultado = numero_por_extenso(valor, tipo, estilo, moeda)
    return jsonify({'result': resultado})


@text_bp.route('/text/remove-accents', methods=['POST'])
def remover_acentos_route():
    texto = request.json.get('text', '')
    return jsonify({'result': remover_acentos(texto)})


@text_bp.route('/text/case', methods=['POST'])
def caixa_route():
    texto = request.json.get('text', '')
    tipo = request.json.get('type', 'maiuscula')
    ignorar_menores = int(request.json.get('ignore_shorter_than', 0))
    ignorar_palavras = request.json.get('ignore_words', [])

    resultado = converter_caixa(texto, tipo, ignorar_menores, ignorar_palavras)
    return jsonify({'result': resultado})


@text_bp.route('/text/sort', methods=['POST'])
def ordenar_route():
    texto = request.json.get('text', '')
    ordem = request.json.get('order', 'asc')  # asc ou desc
    por = request.json.get('by', 'quebra_linha')  # quebra_linha, espaco, virgula, ponto_virgula
    remover_duplicados = request.json.get('remove_duplicates', False)

    resultado = ordenar_texto(texto, ordem, por, remover_duplicados)
    return jsonify({'result': resultado})
