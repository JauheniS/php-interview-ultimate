---
title: 'Elasticsearch Concepts'
slug: '/answers/elasticsearch'
---

# Elasticsearch Concepts

## Main Features

- **Distributed & Real-time**: Data is indexed and searchable almost instantly across a cluster of nodes.
- **RESTful API**: Interacts with the data using standard HTTP methods and JSON.
- **Full-Text Search**: Powered by Apache Lucene, it handles complex text searches (fuzzy matching, highlighting, stemming).
- **Document-Oriented**: Data is stored as JSON documents, making it schema-less (though schemas can be defined).
- **Inverted Index**: Instead of storing strings, it stores an index of terms and which documents contain them, making searching extremely fast.
- **Scalability**: Sharding and replication allow it to handle massive amounts of data and provide high availability.

---

## Analyzers

Analyzers are used during indexing and searching to process text. An analyzer consists of:

1. **Character Filters**: Modify the text before tokenization (e.g., removing HTML tags).
2. **Tokenizer**: Splits the text into tokens (usually words).
3. **Token Filters**: Modify tokens (e.g., lowercasing, removing stop words like "the" or "and", stemming).

### Standard Analyzer

The default analyzer that works well for most languages. It tokenizes on word boundaries and removes punctuation.

### Custom Analyzers

You can define your own analyzers to handle specific cases, like indexing email addresses or product IDs.
