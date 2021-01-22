import json
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client['Ultimate_Baseball_Project']
player_data = db['Project2']

with open("C:/Users/Dan/gitrepo/Ultimate-Fantasy-Baseball-Eval-Tool/Fangraphs_hitters.json") as f:
    file_data = json.load(f)

player_data.insert_one(file_data)

client.close()