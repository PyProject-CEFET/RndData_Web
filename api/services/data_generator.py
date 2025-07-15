import zipfile
import json
import random
from pathlib import Path  # Importação corrigida
from faker import Faker
from validate_docbr import CPF, CNPJ
from .utils import telefone_br  # Supondo que esteja num pacote

faker = Faker('pt_BR')
cpf_generator = CPF()
cnpj_generator = CNPJ()

BASE_DIR = Path(__file__).resolve().parent.parent  # Corrigido aqui
ZIP_PATH = BASE_DIR / 'data' / 'cep.zip'

z = zipfile.ZipFile(ZIP_PATH, 'r')
nomes_arquivos = z.namelist()

def gerar_endereco(estado=None):
    for _ in range(10000):
        nome_arquivo = random.choice(nomes_arquivos)
        try:
            with z.open(nome_arquivo) as f:
                data = json.load(f)
                if not data.get('erro'):
                    if estado and data.get('uf') != estado:
                        continue
                    return {
                        'rua': data.get('logradouro', ''),
                        'bairro': data.get('bairro', ''),
                        'cidade': data.get('localidade', ''),
                        'estado': data.get('uf', ''),
                        'cep': data.get('cep', '')
                    }
        except (json.JSONDecodeError, OSError):
            continue

    return {'erro': f'Não foi possível gerar um endereço real{f" para o estado {estado}" if estado else ""}'}


def gerar_pessoa():
    return {
        'nome': faker.name(),
        'email': faker.email(),
        'telefone': telefone_br(),
        'cpf': cpf_generator.generate(),
        'data_nascimento': faker.date_of_birth(minimum_age=18, maximum_age=90).strftime('%d/%m/%Y')
    }

def gerar_empresa():
    return {
        'razao_social': faker.company(),
        'cnpj': cnpj_generator.generate(),
        'telefone': telefone_br(),
        'email': faker.company_email()
    }

def gerar_cartao_credito(bandeira):
    return {
        'bandeira': bandeira.capitalize(),
        'numero': faker.credit_card_number(card_type=bandeira),
        'validade': faker.credit_card_expire(),
        'cvv': faker.credit_card_security_code(),
        'titular': faker.name()
    }

def gerar_senha(tamanho=10, maiusculas=True, minusculas=True, numeros=True, especiais=True):
    tamanho = int(tamanho)
    if tamanho > 32:
        raise ValueError("O tamanho máximo permitido é 32 caracteres.")
    if not (maiusculas or minusculas or numeros or especiais):
        minusculas = True

    categorias = {
        'maiusculas': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        'minusculas': 'abcdefghijklmnopqrstuvwxyz',
        'numeros': '0123456789',
        'especiais': '!@#$%&*()-+.,;?{[}]^><:'
    }

    selecionadas = []
    obrigatorios = []

    if maiusculas:
        selecionadas.append(categorias['maiusculas'])
        obrigatorios.append(random.choice(categorias['maiusculas']))
    if minusculas:
        selecionadas.append(categorias['minusculas'])
        obrigatorios.append(random.choice(categorias['minusculas']))
    if numeros:
        selecionadas.append(categorias['numeros'])
        obrigatorios.append(random.choice(categorias['numeros']))
    if especiais:
        selecionadas.append(categorias['especiais'])
        obrigatorios.append(random.choice(categorias['especiais']))

    todos_caracteres = ''.join(selecionadas)
    restante = tamanho - len(obrigatorios)
    senha = obrigatorios + [random.choice(todos_caracteres) for _ in range(restante)]
    random.shuffle(senha)
    return ''.join(senha)

def sortear_numeros(qtd=1, minimo=0, maximo=10):
    qtd = int(qtd)
    minimo = int(minimo)
    maximo = int(maximo)
    if minimo > maximo:
        raise ValueError("Valor mínimo não pode ser maior que o máximo.")
    intervalo = maximo - minimo + 1
    if qtd > intervalo:
        raise ValueError("Quantidade maior que intervalo (sem repetição).")
    if qtd == 1:
        return random.randint(minimo, maximo)
    return random.sample(range(minimo, maximo + 1), qtd)

def gerar_rg():
    pesos = list(range(2, 10))  # pesos 2 a 9
    numeros = [random.randint(0,9) for _ in range(8)]

    soma = sum([num * peso for num, peso in zip(numeros, pesos)])
    resto = 11 - (soma % 11)

    if resto == 10:
        digito = 'X'
    elif resto == 11:
        digito = '0'
    else:
        digito = str(resto)

    rg = ''.join(str(n) for n in numeros) + digito
    return rg


def gerar_renavam():
    # Gera os 10 primeiros dígitos aleatórios
    numeros = [random.randint(0, 9) for _ in range(10)]

    # Inverte os números para aplicar pesos da direita para a esquerda
    numeros_reverso = numeros[::-1]
    pesos = [2,3,4,5,6,7,8,9]

    soma = 0
    for i, num in enumerate(numeros_reverso):
        peso = pesos[i % len(pesos)]
        soma += num * peso

    digito = 11 - (soma % 11)
    if digito >= 10:
        digito = 0

    renavam = ''.join(str(n) for n in numeros) + str(digito)
    return renavam

def gerar_pis():
    n = [random.randint(0, 9) for _ in range(10)]
    pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    soma = sum([n[i] * pesos[i] for i in range(10)])
    resto = 11 - (soma % 11)
    digito = 0 if resto in [10, 11] else resto
    return ''.join(map(str, n)) + str(digito)

def gerar_titulo_eleitoral():
    def calcular_digito(num, pesos):
        soma = sum([int(dig) * peso for dig, peso in zip(num, pesos)])
        resto = soma % 11
        return '0' if resto in [0, 1] else str(11 - resto)

    numero = ''.join([str(random.randint(0, 9)) for _ in range(8)])
    uf = random.randint(1, 28)
    uf_str = f"{uf:02d}"
    dig1 = calcular_digito(numero + uf_str, [2,3,4,5,6,7,8,9,2,3])
    dig2 = calcular_digito(numero + uf_str + dig1, [7,8,9,2,3,4,5,6,7,8,9])
    return numero + uf_str + dig1 + dig2

def gerar_placa_veiculo():
    letras = ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZ', k=3))
    numeros = ''.join(random.choices('0123456789', k=4))
    return f"{letras}{numeros}"
