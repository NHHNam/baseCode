import { Client } from '@elastic/elasticsearch';
import fs from 'fs';
import { ppid } from 'process';

const client = new Client({
    node: 'https://80a1a3d5412e43edab764126fa264489.us-central1.gcp.cloud.es.io',
    auth: {
        apiKey: 'Z2cydzRvc0JRdENwNTVMcEd3bWg6SlFCWW0tV0VUNW15dVVKc1ZJTndPQQ==',
    },
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
        console.log(result);
        // console.log(result.hits.hits);
        return result.hits.hits;
    } catch (error) {
        throw error;
    }
};
export const searchAsync = async (_index, query, data) => {
    const data_parsed = [];
    data.forEach((item) => {
        const index = { index: { _id: item.id.toString() } };
        data_parsed.push(index, item);
    });
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
                            _id: { type: 'text' },
                            userName: { type: 'text' },
                            payment: { type: 'text' },
                            password: { type: 'text' },
                            email: { type: 'text' },
                            fullName: { type: 'text' },
                            role: { type: 'text' },
                            isLock: { type: 'text' },
                            createdAt: { type: 'text' },
                            updatedAt: { type: 'text' },
                        },
                    },
                },
            },
            { ignore: [400] },
        );
        const operations = data_parsed.flatMap((doc) => [{ index: { _index } }, doc]);
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
        console.log(query);
        console.log(result);

        // console.log(result.hits.hits);
        return result.hits.hits;
    } catch (error) {
        throw error;
    }
};
