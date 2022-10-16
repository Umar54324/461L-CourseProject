from pymongo import MongoClient


def createProject(user, project_name):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)
    db = Client[user]
    db.create_collection(project_name)


def deleteUser(user):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)
    Client.drop_database(user)


def deleteProject(user, project):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)
    db = Client[user]
    db.drop_collection(project)



