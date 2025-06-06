from flask import Flask
from api.routes.generate_routes import generate_bp
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(generate_bp)
CORS(app)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
