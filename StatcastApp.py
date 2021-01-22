
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

import datetime as dt

from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
# import scrape_mars
import json
from bson.objectid import ObjectId
from bson import json_util
from bson import ObjectId

from flask_cors import CORS, cross_origin

import pprint 
pp = pprint.PrettyPrinter(indent=4)


#################################################
# Database Setup
#################################################

# engine = create_engine("Resources\all_stats_hitters_2019.csv")

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(engine, reflect=True)

# #Save reference to the table

# hitter_names = Base.classes.full_name

# Flask Setup

app = Flask(__name__,static_url_path="/static",static_folder="static")
CORS(app)

#Use PyMongo
mongo = PyMongo(app, uri="mongodb://localhost:27017/Ultimate_Baseball_Project")

# Flask Routes

@app.route("/")
def welcome():
    return render_template('index.html')

@app.route("/statcast")
def stats():

    #From Flask-Pymongo documentation

    # hitter_names = mongo.db.Project2.find({}, {"player.full_name": 1})
    # print([ (name_dict.get('player',{})).get('full_name',"N/A")  for name_dict in list(hitter_names) ])

    # # """List all available api routes."""

    # return render_template("index.html", welcome=[ (name_dict.get('player',{})).get('full_name',"N/A")  for name_dict in list(hitter_names) ])


    # hitter_barrels = mongo.db.Project2.find({}, {"player.seasons.totals.statcast_metrics.hitting.overall.barreled_ball.count":1})
    # hitter_season = mongo.db.Project2.find({}, {"player.seasons.year":1})
    # hitter_season_type = mongo.db.Project2.find({}, {"player.seasons.type":1})
    # hitter_name = mongo.db.Project2.find({}, {"player.full_name":1})
    # print([ (barrels.get('player',{})).get("seasons","N/A")  for barrels in list(hitter_barrels) ])

    # hitter_statcast = []
    # # get a list of player id's
    # for hitter in hitter_barrels:
    #     hitter_statcast.append(hitter['_id']['$oid'])
    # print(hitter_statcast)
    # iterate through every author_ids to find the corresponding username
    # for item in author_id:
    #     message = coll_message.find_one({"author_id": item}, {"text": 1, "pub_date": 1})
    #     author = coll_user.find_one({"_id": item}, {"username": 1})
    #     merged = dict(chain((message.items() + author.items())))


    hitter_data = mongo.db.Project2.find()
    # print(hitter_data[0])
    player_name = "Michael Chavis"
    year = 2020
    season_type = "REG"
    
    results = {}
    
    for hd in hitter_data:
        player_barrels = []
        try:
            
            seasons = hd["player"]["seasons"]
            filtered_seasons = [s for s in seasons if (s['year'] == year and s['type'] == season_type)]
            # print(filtered_seasons[0])
            for s in filtered_seasons:
                # print(s['totals'])
                barrel_object = {}
                object_barrels = {}
                if 'statcast_metrics' in s['totals']:
                    overall = s['totals']['statcast_metrics']
                    # print(overall)
                    if 'hitting' in overall:
                        object_barrels = overall['hitting']['overall']
                        for b in object_barrels:
                            barrel_object['barrels'] = b['barreled_ball']['count']
                        # print(overall['barreled_ball']['count'])
                    else:
                        barrel_object['barrels'] = 'N/A'
                else:
                    barrel_object['barrels'] = 'N/A'
                # player_barrels.append(barrel_object)
            results[hd['player']['full_name']] = barrel_object['barrels']


            # overalls = [ for s in filtered_seasons]
            # counts = [s['barreled_ball']['count'] for s in overalls if 'barreled_ball' in s]
            # results[player_name] = results[player_name].extend(counts)
            # print(hitter_barrels)
            # print(seasons)
            # print(filtered_seasons)     
        #     # print(counts)
        except Exception as e:
            print(f'The error is on: {e}')
    return(jsonify(results))
            
    # pp.pprint(results)

    # for i,barrels in enumerate(hitter_barrels):
    #     print(type(barrels))
        # pp.pprint(barrels[''])
        # if i==0:
        #     print((barrels['_id']))
        #     print(type(barrels), type(barrels['_id']), type(barrels['player']))
        #     print(barrels['player'].keys())
            
        # else:
        #     break
    #print([ (barrels.get('player',{})).get("seasons","N/A")  for barrels in list(hitter_barrels) ])
    # print('new')
    

    #"

#     """List all available api routes."""
#     return (
#         f"Welcome to the Ultimate Fantasy Baseball Eval Tool!"
#         f"Available Routes:<br/>"
#         f"/api/v1.0/hitters<br/>"
#         f"/api/v1.0/pitchers<br/>"
#     )

# #Hitters path

@app.route("/hitters")
def hello():
    Fan_G_hitters = mongo.db.Fangraphs_hitters.find()
    Names = [ (name_dict.get('Name' ,{}),
    name_dict.get('O-Swing%', {}),
    name_dict.get('O-Contact%', {}),
    name_dict.get('Z-Swing%', {}),
    name_dict.get('Z-Contact%', {}),
    name_dict.get('AVG', {}),
    name_dict.get('OPS', {}),
    name_dict.get('R', {}),
    name_dict.get('RBI', {}),
    name_dict.get('HR', {}),
    name_dict.get('SB', {}),) for name_dict in list(Fan_G_hitters)]
    return (jsonify(Names))

# def httr():
#     #Create session link from Python to DB
#     session = Session(engine)
#     hitters_group = session.query()

#     return jsonify(hitters_group)
# #Pitchers Path

# @app.route("/api/v1.0/pitchers<br/>")
# def ptchr():


if __name__ == "__main__":
    app.run(debug=True)