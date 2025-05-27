from flask import Blueprint, jsonify, request
from api.services.data_generator import gerar_pessoa, gerar_empresa, gerar_endereco

generate_bp = Blueprint('generate', __name__)

@generate_bp.route('/generate', methods=['GET'])
def generate_data():
    data_type = request.args.get('type', 'person')

    if data_type == 'person':
        data = gerar_pessoa()
    elif data_type == 'company':
        data = gerar_empresa()
    elif data_type == 'address':
        data = gerar_endereco()
    else:
        return jsonify({'error': 'Tipo de dado inválido. Use: person, company ou address'}), 400

    return jsonify(data)
