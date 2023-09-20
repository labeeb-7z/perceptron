import pymongo

myclient = pymongo.MongoClient("$mongo")

db = myclient["test"]

# twtr_collection = db["twitters"]


# user = twtr_collection.find_one({"user_id": "828894693463359489"})
# analysis = user["tweet_analysis"]
# i=0
# for twt in analysis :
#     overall = {
#         "anger": 0,
#         "disgust": 0,
#         "fear": 0,
#         "joy": 0,
#         "neutral": 0,
#         "sadness": 0,
#         "surprise": 0
#     }
#     replies = twt["reply_analysis"]

#     for reply in replies :
#         ra = reply["analysis"]
#         overall["anger"] += ra["anger"]
#         overall["disgust"] += ra["disgust"]
#         overall["fear"] += ra["fear"]
#         overall["joy"] += ra["joy"]
#         overall["neutral"] += ra["neutral"]
#         overall["sadness"] += ra["sadness"]
#         overall["surprise"] += ra["surprise"]

#     if(len(replies) != 0) :
#         overall["anger"] /= len(replies)
#         overall["disgust"] /= len(replies)
#         overall["fear"] /= len(replies)
#         overall["joy"] /= len(replies)
#         overall["neutral"] /= len(replies)
#         overall["sadness"] /= len(replies)
#         overall["surprise"] /= len(replies)
#     print("updated : ", twt["tweet_id"])
#     twtr_collection.update_one({"user_id": "828894693463359489"}, {"$set": {f"tweet_analysis.{i}.overall_analysis": overall}})
#     i+=1



yt_collection = db["youtubes"]


user = yt_collection.find_one({"channelId": "UCY6N8zZhs2V7gNTUxPuKWoQ"})
analysis = user["video_analysis"]
i=0
for vid in analysis :
    overall = {
        "anger": 0,
        "disgust": 0,
        "fear": 0,
        "joy": 0,
        "neutral": 0,
        "sadness": 0,
        "surprise": 0
    }

    replies = vid["comment_analysis"]

    for reply in replies :
        ra = reply["analysis"]
        overall["anger"] += ra["anger"]
        overall["disgust"] += ra["disgust"]
        overall["fear"] += ra["fear"]
        overall["joy"] += ra["joy"]
        overall["neutral"] += ra["neutral"]
        overall["sadness"] += ra["sadness"]
        overall["surprise"] += ra["surprise"]

    if(len(replies) != 0) :
        overall["anger"] /= len(replies)
        overall["disgust"] /= len(replies)
        overall["fear"] /= len(replies)
        overall["joy"] /= len(replies)
        overall["neutral"] /= len(replies)
        overall["sadness"] /= len(replies)
        overall["surprise"] /= len(replies)
    print("updated : ", vid["video_id"])
    yt_collection.update_one({"channelId": "UCY6N8zZhs2V7gNTUxPuKWoQ"}, {"$set": {f"video_analysis.{i}.overall_analysis": overall}})
    i+=1