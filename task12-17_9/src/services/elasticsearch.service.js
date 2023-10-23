import { Client } from '@elastic/elasticsearch';
import fs from 'fs';

const client = new Client({
    cloud: {
        id: '49015ea6348f44e19d60e20de6c1bba7:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQ4ZDQ2MGI2ZDY1YTQ0Nzg0YjRkYmJlZDY0MjYzYTY3ZCQ5NmZlYTBmMmQ1Nzg0MGFiYjJkMjg3MDAwMTMyZmZkZg==',
    },
    auth: { apiKey: 'eE1hOFVZc0JWSzd6dVQwUE5HT1M6cDlkRmlrVllRSGV0d1BQT0ZNV01uUQ==' },
});

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

export const search = async (_index, query) => {
    try {
        const indexExists = await client.indices.exists({ index: _index });
        if (indexExists) {
            await client.indices.delete({ index: _index });
        }

        await client.indices.create(
            {
                index: _index,
                operations: {
                    mappings: {
                        properties: {
                            account_number: { type: 'integer' },
                            balance: { type: 'integer' },
                            firstname: { type: 'text' },
                            lastname: { type: 'text' },
                            age: { type: 'integer' },
                            gender: { type: 'text' },
                            address: { type: 'text' },
                            employer: { type: 'text' },
                            email: { type: 'text' },
                            city: { type: 'text' },
                            state: { tystatepe: 'text' },
                        },
                    },
                },
            },
            { ignore: [400] },
        );

        const operations = data.flatMap((doc) => [{ index: { _index } }, doc]);
        if (operations.length > 0) {
            // Thêm dữ liệu vào chỉ mục
            await client.bulk({ refresh: true, body: operations });
        }

        // Let's search!
        const result = await client.search({
            index: _index,
            body: {
                query: {
                    query_string: {
                        query: `*${query}*`,
                        allow_leading_wildcard: true,
                    },
                },
            },
        });

        // console.log(result.hits.hits);
        return result.hits.hits;
    } catch (error) {
        console.log(error);
        throw new Error('Cannot use elastic search service');
    }
};
