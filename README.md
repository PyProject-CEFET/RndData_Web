
# 🧪 RndData — Gerador e Manipulador de Dados Aleatórios

Projeto desenvolvido para a disciplina de Python, com foco em geração, validação e manipulação de dados diversos via API REST.

---

## 📌 Objetivo

O **RndData** é uma aplicação full stack que oferece:

- 🔢 Geração de dados aleatórios (nomes, CPFs, datas, etc.)
- 🧹 Manipulação e limpeza de strings
- 🕵️ Validação de dados (CPF, CNPJ, e-mail, etc.)
- 🌐 Informações sobre a rede do cliente (IP, DNS reverso, navegador, etc.)

---

## 🖥️ Tecnologias utilizadas

- **Back-end:** Python + Flask
- **Front-end:** React + Vite

---

## 🚀 Como executar o projeto

### ▶️ Back-end (API Flask)

1. Acesse a pasta da API:

```bash
cd rnd-data/api
```

2. Crie e ative um ambiente virtual:

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate   # Windows
```

3. Instale as dependências:

```bash
pip install -r requirements.txt
```

4. Execute o servidor:

```bash
python app.py
```

A API estará disponível em http://127.0.0.1:5000/.

### 🌐 Front-end (React + Vite)

1. Acesse a pasta do front-end:

```bash
cd ../front
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

O front-end estará disponível em http://localhost:5173/.

---

## 🧭 Funcionalidades da API

🔹 **/generate/...** (Geração de dados)

- /generate/name
- /generate/cpf
- /generate/email
- /generate/phone
- /generate/address

🔹 **/text/...** (Manipulação de texto)

- /text/uppercase
- /text/lowercase
- /text/remove-accents
- /text/word-count
- /text/sort-words

🔹 **/validator/...** (Validação de dados)

- /validator/cpf
- /validator/cnpj
- /validator/email

🔹 **/network/...** (Informações de rede)

- /network/ip
- /network/browser
- /network/os

---

## 📁 Estrutura do projeto

```
rnd-data/
├── api/                  # Back-end Flask
│   ├── app.py
│   ├── requirements.txt
│   ├── routes/
│   └── services/
└── front/                # Front-end React + Vite
    ├── package.json
    ├── src/
    └── public/
```

---

## 👨‍💻 Autor

Projeto desenvolvido por Lucas Bonfim, Raphael Santos para a disciplina de Python, com fins educacionais.
