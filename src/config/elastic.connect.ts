const { Client } = require('@elastic/elasticsearch');
const  client =  new Client({ node: 'http://localhost:9200' });
const connectElastic = ()=>{
    client.info().then(console.log,console.log)
}
export default connectElastic