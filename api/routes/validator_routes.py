from flask import Blueprint, jsonify, request
from ..services.data_validator import * 

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
        else:
            return None

    if data_type not in ['cpf', 'cnpj', 'credit_card']:
        return jsonify({'error': 'Tipo de dado inválido. Use cpf, cnpj ou credit_card.'}), 400

    resultado = validar(data_type, value)
    return jsonify({'valido': resultado})