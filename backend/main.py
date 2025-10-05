import os
from flask import Flask, render_template, jsonify

app = Flask(__name__)

port = int(os.environ.get('ABIOTIC_PORT', 3000))
debug_on = int(os.environ.get('ABIOTIC_DEBUG', 0)) == 1

@app.route("/")
def home():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port, debug=debug_on)
