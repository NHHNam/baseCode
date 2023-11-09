"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const decorators_1 = require("@nestjs/common/decorators");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    sendEmailByAdminServer(email, userName) {
        return this.appService.sendOPtByGateway(email, userName);
    }
    sendEmailByMicroservice(email, userName) {
        let a = this.appService.sendOptByMicroservice(email, userName);
        console.log(a);
        return a;
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('/userService/:email/:userName'),
    __param(0, (0, decorators_1.Param)('email')),
    __param(1, (0, decorators_1.Param)('userName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "sendEmailByAdminServer", null);
__decorate([
    (0, common_1.Get)('/kafka/:email/:userName'),
    __param(0, (0, decorators_1.Param)('email')),
    __param(1, (0, decorators_1.Param)('userName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "sendEmailByMicroservice", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map