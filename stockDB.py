from pymongo import MongoClient


def checkInItem(item, set_name, qty):    # assuming item already exists, check it back in
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)
    db = Client["Stock"]
    col = db[set_name]
    data = col.find_one({"Item": item})
    init_avail = data["Availability"]
    col.update_one({"Item": item}, {"$set": {"Availability": init_avail+qty}})
    # update userDB HWSet item quantity
    # check to make sure its less than capacity? is that necessary?


def checkOutItem(item, set_name, qty):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)
    db = Client["Stock"]
    col = db[set_name]
    data = col.find_one({"Item": item})
    init_avail = data["Availability"]
    if init_avail - qty < 0:
        col.update_one({"Item": item}, {"$set": {"Availability": 0}})
        return init_avail
        # update userDB HWSet quantity

    else:
        col.update_one({"Item": item}, {"$set": {"Availability": init_avail - qty}})
        return 0
        # update userDB HWSet quantity


def addNewItem(set_name, item, capacity, availability):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)
    db = Client["Stock"]
    col = db[set_name]
    doc = {"Item": item, "Availability": availability, "Capacity": capacity}
    col.insert_one(doc)


def removeItem(set_name, item):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)
    db = Client["Stock"]
    col = db[set_name]
    col.delete_one({"Item": item})






