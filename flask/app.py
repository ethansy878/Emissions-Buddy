from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/add")
def calc():
    num1 = request.args.get('num1', type=int)
    num2 = request.args.get('num2', type=int)
    return jsonify(sum = num1 + num2)


def hello_world():
    return("Hello World!")

# DEPLOY (in TERMINAL)
# flask --app .\flask\app.py run