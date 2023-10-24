import { assuredworkloads } from 'googleapis/build/src/apis/assuredworkloads'
import clientElasticsearch from '../config/elastic.connect'
export default class ElasticSearch {
    static connect = async()=> {
        clientElasticsearch.info().then(console.log("connect to elastic"),console.log)
         await this.createIndex("user");
    }
    static integrateIndex = async(object :any,type:string)=>{
        let a =  await clientElasticsearch.index({
            index: type,
                document: object
        })
        console.log("elastic search " + JSON.stringify(a))
    }
    static createIndex = async (indexName:string) => {
      let body  = {
        mappings: {
          properties: {
            Username:{
              type:'text',
              unique:true 
          },
          Email:{
              type:'text',
          },
          Payment:{
              type:'text',
          },
          Password:{
              type:'text',
          },
          FullName:{
              type:'text',
          },
          Point:{
              type:'integer',
          },
          Role:{
              type:'text',
          },
          CreatedAt:{
              type:Date,
          },
              type:Date,
          },
          isLock:{
              type:Boolean,
          }
          },
        }
      let a = await clientElasticsearch.indices.create({ index: indexName ,body});
      console.log("elastic search index " + JSON.stringify(a))
    };
    static searchIndex = async(index:any,query:any) =>{
        const result = await clientElasticsearch.search({
            index: index,
            query: query
        })
        return result
        }
}