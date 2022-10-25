from flask import Flask
import stockDB
app = Flask(__name__)

@app.route('/checkin/<item>/<set_name>/<qty>')
def checkIn(item, set_name, qty):
    stockDB.checkInItem(item, set_name, qty)

@app.route('/checkout/<item>/<set_name>/<qty>')
def checkOut(item, set_name, qty):
    stockDB.checkOutItem(item, set_name, qty)

