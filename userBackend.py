from flask import Flask
import userDB
app = Flask(__name__)

@app.route('/getAllProjects/<user>')
def getAllProjects(user):
    listDB = userDB.getProjects(user)
    return listDB


