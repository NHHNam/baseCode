export class OrderDto{
    userName:any
    price:any
    createDate:any
    email:any
    constructor(userName:any,price:any,email:any) {
        this.userName = userName
        this.price = price
        this.createDate = new Date()
        this.email = email
    }
}