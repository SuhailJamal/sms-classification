from flask import Flask, jsonify, request
import pickle
import nltk
from string import punctuation
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

app = Flask(__name__)

ps = PorterStemmer()


def transform_text(text):
    text = text.lower()
    text = nltk.word_tokenize(text)
    res = []
    for val in text:
        if (
            val.isalnum()
            and val not in punctuation
            and val not in stopwords.words("english")
        ):
            res.append(ps.stem(val))
    return " ".join(res)


with open("logistic_model.pkl", "rb") as f:
    logreg = pickle.load(f)

with open("bernoulli.pkl", "rb") as f:
    bernoulli = pickle.load(f)

with open("countvector.pkl", "rb") as f:
    countvector = pickle.load(f)


@app.route("/")
def hello_world():
    return jsonify({"message": "The backend is working perfectly"})


@app.route("/predict", methods=["POST"])
def get_prediction():
    data = request.get_json()
    print(data)
    text = data["text"]
    text = transform_text(text)
    tranformed = countvector.transform([text])
    prediction = logreg.predict(tranformed)
    print(prediction)
    print(type(prediction))
    prediction = int(prediction[0])
    return jsonify({"prediction": prediction})


if __name__ == "__main__":
    app.run(debug=True, port=5001)
