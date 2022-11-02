from pymongo import MongoClient
import certifi

ca = certifi.where()

def registerUser(username, password):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client["Passwords"]
    encryptedUser = encrypt(username)
    encryptedPass = encrypt(password)
    alrExists = db.list_collection_names().__contains__(encryptedUser)
    if alrExists:
        print("User already exists. Choose another name.")
        return "False"
    else:
        db.create_collection(encryptedUser)
        doc = {"Password": encryptedPass}
        col = db[encryptedUser]
        col.insert_one(doc)
        return "True"


def verifyLogin(username, password):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string, tlsCAFile=ca)
    db = Client["Passwords"]
    encryptedUser = encrypt(username)
    encryptedPass = encrypt(password)
    inDB = db.list_collection_names().__contains__(encryptedUser)
    if not inDB:
        print("Invalid username.")
        return "False"
    else:
        col = db[encryptedUser]
        passArr = col.find_one({}, {"_id": 0})
        actualPass = passArr["Password"]
        if actualPass == encryptedPass:
            return "True"
        else:
            return "False"


def encrypt(word):
    encrypted = ""
    for i in range(word.__len__()-1, -1, -1):
        encrypted += chr(ord(word[i])+7)
    return encrypted


def decrypt(word):
    original = ""
    for i in range(word.__len__()-1, -1, -1):
        original += chr(ord(word[i])-7)
    return original


# print(decrypt("zzhw"))