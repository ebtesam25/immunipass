from pymongo import MongoClient
from pymongo.collection import ObjectId
import math
from flask import Flask, request
import json
from flask_ngrok import run_with_ngrok

app = Flask(__name__)
run_with_ngrok(app) 

client = MongoClient("mongodb+srv://user:password3142@cluster0.velhy.mongodb.net/<dbname>?retryWrites=true&w=majority")

db = client.get_database("immunipass")

k = db.maps

def get_locations(lat, lon):
    f = []
    for i in k.find():
        f.append(i)

    for i in f:
        a = abs(i['lat'] - lat)
        b = abs(i['lon'] - lon)
        i['distance'] = math.sqrt(a * a + b * b)

    return sorted(f, key = lambda i: i['distance'])

# print(get_locations(10.6, 45.6))

@app.route('/')
def index():
    return 'Hello, World!'

import json
from bson import ObjectId

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


@app.route('/', methods=["GET", "POST"])
def get_request():
    data = request.json
    lat, lon = float(data['lat']), float(data['lon'])
    print(lat, lon)
    locations = get_locations(10.6, 45.6)
    locations = locations[:5]
    return JSONEncoder().encode(locations)

if __name__ == "__main__":
    app.run()
