class cardsController {
    constructor(Restangular, BotService, $timeout, $interval) {
        this.botService = BotService;
        this.restangular = Restangular;
        this.$timeout = $timeout;
        this.$interval = $interval;

        this.cards = ['Card1', 'Card2', 'Card3', 'Card4', 'Card5', 'Card6'];
    }

    $onInit() {
    }
}

export default cardsController;
