from flask import Flask
from api.routes.generate_routes import generate_bp

app = Flask(__name__)
app.register_blueprint(generate_bp)

if __name__ == '__main__':
    app.run(debug=True)
