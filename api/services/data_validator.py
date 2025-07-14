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


def validar_renavam(renavam):
    renavam = ''.join(filter(str.isdigit, renavam))
    if len(renavam) != 11:
        return False

    numeros = renavam[:-1][::-1]  # primeiros 10 dígitos invertidos
    pesos = [2,3,4,5,6,7,8,9]

    soma = 0
    for i, num in enumerate(numeros):
        peso = pesos[i % len(pesos)]
        soma += int(num) * peso

    digito_calculado = 11 - (soma % 11)
    if digito_calculado >= 10:
        digito_calculado = 0

    return digito_calculado == int(renavam[-1])


def validar_pis(pis):
    pis = ''.join(filter(str.isdigit, pis))
    if len(pis) != 11:
        return False

    pesos = [3,2,9,8,7,6,5,4,3,2]
    soma = sum(int(p)*peso for p, peso in zip(pis[:-1], pesos))
    resto = 11 - (soma % 11)
    if resto >= 10:
        resto = 0
    return resto == int(pis[-1])

def validar_titulo_eleitoral(titulo):
    titulo = ''.join(filter(str.isdigit, titulo))
    if len(titulo) != 12:
        return False

    def calc_digito(num, pesos):
        soma = sum(int(d)*p for d,p in zip(num, pesos))
        resto = soma % 11
        if resto == 0 or resto == 1:
            return '0'
        return str(11 - resto)

    num = titulo[:8]
    uf = titulo[8:10]
    dig1 = titulo[10]
    dig2 = titulo[11]

    digito1_calc = calc_digito(num + uf, [2,3,4,5,6,7,8,9,2,3])
    digito2_calc = calc_digito(num + uf + digito1_calc, [7,8,9,2,3,4,5,6,7,8,9])

    return dig1 == digito1_calc and dig2 == digito2_calc

def validar_rg(rg):
    rg = ''.join(filter(str.isalnum, rg)).upper()
    if len(rg) != 9:
        return False

    pesos = list(range(2, 10))  # 2 a 9 para os primeiros 8 dígitos

    soma = 0
    for i in range(8):
        if not rg[i].isdigit():
            return False
        soma += int(rg[i]) * pesos[i]

    digito_esperado = 11 - (soma % 11)

    if digito_esperado == 10:
        digito_esperado = 'X'
    elif digito_esperado == 11:
        digito_esperado = '0'
    else:
        digito_esperado = str(digito_esperado)

    return rg[-1] == digito_esperado

