from flask import Blueprint, jsonify, request
from services.data_generator import gerar_pessoa, gerar_empresa, gerar_endereco

generate_bp = Blueprint('generate', __name__)

@generate_bp.route('/generate', methods=['GET'])
def generate_data():
    data_type = request.args.get('type', 'person')
    quantity = request.args.get('quantity', 1)
    
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
            return gerar_endereco()
        else:
            return None

    if data_type not in ['person', 'company', 'address']:
        return jsonify({'error': 'Tipo de dado inválido. Use: person, company ou address'}), 400

    dados = [gerar_dado(data_type) for _ in range(quantity)]

    return jsonify(dados)
