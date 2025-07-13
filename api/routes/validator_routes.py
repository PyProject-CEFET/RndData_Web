from flask import Blueprint, jsonify, request
from services.data_validator import *

validator_bp = Blueprint('validator', __name__)

@validator_bp.route('/validator', methods=['POST'])
def validator_data():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'Requisição inválida. Envie um JSON no corpo.'}), 400

    data_type = data.get('type')
    value = data.get('value')

    if not data_type or not value:
        return jsonify({'error': 'Parâmetros "type" e "value" são obrigatórios.'}), 400

    def validar(tipo, valor):
        if tipo == 'cpf':
            return validar_cpf(valor)
        elif tipo == 'cnpj':
            return validar_cnpj(valor)
        elif tipo == 'credit_card':
            return validar_cartao(valor)
        elif tipo == 'renavam':
            return validar_renavam(valor)
        elif tipo == 'pis':
            return validar_pis(valor)
        elif tipo == 'titulo_eleitoral':
            return validar_titulo_eleitoral(valor)
        elif tipo == 'rg':
            return validar_rg(valor)
        else:
            return None

    tipos_validos = ['cpf', 'cnpj', 'credit_card', 'renavam', 'pis', 'titulo_eleitoral', 'rg']

    if data_type not in tipos_validos:
        return jsonify({'error': f'Tipo de dado inválido. Use um dos seguintes: {", ".join(tipos_validos)}'}), 400

    resultado = validar(data_type, value)
    return jsonify({'valido': resultado})
