from pymongo import MongoClient
import stockDB


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


def createHWSet(user, project, set_name, set_type):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)
    db = Client[user]
    col = db[project]
    doc = {"Set Name": set_name, "Set Type": set_type}
    col.insert_one(doc)


def deleteHWSet(user, project, set_name):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)
    db = Client[user]
    col = db[project]
    col.delete_one({"Set Name": set_name})


def checkOut(user, project, HWSet, item, qty):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)
    db = Client[user]
    col = db[project]
    data = col.find_one({"Set Name": HWSet})
    if data.__contains__(item):
        num = data[item]
        returnedVal = stockDB.checkOutItem(item, HWSet, qty)
        if returnedVal != 0:
            col.update_one({"Set Name": HWSet}, {"$set": {item: returnedVal+num}})
        else:
            col.update_one({"Set Name": HWSet}, {"$set": {item: num + qty}})
        # bug - qty user wants to check out might not be amt they actually can check out
    else:
        setType = data["Set Type"]  # tells us type of item we want to check out, so we know where to find in stock db
        returnedVal = stockDB.checkOutItem(item, setType, qty)
        if returnedVal != 0:
            col.update_one({"Set Name": HWSet}, {"$set": {item: returnedVal}})
        else:
            col.update_one({"Set Name": HWSet}, {"$set": {item: qty}})


def checkIn(user, project, HWSet, item, qty):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)
    db = Client[user]
    col = db[project]
    data = col.find_one({"Set Name": HWSet})
    val = data[item]
    if qty > val:
        qty = val
    col.update_one({"Set Name": HWSet}, {"$set": {item: val - qty}})
    setType = data["Set Type"]
    stockDB.checkInItem(item, setType, qty)

