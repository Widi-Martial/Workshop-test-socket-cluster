import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import socketClusterClient from 'socketcluster-client';

function App() {
  const [count, setCount] = useState(0);
  const socket = socketClusterClient.create({hostname: 'localhost', port: 8000});

  socket.transmit('test', 123);
  (async () => {
      let result;
      try {
      result = await socket.invoke('getData', {username:'toto'});
      console.log(result);

      } catch (e) {
          console.error(e);
      }
    })();

  (async () => {
        let channel = socket.subscribe('room');
        for await (let data of channel) {
            console.log(data);
        }
    })();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

    </>
  )
}

export default App
