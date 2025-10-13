import os
from configparser import ConfigParser
from flask import Flask, render_template, jsonify, g
from flask_pymongo import PyMongo

port = int(os.environ.get('ABIOTIC_PORT', 3000))
debug_on = int(os.environ.get('ABIOTIC_DEBUG', 0)) == 1
dev_mode = int(os.environ.get('ABIOTIC_DEV', 0)) == 1

app = Flask(__name__)

config = ConfigParser()
app_dir = os.path.dirname(os.path.dirname(__file__))
config_path = os.path.join(app_dir, "abiotic_assistant.conf")
config.read(config_path)

app.config['MONGO_URI'] = config['DEV']['MONGO_URI']
mongo = PyMongo(app)

if dev_mode:
    from flask_cors import CORS
    CORS(app)

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/api/v")
def get_api_version():
    return jsonify({"version": "0.01"})

@app.route("/api/items")
def get_items():
    try:
        mongo.db.command("ping")
        result = mongo.db.items.aggregate([
            {
                '$addFields': {
                    'quantity': 1
                },
            }, {
                '$project': {
                    '_id': 0
                }
            }
        ])
        return jsonify(result), 200
    except:
        return jsonify({"error": "internal database error"}), 503

@app.route("/api/transforms/<string:item_name>")
def get_transforms(item_name):
    try:
        mongo.db.command("ping")
        result = mongo.db.transforms.aggregate([
            {
                '$match': {
                    'output.item': item_name
                }
            }, {
                '$lookup': {
                    'from': 'items',
                    'localField': 'input.item',
                    'foreignField': 'item',
                    'as': 'input_details',
                    'pipeline': [
                        {
                            '$project': {
                                '_id': 0
                            }
                        }
                    ]
                }
            }, {
                '$addFields': {
                    'input': {
                        '$map': {
                            'input': '$input',
                            'as': 'input_item',
                            'in': {
                                '$mergeObjects': [
                                    '$$input_item', {
                                        '$first': {
                                            '$filter': {
                                                'input': '$input_details',
                                                'cond': {
                                                    '$in': [
                                                        '$$input_item.item', [
                                                            '$$this.item'
                                                        ]
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            }, {
                '$lookup': {
                    'from': 'items',
                    'localField': 'output.item',
                    'foreignField': 'item',
                    'as': 'output_details',
                    'pipeline': [
                        {
                            '$project': {
                                '_id': 0
                            }
                        }
                    ]
                }
            }, {
                '$addFields': {
                    'output': {
                        '$map': {
                            'input': '$output',
                            'as': 'output_item',
                            'in': {
                                '$mergeObjects': [
                                    '$$output_item', {
                                        '$first': {
                                            '$filter': {
                                                'input': '$output_details',
                                                'cond': {
                                                    '$in': [
                                                        '$$output_item.item', [
                                                            '$$this.item'
                                                        ]
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            }, {
                '$project': {
                    '_id': 0,
                    'input_details': 0,
                    'output_details': 0
                }
            }
        ])
        return jsonify(result), 200
    except:
        return jsonify({"error": "internal database error"}), 503

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port, debug=debug_on)
