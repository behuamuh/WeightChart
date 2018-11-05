window.onload = function() {
  if (!localStorage['user']) {
    createUser();
  }

  const { userName, weigths } = JSON.parse(localStorage['user']);

  const hello = document.querySelector('h3#hello');
  hello.innerText = `Здравствуйте, ${userName}!`;

  const send = document.querySelector('button#send');
  send.onclick = function() {
    const input = document.querySelector('input#weight');
    const now = new Date().toDateString();
    if (!weigths.hasOwnProperty(now)) {
      weigths[now] = input.value;
      saveUserChange(userName, weigths);
    }

    drawChart(weigths);
  };

  const changeName = document.querySelector('button#change');
  changeName.onclick = changeUserName;

  drawChart(weigths);
};

function createUser() {
  const userName = prompt('Здравствуйте, представтесь пожалуйста.') || 'Гость';
  const weigths = new Object();
  localStorage.setItem('user', JSON.stringify({ userName, weigths }));
}

function saveUserChange(userName, weigths) {
  localStorage.setItem('user', JSON.stringify({ userName, weigths }));
}

function changeUserName() {
  const { weigths } = JSON.parse(localStorage['user']);
  const userName = prompt('Введите новое имя');
  localStorage.setItem('user', JSON.stringify({ userName, weigths }));
  location.reload();
}

function drawChart(weigths) {
  const title = document.querySelector('h3#dynamic');

  let keys = Object.keys(weigths).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  if (keys.length <= 1) {
    title.innerText = 'Здесь будет отражены ваши результаты';
    return;
  }
  title.innerText = 'Ваша динамика';

  if (keys.length > 30) {
    const weigths = keys.slice(w.length - 30);
  } else {
    const weigths = keys.slice(0);
  }

  const canvas = document.querySelector('canvas#cnv1');
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(10, 400);
  const dynamic = weigths[keys[0]] > weigths[keys[keys.length - 1]];
  keys.forEach((key, index) => {
    ctx.lineTo(10 * (index + 1), 200 - weigths[key]);
  });
  ctx.lineTo(keys.length * 10, 200);
  ctx.fillStyle = dynamic > 0 ? 'green' : 'red';
  ctx.fill();

  const result = document.querySelector('h4#result');
  result.innerText =
    dynamic > 0
      ? 'Отлично, так держать!'
      : 'Не расстраивайтесь, у Вас все получится!';
}
