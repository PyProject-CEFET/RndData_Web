from flask import Blueprint, jsonify, request
from services.data_generator import *

generate_bp = Blueprint('generate', __name__)

def str_to_bool(valor):
    return str(valor).lower() in ['true', '1', 'yes']

@generate_bp.route('/generate', methods=['GET'])
def generate_data():
    data_type = request.args.get('type', 'person')
    quantity = request.args.get('quantity', 1)

    # Parâmetros opcionais
    uf = request.args.get('uf', None)  # endereço
    bandeira = request.args.get('bandeira', 'mastercard')  # cartão crédito

    # Senha
    passwordTamanho = int(request.args.get('passwordTamanho', 10))
    passwordMaiuscula = str_to_bool(request.args.get('passwordMaiuscula', True))
    passwordMinuscula = str_to_bool(request.args.get('passwordMinuscula', True))
    passwordNumeros = str_to_bool(request.args.get('passwordNumeros', True))
    passwordEspeciais = str_to_bool(request.args.get('passwordEspeciais', True))

    # Sorteio números
    qtd_numeros = int(request.args.get('quantidade', 1))
    minimo = int(request.args.get('minimo', 0))
    maximo = int(request.args.get('maximo', 10))

    # Validação da quantidade geral
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
        elif tipo == 'password':
            return gerar_senha(passwordTamanho, passwordMaiuscula, passwordMinuscula, passwordNumeros, passwordEspeciais)
        elif tipo == 'number':
            return sortear_numeros(qtd_numeros, minimo, maximo)
        elif tipo == 'renavam':
            return gerar_renavam()
        elif tipo == 'rg':
            return gerar_rg()
        elif tipo == 'pis':
            return gerar_pis()
        elif tipo == 'titulo_eleitoral':
            return gerar_titulo_eleitoral()
        elif tipo == 'placa_veiculo':
            return gerar_placa_veiculo()
        else:
            return None

    tipos_validos = [
        'person', 'company', 'address', 'credit_card', 'password',
        'number', 'renavam', 'rg', 'pis', 'titulo_eleitoral', 'placa_veiculo'
    ]

    if data_type not in tipos_validos:
        return jsonify({'error': f'Tipo de dado inválido. Use um dos seguintes: {", ".join(tipos_validos)}'}), 400

    dados = [gerar_dado(data_type) for _ in range(quantity)]

    return jsonify(dados)
