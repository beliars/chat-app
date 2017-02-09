class ChatController {
  constructor(Restangular, ChatService, $timeout, $filter, $scope) {
    this.chatService = ChatService;
    this.restangular = Restangular;
    this.$timeout = $timeout;
    this.$filter = $filter;
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
    this.fifthForm = {
      text: '',
      user: true
    };
  }

  $onInit() {
    this.timeoutMessage(500)
      .then(() => this.timeoutMessage(1000))
      .then(() => this.timeoutMessage(800))
      .then(() => this.onShowForms());
  }

  onSubmit(form) {
    if (form.$valid) {
      this.showForms = false;
      switch (form.$name) {
        case 'firstForm':
          this.messages.push(this.firstForm);
          this.timeoutMessage(1000, 'gender')
            .then(() => this.timeoutMessage(2000))
            .then(() => this.onShowForms());
          break;
        case 'secondForm':
          this.messages.push(this.secondForm);
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
            this.onShowCards(4000);
          });
          break;
        case 'fifthForm':
          let date = this.$filter('date')(this.fifthForm.text, 'dd/MM/yyyy');
          this.messages.push({text: date, user: true});
          // this.timeoutMessage(2500)
          //   .then(() => {
          //   this.onShowForms();
          // });
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
      }, 1500);
    });
  }

  timeoutMessage(ms, msgType) {
    return new Promise((resolve) => {
      this.$timeout(() => {
        if(msgType && msgType == 'gender') {
          var promise = this.genderMessage();
        }
        else if(msgType && msgType == 'hello') {
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

  genderMessage() {
    this.isTyping = true;
    return new Promise((resolve) => {
      this.$timeout(() => {
        let gender = this.firstForm.text;
        if(gender == 'Yes') {
          this.messages.push({text: `Great.`});
        }
        else {
          this.messages.push({text: `Oh, I'm sorry.`});
        }
        this.isTyping = false;
        resolve();
      }, 1500);
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

  // problemMessage() {
  //   this.isTyping = true;
  //   return new Promise((resolve) => {
  //     this.$timeout(() => {
  //       let problem = this.fourthForm.text;
  //       if(problem == 'No') {
  //         this.messages.push({text: `If love is not a worry, what is your problem my dear?`});
  //       }
  //       this.isTyping = false;
  //       resolve();
  //     }, 2500);
  //   });
  // }

  onChooseCard(card) {
    this.showCards = false;
    let promise = new Promise((resolve) => {
      this.$timeout(() => {
        this.messages.push({
          text: `The card I choose is "${card}"`,
          user: true
        });
        resolve();
      }, 500);
    });
    promise.then(() => {
      this.timeoutMessage(3000)
        .then(() => this.onShowForms());
    });
  }

  onShowForms() {
    this.showForms = true;
    this.$scope.$apply();
  }

  onShowCards(ms) {
    this.$timeout(() => {
      this.showCards = true;
    }, ms);
  }
}

export default ChatController;
