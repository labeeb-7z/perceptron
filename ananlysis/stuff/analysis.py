from transformers import pipeline
from googletrans import Translator


#analysis wrappers
translator = Translator()

nlp = pipeline("text-classification",
               model="j-hartmann/emotion-english-distilroberta-base",
               return_all_scores=True,truncation=True)



def translate(any_lang):
    translation = translator.translate(any_lang, dest='en')
    return translation.text


def get_category(comment: str):
    generated = nlp(comment)
    return generated[0]







#helpers
def one_hot(x):
    max = 0
    str = ""
    for elt in x:
        if elt["score"] > max:
            max = elt["score"]
            str = elt["label"]
    return str



#main fns
def analyze_tweet(tweets_object,tweet_id):
    analysis = {"tweet_id" : tweet_id, "reply_analysis": [] }
    replies = tweets_object["Replies"]

    for reply in replies:
        x = get_category(reply["text"])
        sentiment = one_hot(x)

        new_x = {
            "anger": x[0]["score"],
            "disgust": x[1]["score"],
            "fear": x[2]["score"],
            "joy": x[3]["score"],
            "neutral": x[4]["score"],
            "sadness": x[5]["score"],
            "surprise": x[6]["score"]
        }

        dict = {"tweet_id": reply["tweet_id"], "sentiment":sentiment, "analysis": new_x}
        analysis["reply_analysis"].append(dict)
    return analysis



def analyze_word(all_twts)  :

    analysis = []
    for twt in all_twts :
        x = get_category(twt["text"])
        sentiment = one_hot(x)

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
        analysis.append(dict)
    
    return analysis