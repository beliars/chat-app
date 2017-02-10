export default class ChatService {
  constructor(Restangular) {
    'ngInject;'
    this.restangular = Restangular;
    this.index = 0;
    this.questions = [
      {
        id: 1,
        text: "Welcome! My name is Lilly and I’m here to help you."
      },
      {
        id: 2,
        text: "I belong to an ancient family of psychics and I want to help you find a solution to the obstacles in your life."
      },
      {
        id: 3,
        text: "I feel that I’m talking to a woman. Am I right?"
      },
      {
        id: 5,
        text: "Can you please tell me your name?"
      },
      {
        id: 6,
        text: "Are you having love problems?"
      },
      {
        id: 7,
        text: "What exactly is your problem my dear?"
      },
      {
        id: 8,
        text: "Ok, let’s start your tarot reading. Please select one of the cards that will appear on your screen."
      },
      {
        id: 9,
        text: "For a better reading I need to draw your birth chart. Please tell me your birth date so I can understand which planets are guiding your life."
      },
      {
        id: 10,
        text: "Thank you. Now I just need time to focus on your reading, it needs to be as accurate as possible to guide you in the right direction."
      },
      {
        id: 11,
        text: "When I’m finished I’ll send you my findings and advice, but for that I need you to tell me your email address."
      },
      {
        id: 12,
        text: "It's been a pleasure talking to you, qwe. I hope to see you again, but for now I send you positive vibrations and plenty of light into your path."
      },
      {
        id: 13,
        text: "Keep an eye on your email, I’ll send your results very soon!"
      }
    ];
  }

  getMessages() {
    return this.restangular.all('chat.json').getList()
    .then(res => {
      this.msgList = res;
      return res;
    });
  }
}