import os
from flask import Flask, render_template, jsonify

app = Flask(__name__)

port = int(os.environ.get('ABIOTIC_PORT', 3000))
debug_on = int(os.environ.get('ABIOTIC_DEBUG', 0)) == 1
dev_mode = int(os.environ.get('ABIOTIC_DEV', 0)) == 1

if dev_mode:
    from flask_cors import CORS
    CORS(app)

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/api/v")
def get_api_version():
    return jsonify({"version": "0.01"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port, debug=debug_on)
