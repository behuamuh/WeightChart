export function createUser() {
  const userName = prompt('Здравствуйте, представтесь пожалуйста.') || 'Гость';
  const weigths = new Object();
  localStorage.setItem('user', JSON.stringify({ userName, weigths }));
}

export function saveUserChange(userName, weigths) {
  localStorage.setItem('user', JSON.stringify({ userName, weigths }));
}

export function changeUserName() {
  const { weigths } = JSON.parse(localStorage['user']);
  const userName = prompt('Введите новое имя');
  if (userName) {
    localStorage.setItem('user', JSON.stringify({ userName, weigths }));
    location.reload();
  }
}

export function resetUserWeigths() {
  if (!confirm('Вы уверены?')) return;

  const { userName } = JSON.parse(localStorage['user']);
  const weigths = {};
  localStorage.setItem('user', JSON.stringify({ userName, weigths }));
  location.reload();
}
