function entryMessage() {
  const intro = document.querySelector('.intro');
  const warning =
    'Your mission is to scrape data from Facebook without getting caught, otherwise, Facebook will sue you! Good Luck Mr Hacker!';

  (function setTime() {
    let time = Math.round(Math.random() * (2000 - 500)) + 500;
    setTimeout(() => {
      if (time < 900) intro.innerText = 'HELP_ WORLD';
      else intro.innerText = 'HELLO WORLD';
      setTime();
    }, time);
  })();

  function mession() {
    const isDisplayed = sessionStorage.getItem('popupDisplayed');
    const message = document.querySelector('.message');
    const closeBtn = document.querySelector('.close_btn');
    const messageBody = document.querySelector('.message_body');

    message.append(closeBtn);
    if (isDisplayed !== 'true') {
      message.classList.add('popup');
      closeBtn.classList.add('popup_btn');
      closeBtn.innerHTML = 'Understood';
      messageBody.innerHTML = warning;
      closeBtn.addEventListener('click', (e) => {
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
}
