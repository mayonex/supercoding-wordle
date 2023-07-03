const answer = "SUPER";
function appStart() {
  let attempt = 0;
  let index = 0;
  let isCorrect = 0;
  let time;
  const handleTimer = (startDate) => {
    const timer = document.querySelector(".timer");
    const curDate = new Date();
    const timerDate = new Date(curDate - startDate);
    const min = timerDate.getMinutes();
    const sec = timerDate.getSeconds();
    timer.innerText = `${min.toString().padStart(2, "0")} : ${sec
      .toString()
      .padStart(2, "0")}`;
  };
  const handleEnterKey = (event) => {
    let word = [];
    let correct = 0;
    const targetList = document.querySelectorAll(
      `.column[data-index ^= '${attempt}'`
    );
    targetList.forEach((item) => {
      word.push(item.innerText);
    });
    word.forEach((item, index) => {
      targetList[index].classList.add("guessed");
      findIndex = answer.indexOf(item);
      if (findIndex >= 0) {
        targetList[index].classList.add("half-correct");
        if (index == findIndex) {
          targetList[index].classList.add("full-correct");
          correct++;
          if (correct == 5) {
            const popUp = document.querySelector(".pop-up");
            popUp.classList.remove("hidden");
            const cancleBtn = document.querySelector(".pop-up__cancle");
            const icon = document.querySelector(".pop-up__icon");
            icon.classList.add("icon-animation");
            cancleBtn.addEventListener("click", () => {
              popUp.classList.add("hidden");
            });
            const btn = document.querySelector(".pop-up button");
            btn.addEventListener("click", () => {
              location.reload();
            });
            isCorrect = 1;
          }
        }
      }
    });
  };
  const handleKeyDown = (event) => {
    if (isCorrect == 1) {
      return;
    }
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    if (index == 0 && attempt == 0) {
      startDate = new Date();
      time = setInterval(() => {
        if (isCorrect == 1) {
          clearInterval(time);
        }
        handleTimer(startDate);
      }, 1000);
    }
    if (keyCode == 8) {
      if (index == 0) return;
      index--;
      const target = document.querySelector(
        `.column[data-index='${attempt}${index}']`
      );
      target.innerText = "";
    }
    if (index === 5) {
      if (key == "ENTER") {
        handleEnterKey();
        index = 0;
        attempt++;
        if (attempt == 6 && !isCorrect) {
          const popUp = document.querySelector(".pop-up");
          popUp.classList.remove("hidden");
          const text = popUp.querySelector("h1");
          text.innerText = "아쉬워요";
          const icon = document.querySelector(".pop-up__icon");
          icon.innerText = "♻️";
          const btn = document.querySelector(".pop-up button");
          btn.addEventListener("click", () => {
            location.reload();
          });
          clearInterval(time);
        }
      }
      return;
    }

    if (65 <= keyCode && keyCode <= 90) {
      if ("A" <= key && key <= "Z") {
        const target = document.querySelector(
          `.column[data-index='${attempt}${index}']`
        );
        target.innerText = key;
        target.classList.add("key-input");
        index++;
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);
}
window.addEventListener("load", appStart);
