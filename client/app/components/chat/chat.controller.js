class ChatController {
  constructor(Restangular, ChatService, $timeout, $interval, $scope) {
    this.chatService = ChatService;
    this.restangular = Restangular;
    this.$timeout = $timeout;
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
    this.timeoutMessage(500)
      .then(() => this.timeoutMessage(2000))
      .then(() => this.timeoutMessage(1000))
      .then(() => this.onShowForms());
  }

  onSubmit(form) {
    if (form.$valid) {
      this.showForms = false;
      switch (form.$name) {
        case 'firstForm':
          this.messages.push(this.firstForm);
          this.timeoutMessage(2000)
            .then(() => this.onShowForms());
          break;
        case 'secondForm':
          this.messages.push(this.secondForm);
          // this.timeoutHello(3000)
          this.timeoutMessage(3000, 'hello')
            .then(() => this.timeoutMessage(1500))
            .then(() => this.onShowForms());
          break;
        case 'thirdForm':
          this.messages.push(this.thirdForm);
          this.timeoutMessage(2000)
            .then(() => this.onShowForms());
          break;
        case 'fourthForm':
          this.messages.push(this.fourthForm);
          this.timeoutMessage(2500)
            .then(() => {
            this.onShowForms();
            this.onShowCards(3000);
          });
          break;
        default:
          console.log('Unknown error');
      }
    }
  }

  addNewQuestion() {
    this.isTyping = true;
    return new Promise((resolve) => {
      this.$timeout(() => {
        this.index += 1;
        if (this.index < this.chatService.questions.length) {
          this.messages.push(this.chatService.questions[this.index]);
        }
        resolve();
      }, 2000);
    });
  }

  timeoutMessage(ms, msgType) {
    return new Promise((resolve) => {
      this.$timeout(() => {
        if(msgType && msgType == 'hello') {
          var promise = this.helloMessage();
        }
        else {
          var promise = this.addNewQuestion();
        }
        promise.then(() => {
          this.isTyping = false;
          this.$scope.$apply();
          resolve();
        });
      }, ms);
    });
  }

  helloMessage() {
    this.isTyping = true;
    return new Promise((resolve) => {
      this.$timeout(() => {
        let username = this.secondForm.text;
        this.messages.push({text: `Nice to meet You, ${username}!`});
        this.isTyping = false;
        resolve();
      }, 2000);
    });
  }

  onShowCards(ms) {
    this.$timeout(() => {
      this.showCards = true;
    }, ms);
  }

  onChooseCard(card) {
    this.showCards = false;
    this.$timeout(() => {
      this.messages.push({
        text: `I have chosen the card "${card}"`,
        user: true
      });
    }, 500);
  }

  onShowForms() {
    this.showForms = true;
    this.$scope.$apply();
  }
}

export default ChatController;
