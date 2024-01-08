import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Calendar from "./components/Calendar";
import TodoList from "./components/TodoList";

function App() {
  const [tododata, setTododata] = useState([]);

  const [selectDate, setSelectDate] = useState(new Date());

  // undone: 未達成 progress:作業中 done:達成済み
  useEffect(() => {
    setTododata([
      ...tododata,
      { id: 202312230002, text: "task 1", status: "undone", date: selectDate },
      { id: 202401010001, text: "task 2", status: "undone", date: selectDate },
      { id: 202401100030, text: "task 3", status: "undone", date: selectDate },
    ]);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
      }}
    >
      <Box sx={{ flex: 3 }}>
        <Calendar setSelectDate={setSelectDate} />
      </Box>
      <Box sx={{ flex: 2 }}>
        <TodoList
          tododata={tododata}
          setTododata={setTododata}
          selectDate={selectDate}
        />
      </Box>
    </Box>
  );
}

export default App;
