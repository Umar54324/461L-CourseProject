from pymongo import MongoClient
import stockDB


def createProject(user, project_name):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)
    db = Client[user]
    db.create_collection(project_name)


def getProjects(user):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)
    db = Client[user]
    print(db.list_collection_names())
    return db.list_collection_names()


def getHWSets(user, project):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)
    db = Client[user]
    col = db[project]
    list = []
    for HWSet in col.find({}, {"_id": 0}):
        list.append(HWSet)
    print(list)
    return list


def getItemsInSet(user, project, HWSet): #return list of everything in set except _id, set name, and set type
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)
    db = Client[user]
    col = db[project]
    dicti = col.find_one({"Set Name": HWSet}, {"_id": 0, "Set Name": 0})
    ans = {}
    for key in dicti:
        arr = dicti[key]
        val = arr[0]
        ans[key] = val
    print(ans)
    return ans


def deleteUser(user):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)
    Client.drop_database(user)


def deleteProject(user, project):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)
    db = Client[user]
    db.drop_collection(project)


def createHWSet(user, project, set_name):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)
    db = Client[user]
    col = db[project]
    doc = {"Set Name": set_name}
    col.insert_one(doc)


def deleteHWSet(user, project, set_name):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)
    db = Client[user]
    col = db[project]
    col.delete_one({"Set Name": set_name})


def checkOut(user, project, HWSet, item, qty, setType):
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
        # setType = data["Set Type"]  # tells us type of item we want to check out, so we know where to find in stock db
        returnedVal = stockDB.checkOutItem(item, setType, qty)
        if returnedVal != 0:
            col.update_one({"Set Name": HWSet}, {"$set": {item: [returnedVal, setType]}})
        else:
            col.update_one({"Set Name": HWSet}, {"$set": {item: [qty, setType]}})


def checkIn(user, project, HWSet, item, qty):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)
    db = Client[user]
    col = db[project]
    data = col.find_one({"Set Name": HWSet})
    val = data[item]
    setType = data["setType"]
    if qty > val:
        qty = val
    col.update_one({"Set Name": HWSet}, {"$set": {item: [val - qty, setType]}})
    stockDB.checkInItem(item, setType, qty)

