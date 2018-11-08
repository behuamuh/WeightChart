import mock from './mock';
import { LOCALE } from './const';


export default function (w, lang) {
  const { PERIODS, TITLE_CHART, RESULT_CHART } = LOCALE[lang];

  const weigths = Object.keys(w).length == 0 ? mock(300) : w;
  const titleChart = document.querySelector('h3#dynamic');
  let keys = Object.keys(weigths);

  titleChart.innerText = Object.keys(w).length == 0 ? TITLE_CHART[0] : TITLE_CHART[1];
  const periodBtns = document.querySelectorAll('#periods .btn');
  Object.values(periodBtns).forEach((btn, index) => {
    btn.innerText = PERIODS[index];
    btn.onclick = setChartPeriod;
  });

  draw();

  function setChartPeriod(event) {
    keys = Object.keys(weigths)
      .sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime();
      })
      .filter((key, index, sortedKeys) => {
        return sortedKeys.length - index <= +event.target.dataset.period;
      });
    draw();
  }

  function draw() {
    const compress = Math.floor(keys.length / 32) + 1;
    const drawKeys = keys
      .filter((key, index) => index % compress === 0);
    if (drawKeys[drawKeys.length - 1] !== keys[keys.length - 1]) {
      drawKeys.push(keys[keys.length - 1])
    }
    const offset = (400 - drawKeys.length * 10) / 2;

    const dynamic = weigths[drawKeys[0]] - weigths[drawKeys[drawKeys.length - 1]];
    const ctx = getCanvasContext();
    ctx.beginPath();
    ctx.fillStyle = dynamic > 0 ? 'green' : 'red';

    drawKeys
      .forEach((key, index) => {
        ctx.fillRect(offset + 10 * index, 200 - weigths[key], 4, weigths[key]);
      });

    ctx.fillText(drawKeys[0], 60, 20);
    ctx.fillText(drawKeys[drawKeys.length - 1], 250, 20);
    ctx.closePath();

    const result = document.querySelector('h4#result');
    result.innerText = `${RESULT_CHART[0]}${new Date(drawKeys[0]).toLocaleDateString()} - ${new Date(drawKeys[drawKeys.length - 1]).toLocaleDateString()}
  ${RESULT_CHART[1]} ${ dynamic >= 0 ? RESULT_CHART[2] : RESULT_CHART[3]} ${Math.abs(dynamic)} ${RESULT_CHART[4]}.
  ${dynamic > 0
        ? RESULT_CHART[5]
        : RESULT_CHART[6]
      }`

  }

  function getCanvasContext() {
    const canvas = document.querySelector('canvas#cnv1');
    const result = canvas.getContext('2d');
    result.clearRect(0, 0, 400, 200);

    return result;
  }
}

function getMaxWeight(weigths) {
  return Math.max(...Object.values(weigths));
}
