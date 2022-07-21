var levelup = null;
function entryMessage() {
  const intro = document.querySelector('.intro');
  const warning =
    '<p>You have a grid of URLs, <strong>Left-click</strong> to scrape data and <strong>Right-click</strong> to bookmark Facebook URL so you can avoid it.</p> <p> Your mission is to scrape all websites but Facebook, otherwise, Facebook will sue you!</p> <p>Good Luck Mr Hacker!</p>';

  (function setTime() {
    let time = Math.round(Math.random() * (2000 - 500)) + 500;
    setTimeout(() => {
      if (time < 900) intro.innerText = 'HELP_ WORLD';
      else intro.innerText = 'HELLO WORLD';
      setTime();
    }, time);
  })();

  const audioScrape = new Audio();
  audioScrape.src = '../audio/tech.wav';

  function mession() {
    const isDisplayed = sessionStorage.getItem('popupDisplayed');
    const message = document.querySelector('.message');
    const closeBtn = document.querySelector('.close_btn');
    const messageBody = document.querySelector('.message_body');
    message.append(closeBtn);

    if (isDisplayed !== 'true') {
      setTimeout(() => {
        message.classList.add('popup');
        closeBtn.classList.add('popup_btn');
        closeBtn.innerHTML = 'Understood';
        messageBody.innerHTML = warning;

        const test = document.querySelector('.notification_audio');
        test.muted = false;
        test.autoplay = true;
        const promise = test.play();
        if (promise !== undefined) {
          promise
            .then((_) => {
              console.log('Autoplay started');
              // Autoplay started!
            })
            .catch((error) => {
              console.log(error);
              // Autoplay was prevented.
            });
        }
      }, 1500);

      closeBtn.addEventListener('click', (e) => {
        audioScrape.play();
        sessionStorage.setItem('popupDisplayed', 'true');
        closeBtn.innerHTML = '';
        messageBody.innerHTML = '';
        entryMessage();
      });
    } else {
      closeBtn.classList.remove('popup_btn');
      message.classList.remove('popup');
    }
  }
  mession();

  const startBtn = document.querySelector('.start__btn');
  startBtn.addEventListener('click', (e) => {
    audioScrape.play();
  });

  const levelsPick = document.querySelector('#levelsPick');
  levelsPick.addEventListener('change', (e) => {
    levelup = e.target.value;
  });
}
