import clientElasticsearch from '../config/elastic.connect'
import UserUtils from './user.util';
export default class ElasticSearch {
    static connect = async()=> {
        try {
            clientElasticsearch.info().then(console.log("connect to elastic"),console.log)
            // const response = await clientElasticsearch.indices.create({
            //     index: 'pay',
            // });
            // await clientElasticsearch.indices.create({
            //     index: 'user',
            // });
            // await clientElasticsearch.indices.create({
            //     index: 'post',
            // });
            // console.log("elastic search " + JSON.stringify(response))
            // const response = await clientElasticsearch.cat.indices({
            // });
            await this.integrateIndex({
                Username:"user1010",
                Password:UserUtils.hashpassword("123"),
                Payment:"123213"
            },"user")
            const b = await this.searchIndex("user",{
                Username:'user1010'
            })
            console.log(b.hits.hits)
        }catch(err) {
            console.log(err)
        }
        
    }
    static integrateIndex = async(object :any,type:string)=>{
        return await clientElasticsearch.index({
            index: type,
            document: object
        })
    }
    
    static searchIndex = async(index:any,query:any) =>{
        const result = await clientElasticsearch.search({
            index: index,
            body: {
              query: {
                match: query,
              },
            },
          });
        return result
    }
}