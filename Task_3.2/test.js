import { WithTime } from './WithTime.js';

async function getData(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const data = await response.json();
  return data;
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', (time) => console.log('Done with execute', time));
withTime.on('data', (data) => console.log(data))

withTime.execute(getData, 1);

console.log(withTime.rawListeners("end"));