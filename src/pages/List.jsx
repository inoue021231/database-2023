import Calendar from "./../components/Calendar";
import TodoList from "./../components/TodoList";
//import { getTododata, postTododata } from "./api";
import Header from "./../components/Header";
import LineChart from "./../components/LineChart";

import Box from "@mui/material/Box";
import { useEffect } from "react";
import { getTaskdata } from "../api";

import { useNavigate } from "react-router-dom";

const List = (props) => {
  const { tododata, setTododata, selectDate, setSelectDate, user, setUser } =
    props;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!user) {
        navigate("/");
      }
      const data = await getTaskdata({ userID: user.id });
      setTododata(data);
      console.log(data);
    })();
  }, []);
  return (
    <div>
      <Header user={user} setUser={setUser}></Header>
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
            user={user}
          />
        </Box>
      </Box>
      {tododata.length !== 0 && (
        <LineChart tododata={tododata} selectDate={selectDate}></LineChart>
      )}
    </div>
  );
};

export default List;
