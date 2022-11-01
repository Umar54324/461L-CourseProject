from pymongo import MongoClient
import certifi
import jsonify
import json
ca = certifi.where()


def checkInItem(item, hw_type, qty):  # assuming item already exists, check it back in
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client["Stock"]
    col = db[hw_type]
    data = col.find_one({"Item": item})
    init_avail = data["Availability"]
    col.update_one({"Item": item}, {"$set": {"Availability": int(init_avail) + int(qty)}})
    return str(int(init_avail)+int(qty))
    # update userDB HWSet item quantity
    # check to make sure its less than capacity? is that necessary?


def checkOutItem(item, hw_type, qty):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client["Stock"]
    col = db[hw_type]
    data = col.find_one({"Item": item})
    init_avail = data["Availability"]
    if int(init_avail) - int(qty) < 0:
        col.update_one({"Item": item}, {"$set": {"Availability": 0}})
        return str(init_avail)
        # update userDB HWSet quantity

    else:
        col.update_one({"Item": item}, {"$set": {"Availability": int(init_avail) - int(qty)}})
        return str(qty)
        # update userDB HWSet quantity


def getAvailability(hw_type, item):
   
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client["Stock"]
    col = db[hw_type]
    data = col.find_one({"Item": item})
    avail = data["Availability"]
    return str(avail)



def getCapacity(hw_type, item):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client["Stock"]
    col = db[hw_type]
    data = col.find_one({"Item": item})
    cap = data["Capacity"]
    return str(cap)


def addNewItem(set_name, item, capacity, availability):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client["Stock"]
    col = db[set_name]
    doc = {"Item": item, "Availability": availability, "Capacity": capacity}
    col.insert_one(doc)


def removeItem(set_name, item):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client["Stock"]
    col = db[set_name]
    col.delete_one({"Item": item})
