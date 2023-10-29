import { Server } from "http";
import { Socket } from "socket.io";
import ElasticSearch from "../util/elasticsearch.util";
import clientElasticsearch from '../config/elastic.connect'

export default class SocketServer {
    static start= async(server:Server) => {
        try {
            let io = new Server(server)
            io.on("connection", (socket:Socket) => {
                console.log("New client connected:", socket.id);
                socket.on("chat", () => {
                  console.log("Received 'hello' from client");
                });
                socket.on("user_join", async function(data) {
                    await ElasticSearch.searchIndex('chat',{room:data.room})
                    console.log("test chat real time " + data)
                    socket.broadcast.emit("user_join", data);
                });
            
                socket.on("chat_message", async function(data) {
                    console.log('chat real time ' + data)
                    await clientElasticsearch.index({
                        index:'room ' + data.room || "test",
                        body:{
                            userName:data.userName,
                            msg:data.msg
                        }
                    })
                    socket.broadcast.emit("chat_message", data);
                });
            
                socket.on("disconnect", function(data) {
                });
            });
        } catch(err) {
            console.log("err connect to socket server " + err)
        }
    }
}