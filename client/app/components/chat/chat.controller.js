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
    this.username = 'Guest';

    this.myDate = new Date();
    this.minDate = new Date(
      this.myDate.getFullYear() - 150,
      this.myDate.getMonth(),
      this.myDate.getDate());
    this.maxDate = new Date(
      this.myDate.getFullYear(),
      this.myDate.getMonth(),
      this.myDate.getDate());

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
    this.sixForm = {
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
          if(this.firstForm.text == "No") {
            this.timeoutMessage(1500, 'gender')
              .then(() => this.timeoutMessage(2000))
              .then(() => this.onShowForms());
            break;
          }
          else {
            this.timeoutMessage(2000)
              .then(() => this.onShowForms());
          }
          break;
        case 'secondForm':
          this.messages.push(this.secondForm);
          this.timeoutMessage(3000, 'hello')
            .then(() => this.timeoutMessage(1500))
            .then(() => this.onShowForms());
          break;
        case 'thirdForm':
          this.messages.push(this.thirdForm);
          if(this.thirdForm.text == 'No') {
            this.index += 1;
            this.timeoutMessage(3000, 'problem')
              .then(() => this.onShowForms());
            break;
          }
          else {
            this.timeoutMessage(2000)
              .then(() => this.onShowForms());
            break;
          }
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
          this.timeoutMessage(2000)
            .then(() => this.timeoutMessage(1500))
            .then(() => this.onShowForms());
          break;
        case 'sixForm':
          this.messages.push(this.sixForm);
          this.timeoutMessage(2000, 'bye')
            .then(() => this.timeoutMessage(1200))
            .then(() => this.timeoutMessage(1500));
          break;
        default:
          console.log('Unknown error');
      }
    }
  }

  addNewQuestion() {
    this.isTyping = true;
    return new Promise((resolve) => {
      this.index += 1;
      let delay = this.chatService.questions[this.index].text.length * 30;   //<---  printing time delay
      console.log(delay);
      this.$timeout(() => {
        if (this.index < this.chatService.questions.length) {
          this.messages.push(this.chatService.questions[this.index]);
        }
        resolve();
      }, delay);
    });
  }

  timeoutMessage(ms, msgType) {
    return new Promise((resolve) => {
      let promise;
      this.$timeout(() => {
        if(msgType && msgType == 'gender') {
          promise = this.genderMessage();
        }
        else if(msgType && msgType == 'hello') {
          promise = this.helloMessage();
        }
        else if(msgType && msgType == 'problem') {
          promise = this.problemMessage();
        }
        else if(msgType && msgType == 'bye') {
          promise = this.byeMessage();
        }
        else {
          promise = this.addNewQuestion();
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
        this.messages.push({text: `Oh, I'm sorry.`});
        this.isTyping = false;
        resolve();
      }, 1000);
    });
  }

  helloMessage() {
    this.isTyping = true;
    return new Promise((resolve) => {
      this.$timeout(() => {
        // let username = this.secondForm.text;
        this.username = this.secondForm.text;
        this.messages.push({text: `Nice to meet You ${this.username}!`});
        // this.messages.push({text: `Nice to meet You ${username}!`});
        this.isTyping = false;
        resolve();
      }, 1200);
    });
  }

  problemMessage() {
    this.isTyping = true;
    return new Promise((resolve) => {
      this.$timeout(() => {
        this.messages.push({text: `If love is not a worry, what is your problem my dear?`});
        this.isTyping = false;
        resolve();
      }, 1500);
    });
  }

  byeMessage() {
    this.isTyping = true;
    return new Promise((resolve) => {
      this.$timeout(() => {
        this.messages.push({text: `It's been a pleasure talking to you ${this.username}.`});
        this.isTyping = false;
        resolve();
      }, 1300);
    });
  }

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
