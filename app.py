import os
from flask import Flask, send_from_directory
from flask_cors import CORS

import stockDB
import userDB
import loginDB

app = Flask(__name__, static_url_path='', static_folder='./build')


@app.route('/')
def index():

return send_from_directory('./build', 'index.html')


#UserDB Backend Requests
@app.route('/createProject/<user>/<project_name>', methods=['GET', 'POST'])
def createProject(user, project_name):
   userDB.createProject(user, project_name)


@app.route('/getAllProjects/<user>')
def getAllProjects(user):
   return userDB.getProjects(user)
   


@app.route('/getHWSets/<user>/<project>')
def getHWSets(user, project):
   return userDB.getHWSets(user, project)



@app.route('/getItemsInSet/<user>/<project>/<HWSet>')
def getItemsInSets(user, project, HWSet):
   return userDB.getItemsInSet(user, project, HWSet)
   


@app.route('/deleteUser/<user>')
def deleteUser(user):
   userDB.deleteUser(user)


@app.route('/deleteProject/<user>/<project>')
def deleteProject(user, project):
   userDB.deleteProject(user, project)


@app.route('/createHWSet/<user>/<project>/<set_name>')
def createHWSet(user, project, set_name):
   userDB.createHWSet(user, project, set_name)


@app.route('/deleteHWSet/<user>/<project>/<set_name>')
def deleteHWSet(user, project, set_name):
   userDB.deleteHWSet(user, project, set_name)


@app.route('/checkOutUser/<user>/<project>/<item>/<qty>/<setType>')
def checkOut(user, project, item, qty, setType):
   return userDB.checkOut(user, project, item, qty, setType)


@app.route('/checkInUser/<user>/<project>/<item>/<qty>')
def checkIn(user, project, item, qty):
   return userDB.checkIn(user, project, item, qty)

##########################################################################################################################################
##########################################################################################################################################
##########################################################################################################################################

#stockBackend Requests

@app.route('/checkin/<item>/<set_name>/<qty>')
def checkInDev(item, set_name, qty):
   stockDB.checkInItem(item, set_name, qty)

@app.route('/checkout/<item>/<set_name>/<qty>')
def checkOutDev(item, set_name, qty):
   return stockDB.checkOutItem(item, set_name, qty)

@app.route('/getAvailability/<hw_type>/<item>')
def getAvailability(hw_type, item):
   return stockDB.getAvailability(hw_type, item)
   

@app.route('/getCapacity/<hw_type>/<item>')
def getCapacity(hw_type, item):
   return stockDB.getCapacity(hw_type, item)
   

##########################################################################################################################################
##########################################################################################################################################
##########################################################################################################################################

#login backend requests

@app.route('/registerUser/<username>/<password>')
def registerUser(username, password):
   return loginDB.registerUser(username,password)


@app.route('/verifyLogin/<username>/<password>')
def verifyLogin(username, password):
   return loginDB.verifyLogin(username,password)



@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')



if __name__ == "__main__":
   app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
