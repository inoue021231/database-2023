import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import { getTododata } from "./api";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import List from "./pages/List";
function App() {
  const [tododata, setTododata] = useState([]);

  const [selectDate, setSelectDate] = useState(new Date());
  const [user, setUser] = useState(null);

  // undone: 未達成 progress:作業中 done:達成済
  useEffect(() => {
    (async () => {
      const todo = await getTododata();
      setTododata(todo);
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
