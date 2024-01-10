import { useEffect, useState } from "react";

import Calendar from "./components/Calendar";
import TodoList from "./components/TodoList";
import { getTododata, postTododata } from "./api";
import Header from "./components/Header";

import Box from "@mui/material/Box";
import LineChart from "./components/LineChart";
function App() {
  const [tododata, setTododata] = useState([]);

  const [selectDate, setSelectDate] = useState(new Date());

  // undone: 未達成 progress:作業中 done:達成済み
  useEffect(() => {
    (async () => {
      const todo = await getTododata();
      console.log(todo);
      setTododata(todo);
    })();
  }, []);

  return (
    <div>
      <Header></Header>
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
      {tododata.length !== 0 && (
        <LineChart tododata={tododata} selectDate={selectDate}></LineChart>
      )}
    </div>
  );
}

export default App;
