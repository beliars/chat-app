export default class ChatService {
    constructor() {
        'ngInject;'
        this.msgList = [];
    }


    showMsg(message) {
        this.msgList.push(message);
        this.msgList;
        debugger;
    }

}