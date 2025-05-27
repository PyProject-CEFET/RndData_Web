from faker import Faker
from validate_docbr import CPF, CNPJ
from api.services.utils import telefone_br

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

def gerar_endereco():
    return {
        'endereco': faker.address(),
        'cidade': faker.city(),
        'estado': faker.estado(),
        'cep': faker.postcode()
    }
