from pymongo import MongoClient
import stockDB
import certifi
from flask import jsonify

ca = certifi.where()


def createProject(user, project_name):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    db.create_collection(project_name)


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


def checkOut(user, project, item, qty, hw_type):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    col = db[project]
    data = col.find_one({"Item Name": item})  # doc
    if data.__contains__(item):
        num = data["Checked Out"]
        returnedVal = stockDB.checkOutItem(item, hw_type, qty)
        col.update_one({"Item Name": item}, {"$set": {"Checked Out": int(returnedVal) + int(num)}})
        return str(int(returnedVal)+int(num))
        # bug - qty user wants to check out might not be amt they actually can check out
    else:
        # hw_type = data["Set Type"]  # tells us type of item we want to check out, so we know where to find in stock db
        returnedVal = stockDB.checkOutItem(item, hw_type, qty)
        col.update_one({"Item Name": item}, {"$set": {"Checked Out": returnedVal, "Item Type": hw_type}})
        return str(returnedVal)


def checkIn(user, project, item, qty):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    col = db[project]
    doc = col.find_one({"Item Name": item})
    userItemQty = doc["Checked Out"]
    userItemType = doc["Item Type"]
    if int(qty) > int(userItemQty):
        qty = userItemQty
    col.update_one({"Item Name": item}, {"$set": {"Checked Out": (int(userItemQty) - int(qty))}})
    stockDB.checkInItem(item, userItemType, qty)
    return str(qty)