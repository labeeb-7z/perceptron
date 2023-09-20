# FASTAPI REQ
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware


# CUSTOM REQ
import stuff
import uvicorn


twtr_collection = stuff.db["twitters"]
yt_collection = stuff.db["youtubes"]
word_collection = stuff.db["twittersearches"]

# init APP
app = FastAPI()
origins = [
    "*"
]
# handle cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)





@app.get("/twt_single")
def root(user_id, tweet_id):
    user = twtr_collection.find_one({"user_id": user_id})
    all_twts = user["tweets"]

    # search tweet
    for twt in all_twts:
        if (twt["tweet_id"] == tweet_id):
            analysis = stuff.analyze_tweet(twt, tweet_id)
            break

    # save result
    filter = {"user_id": user_id}
    if (twtr_collection.find({"tweet_analysis": {"$exists": True}})):
        twtr_collection.update_one(filter, {"$push": {"tweet_analysis": analysis}})
    else:
        twtr_collection.update_one(filter, {"$set": {"tweet_analysis": analysis}})

    return {"response": "success"}



@app.get("/twt_search")
def twt_search(word):
    all_twts = word_collection.find_one({"search": word})["tweets"]

    for twt in all_twts :
        x = stuff.get_category(twt["text"])
        sentiment = stuff.one_hot(x)

        new_x = {
            "anger": x[0]["score"],
            "disgust": x[1]["score"],
            "fear": x[2]["score"],
            "joy": x[3]["score"],
            "neutral": x[4]["score"],
            "sadness": x[5]["score"],
            "surprise": x[6]["score"]
        }

        dict = {"tweet_id": twt["tweet_id"], "sentiment":sentiment, "analysis": new_x}
        
        filter = {"search": word}
        if (word_collection.find({"tweet_analysis": {"$exists": True}})):
            word_collection.update_one(filter, {"$push": {"tweet_analysis": dict}})
        else:
            word_collection.update_one(filter, {"$set": {"tweet_analysis": dict}})

    return {"response": "success"}










@app.get("/yt_single")
def yt(channel_id, video_id):
    user = yt_collection.find_one({"channelId": channel_id})
    all_vids = user["videos"]


    for video in all_vids:
        if ((video["id1"])["videoId"] == video_id):
            analysis = {"video_id" : video_id, "comment_analysis": [] }


            for comment in (video["snippet"])["comments"]:
                
                translated = stuff.translate(comment["textOriginal"])

                x = stuff.get_category(translated)
                main_sentiment = stuff.one_hot(x)
                single_analysis = {
                    "sentiment": main_sentiment,
                    "analysis": {"anger": x[0]["score"],
                                 "disgust": x[1]["score"],
                                 "fear": x[2]["score"],
                                 "joy": x[3]["score"],
                                 "neutral": x[4]["score"],
                                 "sadness": x[5]["score"],
                                 "surprise": x[6]["score"]},
                    "analyzed_text" : translated
                                }
                analysis["comment_analysis"].append(single_analysis)


            filter = {"channelId": channel_id}
            if (yt_collection.find({"video_analysis": {"$exists": True}})):
                yt_collection.update_one(filter, {"$push": {"video_analysis": analysis}})
            else:
                yt_collection.update_one(filter, {"$set": {"video_analysis": analysis}})
            return {"response": "success"}



@app.get("/yt_all")
def yt(channel_id):
    user = yt_collection.find_one({"channelId": channel_id})
    all_vids = user["videos"]


    for video in all_vids:

        analysis = {"video_id" : (video["id1"])["videoId"], "comment_analysis": [] }

        for comment in (video["snippet"])["comments"]:
            
            translated = stuff.translate(comment["textOriginal"])
    
            x = stuff.get_category(translated)
            main_sentiment = stuff.one_hot(x)

            single_analysis = {
                "sentiment": main_sentiment,
                "analysis": {"anger": x[0]["score"],
                                "disgust": x[1]["score"],
                                "fear": x[2]["score"],
                                "joy": x[3]["score"],
                                "neutral": x[4]["score"],
                                "sadness": x[5]["score"],
                                "surprise": x[6]["score"]},
                "analyzed_text" : translated
                            }
            analysis["comment_analysis"].append(single_analysis)


        filter = {"channelId": channel_id}
        if (yt_collection.find({"video_analysis": {"$exists": True}})):
            yt_collection.update_one(filter, {"$push": {"video_analysis": analysis}})
        else:
            yt_collection.update_one(filter, {"$set": {"video_analysis": analysis}})
    
    return {"response": "success"}



    

if __name__ == "__main__":
    uvicorn.run("__main__:app", port=8000, reload=True)