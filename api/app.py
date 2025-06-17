from flask import Flask
from api.routes.generate_routes import generate_bp

from api.routes.validator_routes import validator_bp
from flask_cors import CORS

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
app.register_blueprint(generate_bp)
app.register_blueprint(validator_bp)
CORS(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)