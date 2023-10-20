const client = require("./config");

const UserService = {

    //Get User by ID
    getUserByID: async(req, res) => {
        const { user, type, id } = req.params;
        const { pretty } = req.query;

        try {
            const { body } = await client.get({
                index: user,
                type,
                id,
                pretty: pretty === 'true',
            });

            res.json({ data: body });
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi truy xuất dữ liệu' });
        }
    },

    //Get all User
    getAllUser: async(req, res) => {
        try {
            const { body } = await client.search({
                index: 'user',
                body: {
                    query: {
                        match_all: {},
                    },
                },
            });

            res.json({ users: body.hits.hits });
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi truy xuất dữ liệu' });
        }
    },

    //Add User
    addUser: async(req, res) => {
        try {
            const userData = req.body;
            // Use the Elasticsearch client to index the user data
            const { body } = await client.index({
                index: 'user', // Replace with your Elasticsearch index name
                body: userData,
            });

            res.json({ message: 'User created successfully', elasticsearchResponse: body });
        } catch (error) {
            console.error('Error creating user in Elasticsearch:', error);
            res.status(500).json({ error: 'Failed to create user in Elasticsearch' });
        }
    },

    // Update a user (PUT)
    updateUser: async(req, res) => {
        try {
            // Extract user data from the request body
            const userData = req.body;
            const { id } = req.params;

            // Perform the Elasticsearch update operation to modify an existing document
            const { body } = await client.update({
                index: 'user', // Replace with your Elasticsearch index
                id,
                body: {
                    doc: userData,
                },
            });

            res.json({ user: body });
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi cập nhật tài liệu' });
        }
    },

    // Delete a user (DELETE)
    deleteUser: async(req, res) => {
        try {
            const { id } = req.params;

            // Perform the Elasticsearch delete operation to remove a document
            const { body } = await client.delete({
                index: 'user', // Replace with your Elasticsearch index
                id,
            });

            res.json({ user: body });
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi xóa tài liệu' });
        }
    },

    //Add Post
    addPost: async(req, res) => {
        try {
            const postData = req.body;

            const { body } = await client.index({
                index: 'post',
                body: postData,
            });

            res.json({ message: 'Post created successfully', elasticsearchResponse: body });
        } catch (error) {
            console.error('Error creating post in Elasticsearch:', error);
            res.status(500).json({ error: 'Failed to create post in Elasticsearch' });
        }
    },
    //Get Post by ID
    getPostByID: async(req, res) => {
        const { post, type, id } = req.params;
        const { pretty } = req.query;

        try {
            const { body } = await client.get({
                index: post,
                type,
                id,
                pretty: pretty === 'true',
            });

            res.json({ data: body });
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi truy xuất dữ liệu' });
        }
    },

    //Get all Post
    getAllPost: async(req, res) => {
        try {
            const { body } = await client.search({
                index: 'post',
                body: {
                    query: {
                        match_all: {},
                    },
                },
            });

            res.json({ posts: body.hits.hits });
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi truy xuất dữ liệu' });
        }
    },
    // Update  (PUT)
    updatePost: async(req, res) => {
        try {
            // Extract user data from the request body
            const postData = req.body;
            const { id } = req.params;

            // Perform the Elasticsearch update operation to modify an existing document
            const { body } = await client.update({
                index: 'post', // Replace with your Elasticsearch index
                id,
                body: {
                    doc: postData,
                },
            });

            res.json({ post: body });
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi cập nhật tài liệu' });
        }
    },

    // Delete 
    deletePost: async(req, res) => {
        try {
            const { id } = req.params;

            // Perform the Elasticsearch delete operation to remove a document
            const { body } = await client.delete({
                index: 'post', // Replace with your Elasticsearch index
                id,
            });

            res.json({ post: body });
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi xóa tài liệu' });
        }
    },


    //Get Payment by ID
    getPaymentByID: async(req, res) => {
        const { payment, type, id } = req.params;
        const { pretty } = req.query;

        try {
            const { body } = await client.get({
                index: payment,
                type,
                id,
                pretty: pretty === 'true',
            });

            res.json({ data: body });
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi truy xuất dữ liệu' });
        }
    },

    //Get all Payment
    getAllPayment: async(req, res) => {
        try {
            const { body } = await client.search({
                index: 'payment',
                body: {
                    query: {
                        match_all: {},
                    },
                },
            });

            res.json({ payments: body.hits.hits });
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi truy xuất dữ liệu' });
        }
    },
    // Update 
    updatePayment: async(req, res) => {
        try {
            // Extract user data from the request body
            const paymentData = req.body;
            const { id } = req.params;

            // Perform the Elasticsearch update operation to modify an existing document
            const { body } = await client.update({
                index: 'payment', // Replace with your Elasticsearch index
                id,
                body: {
                    doc: paymentData,
                },
            });

            res.json({ payment: body });
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi cập nhật tài liệu' });
        }
    },

    // Delete 
    deletePayment: async(req, res) => {
        try {
            const { id } = req.params;

            // Perform the Elasticsearch delete operation to remove a document
            const { body } = await client.delete({
                index: 'payment', // Replace with your Elasticsearch index
                id,
            });

            res.json({ payment: body });
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi xóa tài liệu' });
        }
    },
    //Add User
    addPayment: async(req, res) => {
        try {
            const paymentData = req.body;

            const { body } = await client.index({
                index: 'payment',
                body: paymentData,
            });

            res.json({ message: 'Payment created successfully', elasticsearchResponse: body });
        } catch (error) {
            console.error('Error creating payment in Elasticsearch:', error);
            res.status(500).json({ error: 'Failed to create payment in Elasticsearch' });
        }
    }
}
module.exports = UserService;