from flask import Flask
import userDB

app = Flask(__name__)


@app.route('/createProject/<user>/<project_name>', methods='POST')
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


@app.route('/createHWSet/<user>/<project>/<set_name>/<set_type>')
def createHWSet(user, project, set_name, set_type):
    userDB.createHWSet(user, project, set_name, set_type)


@app.route('/deleteHWSet/<user>/<project>/<set_name>')
def deleteHWSet(user, project, set_name):
    userDB.deleteHWSet(user, project, set_name)


@app.route('/checkOut/<user>/<project>/<HWSet>/<item>/<qty>')
def checkOut(user, project, HWSet, item, qty):
    userDB.checkOut(user, project, HWSet, item, qty)


@app.route('/checkIn/<user>/<project>/<HWSet>/<item>/<qty>')
def checkIn(user, project, HWSet, item, qty):
    userDB.checkIn(user, project, HWSet, item, qty)


app.run()
