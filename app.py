import os
from flask import Flask, send_from_directory
from flask_cors import CORS

import stockDB
import userDB
import loginDB

app = Flask(__name__, static_url_path='', static_folder='./build')
CORS(app)

@app.route('/')
def index():
   return send_from_directory('./build', 'index.html')


#UserDB Backend Requests
@app.route('/createProject/<user>/<project_name>/<description>/<owner>', methods=['GET', 'POST'])
def createProject(user, project_name, description, owner):
   userDB.createProject(user, project_name, description, owner)


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


@app.route('/checkOutUser/<user>/<project>/<item>/<qty>')
def checkOut(user, project, item, qty):
   return userDB.checkOut(user, project, item, qty)


@app.route('/checkInUser/<user>/<project>/<item>/<qty>')
def checkIn(user, project, item, qty):
   return userDB.checkIn(user, project, item, qty)


@app.route('/addAuthorizedUser/<user>/<project>/<desc>/<owner>')
def addAuthorizedUser(user, project, desc, owner):
   return userDB.addAuthorizedUser(user, project, desc, owner)


@app.route('/updateSharedProjects/<project>/<owner>/<cpu>/<gpu>')
def updateSharedProjects(project, owner, cpu, gpu):
   userDB.updateSharedProjects(project, owner, cpu, gpu)

##########################################################################################################################################
##########################################################################################################################################
##########################################################################################################################################

#stockBackend Requests

@app.route('/checkin/<item>/<qty>')
def checkInDev(item, qty):
   stockDB.checkInItem(item, qty)

@app.route('/checkout/<item>/<qty>')
def checkOutDev(item, qty):
   return stockDB.checkOutItem(item, qty)

@app.route('/getAvailability/<item>')
def getAvailability(item):
   return stockDB.getAvailability(item)
   

@app.route('/getCapacity/<item>')
def getCapacity(item):
   return stockDB.getCapacity(item)

@app.route('/getAllStockItems')
def getAllStockItems(hw_type):
   return stockDB.getAllStockItems(hw_type)
   

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
