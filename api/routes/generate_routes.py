from flask import Blueprint, jsonify, request

from ..services.data_generator import *

generate_bp = Blueprint('generate', __name__)

@generate_bp.route('/generate', methods=['GET'])
def generate_data():
    data_type = request.args.get('type', 'person')
    quantity = request.args.get('quantity', 1)

    uf = request.args.get('uf', None)
    bandeira = request.args.get('bandeira', 'mastercard')
    
    try:
        quantity = int(quantity)
        if quantity < 1 or quantity > 100:
            raise ValueError
    except ValueError:
        return jsonify({'error': 'Quantidade inválida. Deve ser um número inteiro entre 1 e 100.'}), 400

    def gerar_dado(tipo):
        if tipo == 'person':
            return gerar_pessoa()
        elif tipo == 'company':
            return gerar_empresa()
        elif tipo == 'address':

            return gerar_endereco(uf)
        elif tipo == 'credit_card':
            return gerar_cartao_credito(bandeira)
        else:
            return None

    if data_type not in ['person', 'company', 'address', 'credit_card']:
        return jsonify({'error': 'Tipo de dado inválido. Use: person, company ou address'}), 400

    dados = [gerar_dado(data_type) for _ in range(quantity)]

    return jsonify(dados)