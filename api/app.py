from flask import Flask
from routes.generate_routes import generate_bp
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(generate_bp)
CORS(app)

if __name__ == '__main__':
    app.run(debug=True)
