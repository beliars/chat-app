class ChatController {
  constructor(Restangular, ChatService, $timeout, $interval, $scope) {
    this.chatService = ChatService;
    this.restangular = Restangular;
    this.$timeout = $timeout;
    this.$interval = $interval;
    this.messages = [];
    this.$scope = $scope;
    this.isTyping = false;
    this.showForms = false;
    this.showCards = false;
    this.index = -1;
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
    this.timeoutAddQuestion(500)
      .then(() => this.timeoutAddQuestion(1000))
      .then(() => this.timeoutAddQuestion(1000))
      .then(() => this.onShowForms());


    // let interval = this.$interval(() => {
    //   this.messages.push(this.chatService.questions[this.index]);
    //   this.index++;
    //   if (this.messages.length === 3) {
    //     this.$interval.cancel(interval);
    //     this.isTyping = false;
    //     this.showForms = true;
    //   }
    // }, 1500);
  }

  onSubmit(form) {
    if (form.$valid) {
      this.showForms = false;
      switch (form.$name) {
        case 'firstForm':
          this.messages.push(this.firstForm);
          this.timeoutAddQuestion(2000)
            .then(() => this.onShowForms());
          break;
        case 'secondForm':
          this.messages.push(this.secondForm);
          this.timeoutAddQuestion(1500)
            .then(() => this.onShowForms());
          break;
        case 'thirdForm':
          this.messages.push(this.thirdForm);
          this.timeoutAddQuestion(3000)
            .then(() => this.onShowForms());
          break;
        case 'fourthForm':
          this.messages.push(this.fourthForm);
          this.timeoutAddQuestion(1500)
            .then(() => {
            this.onShowForms();
            this.onShowCards(3000);
          });
          break;
        default:
          alert('Unknown error');
      }
    }
  }

  // addNewQuestion() {
  //     this.isTyping = true;
  //     let promise = new Promise((resolve, reject) => {
  //         this.$timeout(() => {
  //             this.index += 1;
  //             if (this.index < this.chatService.questions.length) {
  //                 this.messages.push(this.chatService.questions[this.index]);
  //             }
  //             return resolve();
  //         }, 2000);
  //     });
  //     promise.then(() => {
  //         this.isTyping = false;
  //         this.showForms = true;
  //         this.$scope.$apply();
  //     });
  // }

  addNewQuestion() {
    this.isTyping = true;
    return new Promise((resolve, reject) => {
      this.$timeout(() => {
        this.index += 1;
        if (this.index < this.chatService.questions.length) {
          this.messages.push(this.chatService.questions[this.index]);
        }
        resolve();
      }, 2000);
    });

  }

  timeoutAddQuestion(ms) {
    return new Promise((resolve, reject) => {
      this.$timeout(() => {
        this.addNewQuestion()
          .then(() => {
          this.isTyping = false;
          // this.showForms = true;
          this.$scope.$apply();
          resolve();
        });
      }, ms);
    });
  }

  onShowCards(ms) {
    this.$timeout(() => {
      this.showCards = true;
    }, ms);
  }

  onChooseCard(card) {
    console.log(card);
    this.showCards = false;
    this.messages.push({
      text: `I have chosen the card "${card}"`,
      user: true
    });
  }

  onShowForms() {
    this.showForms = true;
    this.$scope.$apply();
  }
}

export default ChatController;
