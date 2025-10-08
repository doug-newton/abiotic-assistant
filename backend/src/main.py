import os
from configparser import ConfigParser
from flask import Flask, render_template, jsonify, g
from flask_pymongo import PyMongo
from werkzeug.local import LocalProxy

port = int(os.environ.get('ABIOTIC_PORT', 3000))
debug_on = int(os.environ.get('ABIOTIC_DEBUG', 0)) == 1
dev_mode = int(os.environ.get('ABIOTIC_DEV', 0)) == 1

app = Flask(__name__)

config = ConfigParser()
app_dir = os.path.dirname(os.path.dirname(__file__))
config_path = os.path.join(app_dir, "abiotic_assistant.conf")
config.read(config_path)

app.config['MONGO_URI'] = config['DEV']['MONGO_URI']

def get_db():
    db = getattr(g, 'database', None)

    if db is None:
        db = g.database = PyMongo(app).db

    return db

db = LocalProxy(get_db)

if dev_mode:
    from flask_cors import CORS
    CORS(app)

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/api/v")
def get_api_version():
    return jsonify({"version": "0.01"})

@app.route("/api/transforms/<string:item_name>")
def get_transforms(item_name):
    return jsonify(db.transforms.find({"output.item":item_name}, {"_id":0}))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port, debug=debug_on)
