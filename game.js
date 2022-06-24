class Game {
    constructor() {
        this.stats = new Statistics();
        this.wallet = new Wallet(1000)
        document.getElementById('start').addEventListener('click', this.startGame.bind(this)) // trzeba zbindować this, żeby w metodzie startGame this oznaczał Game, a nie button na którym wywołujemy addEventListener
        this.spanWallet = document.querySelector('span.wallet');
        this.boards = [...document.querySelectorAll('div.color')];
        this.input = document.getElementById('bid');
        this.spanResult = document.querySelector('span.result');
        this.spanGames = document.querySelector('span.number');
        this.spanWins = document.querySelector('span.win');
        this.spanLosses = document.querySelector('span.loss');

        this.render();
    }

    render(colors = ['grey','grey','grey'], result = "", money = this.wallet.getWalletValue(), stats = [0,0,0], bid = 0, wonMoney = 0) {
        this.boards.forEach((board, index) => {
            board.style.backgroundColor = colors[index];
        })
        if (result) {
            result = `You won ${wonMoney - bid}$`;
        } else if (!result && result !== "") {
            result = `You lost ${bid}$`;
        }
        this.spanResult.textContent = result;
        this.spanWallet.textContent = money;
        this.spanGames.textContent = stats[0];
        this.spanWins.textContent = stats[1];
        this.spanLosses.textContent = stats[2];
    }

    startGame() {
        if (this.input.value <1) return alert `kwota, którą chcesz grać jest za mała`;
        const bid = Math.floor(this.input.value);
        if (!this.wallet.checkCanPlay(bid)) return alert(`Masz za mało środków lub nieprawidłowa wartość`)
        this.wallet.changeWallet(bid,"-");
        this.draw = new Draw();
        const colors = this.draw.getDrawResult();
        const win = Result.checkIfWin(colors);
        const moneyWon = Result.moneyWon(win, bid);
        this.wallet.changeWallet(moneyWon);
        this.stats.addGameToStatistics(win, bid);

        this.render(colors, win, this.wallet.getWalletValue(), this.stats.showGameStatistics(), bid, moneyWon)

    }
}

