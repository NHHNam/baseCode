"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDto = void 0;
class OrderDto {
    constructor(userName, price, email) {
        this.userName = userName;
        this.price = price;
        this.createDate = new Date();
        this.email = email;
    }
}
exports.OrderDto = OrderDto;
//# sourceMappingURL=OrderDto.js.map