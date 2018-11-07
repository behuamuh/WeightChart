import {
  createUser,
  saveUserChange,
  changeUserName,
  resetUserWeigths,
} from './utils';
import drawChart from './drawChart';

window.period = 36500;

window.onload = function() {
  if (!localStorage['user']) {
    createUser();
  }

  const { userName, weigths } = JSON.parse(localStorage['user']);

  const hello = document.querySelector('h3#hello');
  hello.innerText = `Здравствуйте, ${userName}!`;

  const giveWeight = document.querySelector('#weight-input');
  giveWeight.innerText = !weigths.hasOwnProperty(new Date().toDateString())
    ? 'Введите ваш текущий вес'
    : 'Сегодня вы уже ввели свой вес';

  const input = document.querySelector('input#weight');
  input.addEventListener('keydown', event => {
    if (event.keyCode === 13) sendWeigth();
  });

  const sendBtn = document.querySelector('button#send');
  sendBtn.onclick = sendWeigth;

  const changeName = document.querySelector('button#changeName');
  changeName.onclick = changeUserName;

  const resetWeigths = document.querySelector('button#resetWeight');
  resetWeigths.onclick = resetUserWeigths;

  drawChart(weigths);

  function sendWeigth() {
    const now = new Date().toDateString();
    if (!weigths.hasOwnProperty(now)) {
      alert('Вес добавлен');
      weigths[now] = input.value;
      giveWeight.innerText = 'Сегодня вы уже ввели свой вес';
      saveUserChange(userName, weigths);
      drawChart(weigths);
    }
    input.value = '';
  }
};
