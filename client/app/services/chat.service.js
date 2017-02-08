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
                text: "What is your problem my dear?"
            },
            {
                id: 8,
                text: "Ok, let’s start your tarot reading. Please select one of the cards that will appear on your screen."
            },
            {
                id: 9,
                text: "Nulla porttitor accumsan tincidunt. Nulla porttitor accumsan tincidunt."
            }
        ];
    }

    getGender() {
        for(let i=0; i<3; i++) {
            this.questions[i].show = true;
            this.index = i;
        }
    }

    setNext() {
        this.index += 1;
        if(this.index < this.questions.length) {
            this.questions[this.index].show = true;
        }
    }

    getMessages() {
        return this.restangular.all('chat.json').getList()
            .then(res => {
                this.msgList = res;
                return res;
            });
    }
}