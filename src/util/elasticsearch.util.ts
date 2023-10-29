import clientElasticsearch from '../config/elastic.connect'
export default class ElasticSearch {
    static connect = async()=> {
        try {
            await clientElasticsearch.info().then(console.log("connect to elastic"),console.log)
            // await clientElasticsearch.indices.create({index:['user','post','pay']}).then(console.log)
        }catch(err) {
            console.log(err)
        }
    }
    static integrateIndex = async(object :any,type:string)=>{
        let id = object._id.toString()
        console.log('integrate index ' + object)
        switch(type){
            case 'user' :
                await clientElasticsearch.index({
                    index:type || "test",
                    id:id||'123',
                    body:{
                        Username: object.Username,
                        Email:  object.Email ,
                        Payment:  object.Payment,
                        Password:  object.Password,
                        FullName:  object.FullName,
                        Point: object.Point,
                        Role: 'User',
                        CreatedAt: object.CreatedAt,
                        UpdateAt: new Date(),
                        isLock: false,
                        id: object._id.toString()
                    }
                })
                break
            case 'payment' :
                await clientElasticsearch.index({
                    index:type || "payment",
                    id:id||'error',
                    body:{
                        UserId: object.UserId.toString(),
                        CardId:  object.CardId ,
                        FullName:  object.FullName,
                        NameCard:  object.NameCard,
                        CreatedAt: object.CreatedAt,
                        UpdateAt: new Date(),
                        id: object._id.toString()
                    }
                })
                break
            case 'post' :
                await clientElasticsearch.index({
                    index:type || "post",
                    id:id||'error',
                    body:{
                        UserId: object.UserId,
                        Description:  object.Description ,
                        Title:  object.Title,
                        Thumbnail:object.Thumbnail,
                        CreatedAt: object.CreatedAt,
                        UpdateAt: new Date(),
                        id: object._id.toString()
                    }
                })
                break;

        }
        
       
        let temp = await this.searchIndex(type,{id: id})
        console.log(temp.hits.hits)
        return object
        // return await clientElasticsearch.index({
        //     index: type,
        //     document: object
        // })
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