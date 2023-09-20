import pytesseract
from PIL import Image
import requests
# from io import BytesIO

def ocr_image_from_url(image_url):
    try:
        response = requests.get(image_url, stream=True)

        if response.status_code == 200:
            # image = Image.open(BytesIO(response.content))
            # text = pytesseract.image_to_data(image)

            image = Image.open(response.raw)
            text = pytesseract.image_to_string(image)

            return text
        else:
            return f"Failed to fetch the image. Status code: {response.status_code}"
    except Exception as e:
        return f"An error occurred: {str(e)}"


from transformers import pipeline
from googletrans import Translator


translator = Translator()

nlp = pipeline("text-classification",
               model="j-hartmann/emotion-english-distilroberta-base",
               return_all_scores=True)






def translate(any_lang):
    translation = translator.translate(any_lang, dest='en')
    return translation.text


def get_category(comment: str):
    generated = nlp(translate(comment))

    return generated[0]


url = "https://pbs.twimg.com/media/F5_Ol-QXAAAGcBR.png"
result = ocr_image_from_url(url)


print(get_category(result))