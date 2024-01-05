import { useState } from "react";
import Calendar from "./components/Calendar";

function App() {
  const [tododata, setTododata] = useState([{}]);

  const [selectDate, setSelectDate] = useState(new Date());

  console.log(selectDate);

  return <Calendar setSelectDate={setSelectDate} />;
}

export default App;
