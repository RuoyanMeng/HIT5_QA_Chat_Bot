#!/usr/bin/env python
# -*- coding: utf-8 -*-

from elasticsearch import Elasticsearch 
from elasticsearch_dsl import Search

es=Elasticsearch([{'host':'localhost','port':9200}])


query = input("What would you like to search for? ")

obj = {
  "min_score": 7,
  "query": {
    "multi_match" : {
      "query" : query,
         "fields" : [ "title^3", "question_detail", "answer.text"] 
      }
    },
  "rescore" : {
    "query": {
      "rescore_query": {
        "function_score": {
          "field_value_factor": { 
            "field": "score_ratio",
          },
          "max_boost": 2
        }
      },
      "query_weight" : 0.7,
      "rescore_query_weight" : 10
    }
  }
}


response = es.search(index="eli", body=obj)

for hit in response['hits']['hits']:
    print (hit['_source']['answer']['text'])
    print (hit['_source']['full_link'])
    print (hit['_source']['post_score'])
    print (hit['_source']['score_ratio'])

    bla = input("ok")
