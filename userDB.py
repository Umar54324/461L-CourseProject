from pymongo import MongoClient
import stockDB
import loginDB
import certifi
from flask import jsonify

ca = certifi.where()


def createProject(user, project_name, description, owner):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    alrExists = db.list_collection_names().__contains__(project_name)
    if alrExists:
        print("Project already exists. Choose another project name.")
        return "False"
    else:
        db.create_collection(project_name)
        col = db[project_name]
        doc = {"Description":description, "CPU": 0, "GPU":0, "Owner":owner}
        col.insert_one(doc)
        return "True"
    # account for case where new project has same name as another project? esp if user is invited to a project...


def getProjects(user):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    print(db.list_collection_names())
    return jsonify(db.list_collection_names())


def getHWSets(user, project):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    col = db[project]
    list = []
    for HWSet in col.find({}, {"_id": 0}):
        list.append(HWSet)
    print(list)
    return jsonify(list)


def getItemsInSet(user, project, item_name):  # return list of everything in set except _id, set name, and set type
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    col = db[project]
    dicti = col.find_one({"Item Name": item_name}, {"_id": 0, "Checked Out": 0, "Item Type": 0})
    ans = dicti["Item Name"]
    return str(ans)


def deleteUser(user):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    Client.drop_database(user)


def deleteProject(user, project):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    db.drop_collection(project)


def createHWSet(user, project, item_name):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    col = db[project]
    doc = {"Item Name": item_name}
    col.insert_one(doc)


def deleteHWSet(user, project, item_name):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    col = db[project]
    col.delete_one({"Item Name": item_name})


def checkOut(user, project, item, qty):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    col = db[project]
    data = col.find_one({})  # doc
    num = data[item]
    returnedVal = stockDB.checkOutItem(item, qty)
    col.update_one({item: num}, {"$set": {item: int(returnedVal) + int(num)}})
    updated_doc = col.find_one({})
    updateSharedProjects(project, updated_doc["Owner"], updated_doc["CPU"], updated_doc["GPU"])
    return str(int(returnedVal))
    # bug - qty user wants to check out might not be amt they actually can check out


def checkIn(user, project, item, qty):
    # implement owner as param to avoid name conflict (front end will need to get owner from a db getter function so they can pass in to this function)
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    col = db[project]
    # doc = col.find_one({"Item Name": item})
    doc = col.find_one({})
    userItemQty = doc[item]
    if int(qty) > int(userItemQty):
        qty = userItemQty
    col.update_one({item: userItemQty}, {"$set": {item: (int(userItemQty) - int(qty))}})
    stockDB.checkInItem(item, qty)
    updated_doc = col.find_one({})
    updateSharedProjects(project, updated_doc["Owner"], updated_doc["CPU"], updated_doc["GPU"])
    return str(qty)


def addAuthorizedUser(user, project_name, project_description, owner):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    encryptedUser = loginDB.encrypt(user)
    db = Client["Passwords"]
    alrExists = db.list_collection_names().__contains__(encryptedUser)
    if alrExists:
        createProject(user, project_name, project_description, owner)
        return "True"
    else:
        return "False"


def updateSharedProjects(project_name, owner, cpu_amt, gpu_amt):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    for user in Client.list_database_names():
        db = Client[user]
        for proj in db.list_collection_names():
            if(proj == project_name):
                col = db[project_name]
                data = col.find_one({})
                if(data["Owner"]==owner):
                    col.update_one({}, {"$set": {"CPU": cpu_amt,"GPU":gpu_amt}})
    return "True"
        
def getCPU(user, project):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    col = db[project]
    data = col.find_one({})
    return str(data["CPU"])


def getGPU(user, project):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    col = db[project]
    data = col.find_one({})
    return str(data["GPU"])


def getProjID(user, project):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    col = db[project]
    data = col.find_one({})
    return str(data["_id"])


def getDescription(user, project):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    col = db[project]
    data = col.find_one({})
    return str(data["Description"])