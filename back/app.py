from flask import Flask, request, jsonify
import csv
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

#Add aoutomatic id
def generate_id():
    df = pd.read_csv("diamonds.csv")
    if df.empty:
        return 1
    else:
        return df['id'].max() + 1

#Get
@app.route('/', methods=['GET'])
def get_diamond():
    data = []
    with open('diamonds.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data.append(row)
    return jsonify(data)

#Add
@app.route('/add', methods=['POST'])
def add_diamond():
    carat = request.json['carat']
    cut = request.json['cut']
    color = request.json['color']
    clarity = request.json['clarity']
    depth = request.json['depth']
    table = request.json['table']
    price = request.json['price']
    x = request.json['x']
    y = request.json['y']
    z = request.json['z']
    data = {'id':generate_id(),'carat': carat, 'cut': cut, 'color':color, 'clarity':clarity, 'depth':depth, 'table':table, 'price':price, 'x':x, 'y':y, 'z':z}
    df = pd.read_csv('diamonds.csv', header=0)
    df = df.append(data, ignore_index=True)
    df.to_csv('diamonds.csv', index=False)
    return jsonify({"message": "Data added successfully"})

#Update
@app.route('/upd/<id>', methods=['PUT'])
def update_diamond(id):
    id = int(id)
    id -= 1
    print(id)
    data = request.get_json()
    df = pd.read_csv('diamonds.csv')
    if id in df['id']:
        df.loc[id, 'carat'] = data['carat'] 
        df.loc[id, 'cut'] = data['cut']
        df.loc[id, 'color'] = data['color']
        df.loc[id, 'clarity'] = data['clarity']
        df.loc[id, 'depth'] = data['depth']
        df.loc[id, 'table'] = data['table']
        df.loc[id, 'price'] = data['price']
        df.loc[id, 'x'] = data['x']
        df.loc[id, 'y'] = data['y']
        df.loc[id, 'z'] = data['z']
        df.to_csv('diamonds.csv', index=False)
        return jsonify({'message': 'record updated successfully'}), 200
    else:
        return jsonify({'message': 'diamond not found'}), 400
    
#Delete
@app.route('/del/<id>', methods=['DELETE'])
def delete_diamond(id):
    id = int(id)
    id -= 1
    df = pd.read_csv('diamonds.csv')
    if id in df['id']:
        df.drop(id, inplace=True)
        df.to_csv('diamonds.csv', index=False)
        return jsonify({'message': 'diamond deleted successfully'}), 200
    else:
        return jsonify({'message': 'diamond not found'}), 400

if __name__ == '__main__':
    app.run(debug=True)