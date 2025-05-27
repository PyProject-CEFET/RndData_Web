from api.services.data_generator import gerar_pessoa, gerar_empresa, gerar_endereco

def test_gerar_pessoa():
    pessoa = gerar_pessoa()
    assert 'nome' in pessoa
    assert 'email' in pessoa
    assert 'telefone' in pessoa
    assert 'cpf' in pessoa
    assert 'data_nascimento' in pessoa

def test_gerar_empresa():
    empresa = gerar_empresa()
    assert 'razao_social' in empresa
    assert 'cnpj' in empresa
    assert 'telefone' in empresa
    assert 'email' in empresa

def test_gerar_endereco():
    endereco = gerar_endereco()
    assert 'endereco' in endereco
    assert 'cidade' in endereco
    assert 'estado' in endereco
    assert 'cep' in endereco
