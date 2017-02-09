class cardsController {
    constructor(Restangular) {
        this.restangular = Restangular;

        this.cards = ['Card1', 'Card2', 'Card3', 'Card4', 'Card5', 'Card6'];
    }

    $onInit() {
    }
}

export default cardsController;
