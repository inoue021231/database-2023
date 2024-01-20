import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Calendar from "./components/Calendar";
import TodoList from "./components/TodoList";
import { getTododata, postTododata, getUser } from "./api";
import Header from "./components/Header";

import Box from "@mui/material/Box";
import LineChart from "./components/LineChart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import List from "./pages/List";
function App() {
  const [tododata, setTododata] = useState([]);

  const [selectDate, setSelectDate] = useState(new Date());
  const [user, setUser] = useState(null);

  // undone: 未達成 progress:作業中 done:達成済み
  useEffect(() => {
    (async () => {
      const todo = await getTododata();
      console.log(todo);
      setTododata(todo);
    })();
    (async () => {
      const user = await getUser();
      console.log(user);
    })();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={<Login user={user} setUser={setUser}></Login>}
        />
        <Route
          path="/register"
          element={<Register user={user} setUser={setUser}></Register>}
        />
        <Route
          path="/list"
          element={
            <List
              tododata={tododata}
              setTododata={setTododata}
              selectDate={selectDate}
              setSelectDate={setSelectDate}
              user={user}
              setUser={setUser}
            ></List>
          }
        />
        <Route
          path="/profile"
          element={<Profile user={user} setUser={setUser}></Profile>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
