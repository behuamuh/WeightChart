function mock(size) {
  const result = {};

  if (+size != +size) return {};
  new Array(+size)
    .fill(0)
    .map((item, index) => {
      return new Date(
        Date.now() - (+size - index) * 24 * 3600 * 1000
      ).toDateString();
    })
    .forEach(item => (result[item] = 60 + Math.round(40 * Math.random())));
  return result;
}
export default mock;
