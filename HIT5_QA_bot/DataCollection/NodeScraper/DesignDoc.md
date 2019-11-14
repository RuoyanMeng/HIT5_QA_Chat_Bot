# Node Reddit QA scraper

We look at fixed time intervals of say 1 week.

For every week, we take the top 100 submissions in terms of upvotes.

We filter out those without comments.

We take the first comment and put it along with the question in a json object.