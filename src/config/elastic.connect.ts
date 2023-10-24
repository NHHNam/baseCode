const { Client } = require('@elastic/elasticsearch');
const clientElasticsearch = new Client({
    node: 'https://localhost:9200',
    auth: {
      username: 'elastic',
      password: 'F-8Nlw5a6W4WQ*kXHc0f'
    },
    //
    //caFingerprint: "9f86f0c322dc5decdf335f44210cf2a33adb46debc9d200ec53605c570fb4d54",
    tls: {
      //9f86f0c322dc5decdf335f44210cf2a33adb46debc9d200ec53605c570fb4d54
    // might be required if it's a self-signed certificate
    rejectUnauthorized: false
  }
  })
export default clientElasticsearch