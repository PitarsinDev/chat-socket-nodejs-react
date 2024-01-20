import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css'

const socket = io('http://localhost:3001');

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const sendMessage = () => {
    socket.emit('chat message', message);
    setMessage('');
  };

  return (
    <div className='flex justify-center p-5'>
      <div className='bg-indigo-600 rounded-xl w-96 h-96'>
        <div className='flex justify-center'>
          <ul className='w-96 bg-white rounded-full'>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
        <div className='flex justify-center'>
          <div>
            <div className='flex justify-center p-5'>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='border border-white rounded-full px-2 shadow-md text-zinc-500'
              />
            </div>
            <div className='flex justify-center'>
              <button onClick={sendMessage} className='bg-white text-indigo-600 rounded-full px-5 py-1 shadow-md'>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;