
#!/usr/bin/env python
# -*- coding: utf-8 -*-

from elasticsearch import Elasticsearch 
from elasticsearch_dsl import Search
import io
import json

es=Elasticsearch([{'host':'localhost','port':9200}])

# Make sure we start with a clean index
try:
  es.indices.delete(index='eli')
except:
  print("no index found")

file = io.open("../DataCollection/NodeScraper/QA8.json")
data = json.load(file)
for obj in data['data']:
  if obj.get('post_score', 0) == 0:
    obj['score_ratio'] = 0
  else:
    obj['score_ratio'] = 1.0*obj['answer'].get('score', 0)/obj['post_score']
  es.index(index='eli',doc_type='question',body=obj)