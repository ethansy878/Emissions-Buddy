from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/add")

def add():
    num1 = request.args.get('num1', type=int)
    num2 = request.args.get('num2', type=int)
    return jsonify(sum = num1 + num2)


def hello_world():
    return("Hello World!")


# DEPLOY (in TERMINAL)
# 1. set FLASK_APP=app.py
# 2. flask run