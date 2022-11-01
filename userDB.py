from pymongo import MongoClient
import stockDB
import certifi

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
    return db.list_collection_names()


def getHWSets(user, project):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    col = db[project]
    list = []
    for HWSet in col.find({}, {"_id": 0}):
        list.append(HWSet)
    print(list)
    return list


def getItemsInSet(user, project, HWSet):  # return list of everything in set except _id, set name, and set type
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
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
    Client = MongoClient(connection_string, tlsCAFile=ca)
    Client.drop_database(user)


def deleteProject(user, project):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    db.drop_collection(project)


def createHWSet(user, project, set_name):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    col = db[project]
    doc = {"Set Name": set_name}
    col.insert_one(doc)


def deleteHWSet(user, project, set_name):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    col = db[project]
    col.delete_one({"Set Name": set_name})


def checkOut(user, project, HWSet, item, qty, hw_type):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    col = db[project]
    data = col.find_one({"Set Name": HWSet})  # doc
    if data.__contains__(item):
        itemArr = data[item]
        num = itemArr[0]
        returnedVal = stockDB.checkOutItem(item, hw_type, qty)
        if returnedVal != 0:
            col.update_one({"Set Name": HWSet}, {"$set": {item: [int(returnedVal) + int(num), hw_type]}})
        else:
            col.update_one({"Set Name": HWSet}, {"$set": {item: [(int(num) + int(qty)), hw_type]}})
        # bug - qty user wants to check out might not be amt they actually can check out
    else:
        # hw_type = data["Set Type"]  # tells us type of item we want to check out, so we know where to find in stock db
        returnedVal = stockDB.checkOutItem(item, hw_type, qty)
        if returnedVal != 0:
            col.update_one({"Set Name": HWSet}, {"$set": {item: [returnedVal, hw_type]}})
        else:
            col.update_one({"Set Name": HWSet}, {"$set": {item: [qty, hw_type]}})


def checkIn(user, project, HWSet, item, qty):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client[user]
    col = db[project]
    doc = col.find_one({"Set Name": HWSet})
    itemArr = doc[item]
    userItemQty = itemArr[0]
    userItemType = itemArr[1]
    if int(qty) > int(userItemQty):
        qty = userItemQty
    col.update_one({"Set Name": HWSet}, {"$set": {item: [(int(userItemQty) - int(qty)), userItemType]}})
    stockDB.checkInItem(item, userItemType, qty)
