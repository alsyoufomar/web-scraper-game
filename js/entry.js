function entryMessage() {
  const intro = document.querySelector('.intro');

  (function setTime() {
    let time = Math.round(Math.random() * (2000 - 500)) + 500;
    setTimeout(() => {
      if (time < 900) intro.innerText = 'HELP_ WORLD';
      else intro.innerText = 'HELLO WORLD';
      setTime();
    }, time);
  })();
}
