# Flask import
from flask import Flask, jsonify, request

# PandaSQL import
from pandasql import sqldf
import pandas as pd

app = Flask(__name__)

@app.route("/add")
def calc():
    num1 = request.args.get('num1', type=int)
    num2 = request.args.get('num2', type=int)
    return jsonify(sum = num1 + num2)

@app.route("emission_calc")
def emission_calc(start: str, end: str, planeType: str):
    x = fetch_from_distances(start, end) # distance in kilometers

    polynomial = polynomial_alternative(x)
    S = fetch_from_planes(planeType, "S") # Average number of seats
    PLF = fetch_from_planes(planeType, "PLF") # Passenger Load Factor
    CF = fetch_from_planes(planeType, "CF") # Cargo Factor
    CW = fetch_from_planes(planeType, "CW") # Cabin class weighting factor
    EF = fetch_from_planes(planeType, "EF") # CO2 emission factor for jet fuel combusion (kerosene)
    M = fetch_from_planes(planeType, "M") # Multiplier accounting for potential non-CO2 effects
    P = fetch_from_planes(planeType, "P") # CO2e emission factor for pre-production jet fuel, kerosene 
    AF = fetch_from_planes(planeType, "AF") # Aircraft factor
    A = fetch_from_planes(planeType, "A") # Airport infrastructure emissions
    
    return (polynomial/(S * PLF))*(1-CF)*CW*(EF*M+P)+AF*x+A

def polynomial_alternative(distKm):
    takeoffKeroseneTons = 1.1; # 1.1 tons of kerosene
    takeoffKeroseneKg = takeoffKeroseneTons * 907.185
    flyKeroseneKg = 15.8 * distKm
    return flyKeroseneKg

def fetch_from_distances(start: str, end: str):
    print("WIP")
    # SQL goes here

def fetch_from_planes(planeType: str, data: str):
    print("WIP")
    # SQL goes here

def hello_world():
    return("Hello World!")

# DEPLOY (in TERMINAL)
# flask --app .\flask\app.py run