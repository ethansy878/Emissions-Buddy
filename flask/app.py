# SQL Logic
# CREDIT: https://realpython.com/python-sql-libraries/
import sqlite3
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
    sql = create_connection("./db/planes.db")

    start = request.args.get('start', type=str)
    end = request.args.get('end', type=str)
    planeType = request.args.get('planeType', type=str)

    # NEED BIG FILE
    # x = fetch_from_distances(start, end) # distance in kilometers
    # polynomial = polynomial_alternative(x)

    S = fetch_from_planes(planeType, "S") # Average number of seats
    PLF = fetch_from_planes(planeType, "PLF") # Passenger Load Factor
    CF = fetch_from_planes(planeType, "CF") # Cargo Factor
    CW = 1 # Cabin class weighting factor - FORCED: 1
    EF = fetch_from_planes(planeType, "EF") # CO2 emission factor for jet fuel combusion (kerosene)
    M = fetch_from_planes(planeType, "M") # Multiplier accounting for potential non-CO2 effects
    P = fetch_from_planes(planeType, "P") # CO2e emission factor for pre-production jet fuel, kerosene 
    AF = fetch_from_planes(planeType, "AF") # Aircraft factor
    A = fetch_from_planes(planeType, "A") # Airport infrastructure emissions
    
    return jsonify((polynomial/(S * PLF))*(1-CF)*CW*(EF*M+P)+AF*x+A)

def polynomial_alternative(distKm):
    takeoffKeroseneTons = 1.1; # 1.1 tons of kerosene
    takeoffKeroseneKg = takeoffKeroseneTons * 907.185
    flyKeroseneKg = 15.8 * distKm
    return flyKeroseneKg

def fetch_from_distances(start: str, end: str):
    print("WIP")
    # SQL goes here

def fetch_from_planes(planeType: str, data: str):
    stringDict = {
        "S": "Seats",
        "PLF": "PassengerLoadFactor",
        "CF": "CargoFactor",
        "EF": "EconomyFactor",
        "PF": "PremiumFactor",
        "BF" "BusinessFactor",
        "FC" "FirstClassFactor",
        "EF": "EmissionFactor",
        "M": "NonCO2Effects",
        "P": "PreProduction",
        "AF" "AircraftFactor",
        "A": "AirportInfrastructure"
    }
    query = ?
    execute_read_query() # connection, query

def hello_world():
    return("Hello World!")

# DEPLOY (in TERMINAL)
# flask --app .\flask\app.py run

# BROWSER REQUEST (Localhost):
# http://127.0.0.1:5000/emission_calc?start=%22NULL%22&end=%22NULL%22&planeType=%22NULL%22
# CALL THIS IN THE CHROME EXTENSION JAVASCRIPT