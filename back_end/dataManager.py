from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')

# Access a specific database
db = client['my_database']

# Access a specific collection within the database
collection = db['my_collection']

# Insert a document into the collection
new_document = {'name': 'John', 'age': 30}
result = collection.insert_one(new_document)
print('Inserted document ID:', result.inserted_id)

# Find documents in the collection
query = {'name': 'John'}
found_documents = collection.find(query)
for document in found_documents:
    print(document)

# Update a document in the collection
update_query = {'name': 'John'}
new_values = {'$set': {'age': 35}}
update_result = collection.update_one(update_query, new_values)
print('Modified documents count:', update_result.modified_count)

# Delete a document from the collection
delete_query = {'name': 'John'}
delete_result = collection.delete_one(delete_query)
print('Deleted documents count:', delete_result.deleted_count)

# Disconnect from MongoDB
client.close()
