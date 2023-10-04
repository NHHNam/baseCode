import mongoose from "mongoose";

class Database {
  static INSTANCE: any;
  MONGO_URI: string =
    process.env.MONGO_URI ||
    "mongodb+srv://haison:haison@nodeexpressproject.adv3gf0.mongodb.net/TASK-COMPANY-1?retryWrites=true&w=majority";
  constructor() {
    this.connect();
  }

  private connect(typeDb: string = "MongoDb") {
    mongoose
      .connect(this.MONGO_URI)
      .then(() => console.log(`Connect ${typeDb} Successfully`))
      .catch((err) => console.log(err));
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new Database();
    return this.INSTANCE;
  }
}

export default Database.getInstance();
