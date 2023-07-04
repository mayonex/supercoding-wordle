class WordleBoard {
  constructor() {
    this.setElement();
    this.setInitialState();
    this.setEventListener();
  }
  setElement = () => {
    this.board = document.querySelector(".wordle-board");
  };
  setTimer = () => {
    this.startDate = new Date();
    this.gameTimer = setInterval(() => {
      this.handleTimer(this.startDate);
    }, 1000);
  };
  handleTimer = (startDate) => {
    const timer = document.querySelector(".timer");
    const curDate = new Date();
    const timerDate = new Date(curDate - startDate);
    const min = timerDate.getMinutes();
    const sec = timerDate.getSeconds();
    timer.innerText = `${min.toString().padStart(2, "0")} : ${sec
      .toString()
      .padStart(2, "0")}`;
  };
  setInitialState = () => {
    this.index = 0;
    this.attempt = 0;
    this.isCorrect = 0;
    this.correctWord = "SUPER";
  };
  goNextLine = () => {
    this.index = 0;
    this.attempt++;
  };
  isValidKey = (key, keyCode) => {
    if (65 <= keyCode && keyCode <= 90) {
      if ("A" <= key && key <= "Z") return true;
    }
  };
  gameOver = (emoji, content) => {
    clearInterval(this.gameTimer);
    const popUp = document.querySelector(".pop-up");
    popUp.classList.remove("hidden");
    const text = popUp.querySelector("h1");
    text.innerText = content;
    const icon = document.querySelector(".pop-up__icon");
    icon.innerText = emoji;
    icon.classList.add("icon-animation");
    const cancleBtn = document.querySelector(".pop-up__cancle");
    cancleBtn.addEventListener("click", () => {
      popUp.classList.add("hidden");
    });
    const btn = document.querySelector(".pop-up button");
    btn.addEventListener("click", () => {
      location.reload();
    });
    this.isCorrect = 1;
  };
  handleEnterKeyDown = () => {
    let guessWord = [];
    const targetBoards = document.querySelectorAll(
      `.row[data-attempt ^= '${this.attempt}'] .column`
    );
    targetBoards.forEach((item) => guessWord.push(item.innerText));
    return guessWord.join("");
  };
  setBoardState = (index, className) => {
    document
      .querySelector(`.column[data-index = '${this.attempt}${index}'`)
      .classList.add(className);
  };
  setKeyBoardState = (key, className) => {
    const targetKey = document.querySelector(`.key-column[data-key='${key}']`);
    targetKey.classList.add(className);
  };
  isCorrectWord = (guessWord) => {
    let correct = 0;
    for (let i = 0; i < this.correctWord.length; i++) {
      if (guessWord[i] === this.correctWord[i]) {
        this.setBoardState(i, "correct-board");
        this.setKeyBoardState(guessWord[i], "correct-board");
        correct++;
      } else if (this.correctWord.includes(guessWord[i])) {
        this.setBoardState(i, "half-correct-board");
        this.setKeyBoardState(guessWord[i], "half-correct-board");
      } else {
        this.setBoardState(i, "not-correct-board");
        this.setKeyBoardState(guessWord[i], "not-correct-board");
      }
    }
    if (correct == 5) {
      this.gameOver("🎉", "잘했어요!");
    }
  };
  handleBackspaceKeyDown = () => {
    if (this.index > 0) {
      this.index--;
      const targetBoard = document.querySelector(
        `.column[data-index='${this.attempt}${this.index}']`
      );
      targetBoard.innerText = "";
    }
  };
  handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    if (this.index == 5 && key == "ENTER") {
      const guessWord = this.handleEnterKeyDown();
      this.isCorrectWord(guessWord);
      this.goNextLine();
      if (this.attempt == 6) {
        this.gameOver("♻️", "아쉬워요");
      }
    } else if (key == "BACKSPACE") {
      this.handleBackspaceKeyDown();
    } else if (this.isValidKey(key, keyCode)) {
      if (this.index == 5) return;
      if (this.isCorrect) return;
      if (this.attempt == 0 && this.index == 0) {
        this.setTimer();
      }
      const targetBoard = document.querySelector(
        `.column[data-index='${this.attempt}${this.index}']`
      );
      targetBoard.innerText = key;
      targetBoard.classList.add("key-input");
      this.index++;
    }
  };
  setEventListener = () => {
    window.addEventListener("keydown", this.handleKeyDown);
  };
}
window.addEventListener("load", () => {
  const wordle = new WordleBoard();
});
