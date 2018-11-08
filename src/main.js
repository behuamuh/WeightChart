import {
  createUser,
  saveUserChange,
  changeUserName,
  resetUserWeigths,
} from './utils';
import drawChart from './drawChart';
import { LOCALE } from './const';

window.lang = 'RU';
const { HELLO, TITLE, CHANGE_NAME, RESET_WEIGHT, SEND_WEIGHT, WEIGHT_ADDED_ALERT, WEIGHT_IS_CHANGED, PROMPT_CREATE_USER
  , PROMPT_CHANGE_NAME, RESET_CONFIRM } = LOCALE[lang];

window.onload = function () {
  if (!localStorage['user']) {
    createUser();
  }

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
  changeNameBtn.onclick = changeUserName;

  const resetWeigthsBtn = document.querySelector('button#resetWeight');
  resetWeigthsBtn.innerText = RESET_WEIGHT;
  resetWeigthsBtn.onclick = resetUserWeigths;

  drawChart(weigths, window.lang);

  function sendWeigth() {
    const now = new Date().toDateString();
    if (!weigths.hasOwnProperty(now)) {
      alert(WEIGHT_ADDED_ALERT);
      weigths[now] = input.value;
      title.innerText = WEIGHT_IS_CHANGED;
      saveUserChange(userName, weigths);
      drawChart(weigths, window.lang);
    }
    input.value = '';
  }
};
