# SQL Logic
# CREDIT: https://realpython.com/python-sql-libraries/
import sqlite3
import math
from sqlite3 import Error

def create_connection(path):
    connection = None
    try:
        connection = sqlite3.connect(path)
        print("Connection to SQLite DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")
    return connection

def execute_read_query(connection, query):
    cursor = connection.cursor()
    result = None
    try:
        print(query)
        cursor.execute(query)
        result = cursor.fetchall()
        return result
    except Error as e:
        print(f"The error '{e}' occurred")


# Start Flask Logic
# Flask import
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/add")
def calc():
    num1 = request.args.get('num1', type=int)
    num2 = request.args.get('num2', type=int)
    return jsonify(sum = num1 + num2)

@app.route("/emission_calc")
def emission_calc():
    sql = create_connection("./db/mydatabase.db")

    start = request.args.get('start', type=str)
    end = request.args.get('end', type=str)
    airlineName = request.args.get('airlineName', type=str)

    # NEED BIG FILE
    x = 1 # fetch_from_distances(start, end) # distance in kilometers
    polynomial = polynomial_alternative(x)

    S = fetch_from_planes(sql, airlineName, "S") # Average number of seats
    PLF = fetch_from_planes(sql, airlineName, "PLF") # Passenger Load Factor
    CF = fetch_from_planes(sql, airlineName, "CF") # Cargo Factor
    CW = 1 # Cabin class weighting factor - FORCED: 1 - gets rid of Economy Class, Premium Economy Class, Business Class weight
    EF = fetch_from_planes(sql, airlineName, "EF") # CO2 emission factor for jet fuel combusion (kerosene), COMPLICATED!
    M = fetch_from_planes(sql, airlineName, "M") # Multiplier accounting for potential non-CO2 effects
    P = fetch_from_planes(sql, airlineName, "P") # CO2e emission factor for pre-production jet fuel, kerosene 
    AF = fetch_from_planes(sql, airlineName, "AF") # Aircraft factor
    A = fetch_from_planes(sql, airlineName, "A") # Airport infrastructure emissions
    
    result = (polynomial/(S * PLF))*(1-CF)*CW*(EF*M+P)+AF*x+A
    
    return jsonify((polynomial/(S * PLF))*(1-CF)*CW*(EF*M+P)+AF*x+A)

def polynomial_alternative(distKm):
    takeoffKeroseneTons = 1.1; # 1.1 tons of kerosene
    takeoffKeroseneKg = takeoffKeroseneTons * 907.185
    flyKeroseneKg = 15.8 * distKm
    return flyKeroseneKg

def fetch_from_distances(sql, start: str, end: str):
    print("WIP")
    # SQL goes here

def fetch_from_planes(sql, airlineName: str, data: str):
    stringDict = {
        "S": "Seats",
        "PLF": "PassengerLoadFactor",
        "CF": "CargoFactor",
        #"EF": "EconomyFactor",
        #"PF": "PremiumFactor",
        #"BF" "BusinessFactor",
        #"FC" "FirstClassFactor",
        "EF": "EmissionFactor",
        "M": "NonCO2Effects",
        "P": "PreProduction",
        "AF": "AircraftFactor",
        "A": "AirportInfrastructure"
    }
    query = "SELECT " + stringDict[data] + " FROM Planes_Table WHERE AirlineName=" + airlineName + ";" 
    result = execute_read_query(sql, query)
    print(result)
    print(result[0][0])
    return result[0][0] # because array of tuples

def car_emissions(a1, a2, cartype):
    if cartype is True: # regular fuel
        return get_dist(a1, a2) * 0.2487
    else: # diesel 
        return get_dist(a1, a2) * 0.2849

import pandas
# Get distance between 2 airports
def get_dist(a1, a2):
    airports = pandas.get_cvs("db/airports.dat")
    lat1 = airports.iat[a1, "Latitude"]
    lat2 = airports.iat[a2, "Latitude"]
    lon1 = airports.iat[a1, "Longitude"]
    lon2 = airports.iat[a2, "Longitude"]

    return math.cos(math.sin(lat1) * math.sin(lat2) + math.cos(lat1) * math.cos(lat2) * math.cos(lon2 - lon1)) * 6371

def hello_world():
    return("Hello World!")

# DEPLOY (in TERMINAL)
# flask --app .\flask\app.py run

# BROWSER REQUEST (Localhost):
# http://127.0.0.1:5000/emission_calc?start=%22NULL%22&end=%22NULL%22&airlineName=%22NULL%22
# CALL THIS IN THE CHROME EXTENSION JAVASCRIPT