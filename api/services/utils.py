from faker import Faker

faker = Faker('pt_BR')

def telefone_br():
    ddd = faker.random_int(min=11, max=99)
    numero = faker.random_int(min=900000000, max=999999999)
    numero_str = str(numero)
    return f"({ddd}) {numero_str[0]}{numero_str[1:5]}-{numero_str[5:]}"
