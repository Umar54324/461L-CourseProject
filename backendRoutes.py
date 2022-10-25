from flask import Flask

import stockDB
import userDB

app = Flask(__name__)

#UserDB Backend Requests
@app.route('/createProject/<user>/<project_name>', methods=['POST'])
def createProject(user, project_name):
   userDB.createProject(user, project_name)


@app.route('/getAllProjects/<user>')
def getAllProjects(user):
   listDB = userDB.getProjects(user)
   return listDB


@app.route('/getHWSets/<user>/<project>')
def getHWSets(user, project):
   listd = userDB.getHWSets(user, project)
   return listd


@app.route('/getItemsInSet/<user>/<project>/<HWSet>')
def getItemsInSets(user, project, HWSet):
   dict = userDB.getItemsInSet(user, project, HWSet)
   return dict


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


@app.route('/checkOutUser/<user>/<project>/<HWSet>/<item>/<qty>/<setType>')
def checkOut(user, project, HWSet, item, qty, setType):
   userDB.checkOut(user, project, HWSet, item, qty, setType)


@app.route('/checkInUser/<user>/<project>/<HWSet>/<item>/<qty>')
def checkIn(user, project, HWSet, item, qty):
   userDB.checkIn(user, project, HWSet, item, qty)

##########################################################################################################################################
##########################################################################################################################################
##########################################################################################################################################

#stockBackend Requests

@app.route('/checkin/<item>/<set_name>/<qty>')
def checkInDev(item, set_name, qty):
   stockDB.checkInItem(item, set_name, qty)

@app.route('/checkout/<item>/<set_name>/<qty>')
def checkOutDev(item, set_name, qty):
   stockDB.checkOutItem(item, set_name, qty)
app.run()
