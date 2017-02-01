class ChatController {
    constructor(Restangular, BotService, $timeout, $interval, $scope) {
        this.botService = BotService;
        this.restangular = Restangular;
        this.$timeout = $timeout;
        this.$interval = $interval;
        this.messages = [];
        this.$scope = $scope;
        this.isTyping = false;
        this.index = 0;
        this.gender = {
            text: '',
            user: true
        };
        this.love = {
            text: '',
            user: true
        };
        this.problem = {
            text: '',
            user: true
        };
    }

    $onInit() {
        // for (let i = 0; i < 3; i++) {
        //     this.messages.push(this.botService.questions[i]);
        //     this.index = i;
        // }
        let interval = this.$interval(() => {
            this.isTyping = true;
            this.messages.push(this.botService.questions[this.index]);
            this.index++;
            if(this.messages.length === 3) {
                this.$interval.cancel(interval);
                this.isTyping = false;
            }
        }, 2000);
    }

    // answer() {
    //     this.index += 1;
    //     if (this.index < this.botService.questions.length) {
    //         this.messages.push(this.botService.questions[this.index]);
    //     }
    // }

    onSubmitGender(form) {
        if (form.$valid) {
            this.messages.push(this.gender);
            this.addNewQuestion();
        }
    }

    onSubmitLove(form) {
        if (form.$valid) {
            this.messages.push(this.love);
            this.addNewQuestion();
        }
    }

    onSubmitProblem(form) {
        if (form.$valid) {
            this.messages.push(this.problem);
            this.addNewQuestion();
        }
    }

    addNewQuestion() {
        this.isTyping = true;
        let promise = new Promise((resolve, reject) => {
            this.$timeout(() => {
                this.index += 1;
                if (this.index < this.botService.questions.length) {
                    this.messages.push(this.botService.questions[this.index]);
                }
                return resolve();
            }, 2000);
        });
        promise.then(() => {
            this.isTyping = false;
            this.$scope.$apply();
        });
    }
}

export default ChatController;
