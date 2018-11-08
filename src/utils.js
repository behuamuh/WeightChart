export function createUser(message, name) {
  const userName = prompt(message) || name;
  const weigths = new Object();
  localStorage.setItem('user', JSON.stringify({ userName, weigths }));
}

export function saveUserChange(userName, weigths) {
  localStorage.setItem('user', JSON.stringify({ userName, weigths }));
}

export function changeUserName(message) {
  const { weigths } = JSON.parse(localStorage['user']);
  const userName = prompt(message);
  if (userName) {
    localStorage.setItem('user', JSON.stringify({ userName, weigths }));
    location.reload();
  }
}

export function resetUserWeigths(message) {
  if (!confirm(message)) return;

  const { userName } = JSON.parse(localStorage['user']);
  const weigths = {};
  localStorage.setItem('user', JSON.stringify({ userName, weigths }));
  location.reload();
}
