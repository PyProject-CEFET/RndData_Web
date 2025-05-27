import pytest
from api.app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_generate_person(client):
    response = client.get('/generate?type=person')
    assert response.status_code == 200
    data = response.get_json()
    assert 'nome' in data

def test_generate_company(client):
    response = client.get('/generate?type=company')
    assert response.status_code == 200
    data = response.get_json()
    assert 'razao_social' in data

def test_generate_address(client):
    response = client.get('/generate?type=address')
    assert response.status_code == 200
    data = response.get_json()
    assert 'endereco' in data

def test_generate_invalid_type(client):
    response = client.get('/generate?type=invalid')
    assert response.status_code == 400
    data = response.get_json()
    assert 'error' in data
