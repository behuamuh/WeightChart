import {
  createUser,
  saveUserChange,
  changeUserName,
  resetUserWeigths,
} from './utils';
import drawChart from './drawChart';
import { LOCALE } from './const';

let lang = 'RU';

window.onload = function work() {
  const {
    HELLO,
    TITLE,
    CHANGE_NAME,
    RESET_WEIGHT,
    SEND_WEIGHT,
    WEIGHT_ADDED_ALERT,
    WEIGHT_IS_CHANGED,
    PROMPT_CREATE_USER,
    PROMPT_CHANGE_NAME,
    RESET_CONFIRM,
  } = LOCALE[lang];

  if (!localStorage['user']) {
    createUser(...PROMPT_CREATE_USER);
  }

  const changeLangField = document.querySelector('#language');
  changeLangField.innerHTML = '';
  Object.keys(LOCALE).forEach(item => {
    const btn = document.createElement('button');
    btn.classList.add(
      'btn',
      'btn-sm',
      item === lang ? 'btn-success' : 'btn-outline-success'
    );
    btn.innerText = item;
    btn.style.cursor = 'pointer';
    btn.onclick = event => {
      lang = event.target.innerText;
      work();
    };
    changeLangField.appendChild(btn);
  });

  const { userName, weigths } = JSON.parse(localStorage['user']);

  const hello = document.querySelector('h3#hello');
  hello.innerText = HELLO + userName + '!';

  const title = document.querySelector('#title');
  title.innerText = weigths.hasOwnProperty(new Date().toDateString())
    ? TITLE[1]
    : TITLE[0];

  const input = document.querySelector('input#weight');
  input.addEventListener('keydown', event => {
    if (event.keyCode === 13) sendWeigth();
  });

  const sendBtn = document.querySelector('button#send');
  sendBtn.innerText = SEND_WEIGHT;
  sendBtn.onclick = sendWeigth;

  const changeNameBtn = document.querySelector('button#changeName');
  changeNameBtn.innerText = CHANGE_NAME;
  changeNameBtn.onclick = () => changeUserName(PROMPT_CHANGE_NAME);

  const resetWeigthsBtn = document.querySelector('button#resetWeight');
  resetWeigthsBtn.innerText = RESET_WEIGHT;
  resetWeigthsBtn.onclick = () => resetUserWeigths(RESET_CONFIRM);

  drawChart(weigths, lang);

  function sendWeigth() {
    const now = new Date().toDateString();
    if (!weigths.hasOwnProperty(now)) {
      alert(WEIGHT_ADDED_ALERT);
      weigths[now] = input.value;
      title.innerText = WEIGHT_IS_CHANGED;
      saveUserChange(userName, weigths);
      drawChart(weigths, lang);
    }
    input.value = '';
  }
};
