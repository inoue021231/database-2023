import { useState } from 'react';
import Calendar from './components/Calendar';

function App() {
  const [tododata, setTododata] = useState([
    {

    },
  ]);
  return (
    <Calendar />
  );
}

export default App;
