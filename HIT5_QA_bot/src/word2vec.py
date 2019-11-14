
from gensim.test.utils import get_tmpfile
from gensim.models import Word2Vec
from gensim.utils import simple_preprocess
import json
import re

# all files need to be in the same format as QA4.json
def input(filenames):
    data = []
    for filename in filenames:
        with open('./DataCollection/NodeScraper/'+filename, encoding='utf-8', mode='r') as f:
            for line in f:
                line = line.strip(',\n')
                data.append(json.loads(line))
    return data

def clean(string):
    s = re.sub(r'\[removed\]|\[deleted\]|ELI5|\(http[s]?://.+\)','',string)
    return s

def preprocess(data):
    text = []
    for doc in data:
        string = " ".join(doc.values())
        string = clean(string)
        string = simple_preprocess(string)
        text.append(string)
    return text

if __name__ == '__main__':

    # load the trained model
    model = Word2Vec.load("./src/word2vec.model")
    vector = model.wv['blue']
    model.most_similar(['blue'])

    ### training process
    '''
    # data input
    filenames = ['QA.json','QA4.json','QA5.json','QA6.json','QA7.json']
    data = input(filenames)
    text = preprocess(data)

    # train with json files
    path = get_tmpfile("./src/word2vec.model")
    model = Word2Vec(text, size=100, window=5, min_count=1, workers=4)
    model.save("word2vec.model")
    
    #
    vector = model.wv['blue']
    model.most_similar(['blue'])
    '''

