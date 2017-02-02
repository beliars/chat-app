class ChatController {
    constructor(Restangular, BotService, $timeout, $interval, $scope) {
        this.botService = BotService;
        this.restangular = Restangular;
        this.$timeout = $timeout;
        this.$interval = $interval;
        this.messages = [];
        this.$scope = $scope;
        this.isTyping = false;
        this.showForms = false;
        this.showCards = false;
        this.index = 0;
        this.firstForm = {
            text: '',
            user: true
        };
        this.secondForm = {
            text: '',
            user: true
        };
        this.thirdForm = {
            text: '',
            user: true
        };
        this.fourthForm = {
            text: '',
            user: true
        };
    }

    $onInit() {
        this.isTyping = true;
        let interval = this.$interval(() => {
            this.messages.push(this.botService.questions[this.index]);
            this.index++;
            if(this.messages.length === 3) {
                this.$interval.cancel(interval);
            this.isTyping = false;
            this.showForms = true;
            }
        }, 1200);

        // this.$timeout(() => {
        //     this.addNewQuestion();
        // }, 2000);

        // for (let i = 0; i < 3; i++) {
        //     this.messages.push(this.botService.questions[i]);
        //     this.index = i;
        // }
    }

    onSubmit(form) {
        if(form.$valid) {
            this.showForms = false;
            switch(form.$name) {
                case 'firstForm':
                    this.messages.push(this.firstForm);
                    this.timeoutAddQuestion(2000);
                    break;
                case 'secondForm':
                    this.messages.push(this.secondForm);
                    this.timeoutAddQuestion(1000);
                    break;
                case 'thirdForm':
                    this.messages.push(this.thirdForm);
                    this.timeoutAddQuestion(500);
                    break;
                case 'fourthForm':
                    this.messages.push(this.fourthForm);
                    this.timeoutAddQuestion(3000);
                    this.onShowCards(9000);
                    break;
                default:
                    alert('Unknown error');
            }
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
            this.showForms = true;
            this.$scope.$apply();
        });
    }

    timeoutAddQuestion(ms) {
        this.$timeout(() => {
            this.addNewQuestion();
        }, ms);
    }

    onShowCards(ms) {
        this.$timeout(() => {
           this.showCards = true;
        }, ms);
    }

    onChooseCard(card) {
        console.log('Card chosen');
        console.log(card);
        // this.showCards = false;
    }
}

export default ChatController;
