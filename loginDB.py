from pymongo import MongoClient

def registerUser(username, password):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)


def verifyLogin(username, password):
    connection_string = "mongodb+srv://salehahmad:rMbinVQqIZXr9fSS@deskupcluster.mifqwta.mongodb.net/test"
    Client = MongoClient(connection_string)


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


