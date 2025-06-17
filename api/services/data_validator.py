from faker import Faker

faker = Faker('pt_BR')

def validar_cpf(cpf):
    cpf = ''.join(filter(str.isdigit, cpf))

    if len(cpf) != 11 or cpf == cpf[0] * 11:
        return False

    for i in range(9, 11):
        soma = sum(int(cpf[num]) * ((i+1)-num) for num in range(i))
        digito = ((soma * 10) % 11) % 10
        if digito != int(cpf[i]):
            return False

    return True

def validar_cnpj(cnpj):
    cnpj = ''.join(filter(str.isdigit, cnpj))

    if len(cnpj) != 14 or cnpj == cnpj[0] * 14:
        return False

    pesos = [5,4,3,2,9,8,7,6,5,4,3,2]
    soma = sum(int(cnpj[i]) * pesos[i] for i in range(12))
    digito1 = 11 - soma % 11
    digito1 = digito1 if digito1 < 10 else 0

    pesos = [6] + pesos
    soma = sum(int(cnpj[i]) * pesos[i] for i in range(13))
    digito2 = 11 - soma % 11
    digito2 = digito2 if digito2 < 10 else 0

    return cnpj[-2:] == f"{digito1}{digito2}"


def validar_cartao(numero):
    numero = ''.join(filter(str.isdigit, numero))
    soma = 0
    inverso = numero[::-1]

    for i, digito in enumerate(inverso):
        n = int(digito)
        if i % 2 == 1:
            n *= 2
            if n > 9:
                n -= 9
        soma += n

    return soma % 10 == 0
