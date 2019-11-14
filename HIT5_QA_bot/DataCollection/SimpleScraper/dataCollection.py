import json, requests, math

subreddit = 'explainlikeimfive'
posts = []

questionFile = "questions.txt"
answerFile = "answers.txt"

class Post:
    def __init__(self, question, post_id, post_number):
        self.question = question
        self.id = post_id
        self.post_number = post_number
        self.answer = ""

    def scrapAnswer(self):
        r = requests.get(
            'http://www.reddit.com/r/{}/comments/{}.json'.format(subreddit, self.id),
            headers={'user-agent': 'Mozilla/5.0'}
        )
        comments = r.json()
        op = comments.pop(0)
        try:
            self.answer = comments[0]['data']['children'][0]['data']['body']
            i=1
            while "I am a bot" in self.answer or "[removed]" == self.answer:
                self.answer = comments[0]['data']['children'][i]['data']['body']
                i+=1
            self.answer = self.answer.replace('\n', ' ')
        except:
            print("failed")

    def getQuestion(self):
        return self.question
    def getAnswer(self):
        return self.answer
    def getPostNumber(self):
        return self.post_number

def scraper(n):
    number = math.ceil(n / 25.0)
    last_id = ""
    post_number = 0
    for i in range(number):
        r = requests.get(
            'http://www.reddit.com/r/{}.json?count={}&after={}'.format(subreddit, post_number, last_id),
            headers={'user-agent': 'Mozilla/5.0'}
        )

        for post in r.json()['data']['children']:
            last_id = post['data']['name']
            print(str(post_number) + " " + last_id + " " +  post['data']['title'])

            posts.append(Post(post['data']['title'], post['data']['id'], post_number))
            posts[-1].scrapAnswer()
            post_number += 1

            with open(questionFile, 'a') as q, open(answerFile, 'a') as a:
                nb = str(posts[-1].getPostNumber())
                q.writelines(nb + " " + posts[-1].getQuestion())
                q.writelines("\n")

                a.writelines(nb + " " + posts[-1].getAnswer())
                a.writelines("\n")


scraper(50000)
