class ChatController {
  constructor(Restangular, BotService) {
    this.name = 'home';
    this.botService = BotService;
    this.restangular = Restangular;
    this.messages = [];
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
    for(let i=0; i<3; i++) {
        this.messages.push(this.botService.questions[i]);
        this.index = i;
    }
  }

  answer() {
    this.index += 1;
    if(this.index < this.botService.questions.length) {
        this.messages.push(this.botService.questions[this.index]);
    }
  }

    onSubmitGender(form) {
        if(form.$valid) {
            this.messages.push(this.gender);
            this.addNewQuestion();
            console.log(this.messages);
        }
    }

    onSubmitLove(form) {
        if(form.$valid) {
            this.messages.push(this.love);
            this.addNewQuestion();
        }
    }

    onSubmitProblem(form) {
        if(form.$valid) {
            this.messages.push(this.problem);
            this.addNewQuestion();
        }
    }

    addNewQuestion() {
        this.index += 1;
        if (this.index < this.botService.questions.length) {
            this.messages.push(this.botService.questions[this.index]);
        }
    }
}

export default ChatController;
