import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const cors = require('cors');
const { uploadDataToElasticsearch } = require('./exelToElasticSearch.cjs');

const app = express();
const port = 5000;

app.use(cors());

const client = new Client({ node: process.env.ELASTICSEARCH_URL });

app.get('/search', async (req, res) => {
    const query = req.query.q || '';
    console.log(query);

    try {
        const result = await client.search({
            index: 'iata',
            body: {
                query: {
                    match: {
                        name: query,
                    },
                },
            },
        });

        res.json(result.hits.hits.map(hit => hit._source));
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data from Elasticsearch');
    }
});

app.listen(port, () => {
    uploadDataToElasticsearch().then(result => {
        if (result) {
            console.log(`Server running on http://localhost:${port}`)
        } else {
            console.log('Upload failed');
        }
    });
});