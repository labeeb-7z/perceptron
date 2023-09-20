import pymongo

myclient = pymongo.MongoClient("$mongo")

db = myclient["test"]