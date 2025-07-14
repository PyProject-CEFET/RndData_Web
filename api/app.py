from flask import Flask
from api.routes.generate_routes import generate_bp

from api.routes.validator_routes import validator_bp

from api.routes.text_routes import text_bp

from api.routes.network_routes import network_bp

from flask_cors import CORS

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
app.register_blueprint(generate_bp)
app.register_blueprint(validator_bp)
app.register_blueprint(text_bp)
app.register_blueprint(network_bp)
CORS(app)

if __name__ == '__main__':
    app.run(debug=True)
