const { Client } = require('@elastic/elasticsearch');

// Khởi tạo client Elasticsearch với URL của máy chủ Elasticsearch
const client = new Client({ node: 'http://localhost:9200' });
module.exports = client;