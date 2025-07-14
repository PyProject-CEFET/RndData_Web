import re
import unicodedata
from num2words import num2words


def contar_texto(texto):
    texto_sem_espacos = texto.replace(" ", "")
    palavras = texto.split()
    espacos = texto.count(" ")
    linhas = texto.splitlines()
    vogais = len(re.findall(r'[aeiouAEIOU]', texto))
    numeros = len(re.findall(r'\d', texto))

    return {
        'caracteres': len(texto),
        'caracteres_sem_espacos': len(texto_sem_espacos),
        'palavras': len(palavras),
        'espacos': espacos,
        'linhas': len(linhas),
        'vogais': vogais,
        'numeros': numeros
    }


def numero_por_extenso(valor, tipo='numero', estilo='minusculo', moeda='real'):
    if tipo == 'monetario':
        lang = 'pt_BR'
        resultado = num2words(valor, lang=lang, to='currency' if moeda == 'real' else 'cardinal')
    else:
        resultado = num2words(valor, lang='pt_BR')

    if estilo == 'maiusculo':
        return resultado.upper()
    elif estilo == 'primeira':
        return resultado.capitalize()
    return resultado.lower()


def remover_acentos(texto):
    return ''.join(
        c for c in unicodedata.normalize('NFD', texto)
        if unicodedata.category(c) != 'Mn'
    )


def converter_caixa(texto, tipo, ignorar_menores=0, ignorar_palavras=None):
    if tipo == 'maiuscula':
        return texto.upper()
    elif tipo == 'minuscula':
        return texto.lower()
    elif tipo == 'inverter':
        return texto[::-1]
    elif tipo == 'alternado':
        return ''.join(
            c.upper() if i % 2 == 0 else c.lower() for i, c in enumerate(texto)
        )
    elif tipo == 'primeira_palavra':
        return texto.capitalize()
    elif tipo == 'primeira_letra_palavra':
        palavras = texto.split()
        ignorar = set(ignorar_palavras or [])
        resultado = []
        for p in palavras:
            if len(p) < ignorar_menores or p.lower() in ignorar:
                resultado.append(p)
            else:
                resultado.append(p[0].upper() + p[1:])
        return ' '.join(resultado)
    return texto


def ordenar_texto(texto, ordem='asc', por='quebra_linha', remover_duplicados=False):
    if por == 'espaco':
        itens = texto.split()
    elif por == 'virgula':
        itens = texto.split(',')
    elif por == 'ponto_virgula':
        itens = texto.split(';')
    else:
        itens = texto.splitlines()

    itens = [i.strip() for i in itens if i.strip()]
    if remover_duplicados:
        itens = list(dict.fromkeys(itens))

    itens.sort(reverse=(ordem == 'desc'))

    separador = {
        'espaco': ' ',
        'virgula': ', ',
        'ponto_virgula': '; ',
        'quebra_linha': '\n'
    }.get(por, '\n')

    return separador.join(itens)
