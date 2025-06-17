from faker import Faker
from validate_docbr import CPF, CNPJ

from services.utils import *
from pathlib import Path

import zipfile
import json
import random

BASE_DIR = Path(__file__).resolve().parent.parent
ZIP_PATH = BASE_DIR / 'data' / 'cep.zip'

z = zipfile.ZipFile(ZIP_PATH, 'r')
nomes_arquivos = z.namelist()


faker = Faker('pt_BR')
cpf_generator = CPF()
cnpj_generator = CNPJ()

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


def gerar_endereco(estado=None):
    for _ in range(1000):
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

def gerar_cartao_credito(bandeira):
    return {
        'bandeira': bandeira.capitalize(),
        'numero': faker.credit_card_number(card_type=bandeira),
        'validade': faker.credit_card_expire(),
        'cvv': faker.credit_card_security_code(),
        'titular': faker.name()
    }
