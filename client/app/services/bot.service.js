export default class BotService {
    constructor(Restangular) {
        'ngInject;'
        this.restangular = Restangular;
        this.index = 0;
        this.questions = [
            {
                id: 1,
                text: "Welcome! My name is Lilly and I’m here to help you.",
                show: false
            },
            {
                id: 2,
                text: "I belong to an ancient family of psychics and I want to help you find a solution to the obstacles in your life.",
                show: false
            },
            {
                id: 3,
                text: "I feel that I’m talking to a woman. Am I right?",
                show: false
            },
            {
                id: 5,
                text: "Nice to meet you. I can see you’re going through some trouble. Are you having love problems?",
                show: false
            },
            {
                id: 6,
                text: "If love is not a worry, what is your problem my dear?",
                show: false
            },
            {
                id: 7,
                text: "Cras ultricies ligula sed magna dictum porta?",
                show: false
            },
            {
                id: 8,
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
                show: false
            },
            {
                id: 9,
                text: "Nulla porttitor accumsan tincidunt. Nulla porttitor accumsan tincidunt.",
                show: false
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