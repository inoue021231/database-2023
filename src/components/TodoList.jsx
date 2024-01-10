import { useState } from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Popover from "@mui/material/Popover";
import Avatar from "@mui/material/Avatar";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import {
  deleteTododata,
  getTododata,
  postTododata,
  updateTododata,
} from "../api";

const ListItemWrapper = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const TodoList = (props) => {
  const { tododata, setTododata, selectDate } = props;

  const [newText, setNewText] = useState("");

  const checkDate = (date) => {
    const newDate = new Date(date);
    if (newDate.getFullYear() !== selectDate.getFullYear()) return false;
    if (newDate.getMonth() !== selectDate.getMonth()) return false;
    if (newDate.getDate() !== selectDate.getDate()) return false;
    return true;
  };

  const Icon = (prop) => {
    const { status } = prop;
    const undone = <ArrowRightIcon></ArrowRightIcon>;
    const progress = <AccessTimeIcon></AccessTimeIcon>;
    const done = <CheckIcon></CheckIcon>;
    if (status === "undone") {
      return undone;
    } else if (status === "progress") {
      return progress;
    } else {
      return done;
    }
  };

  const handleUpdateStatus = (status, id) => {
    let newStatus;
    if (status === "undone") {
      newStatus = "progress";
    } else if (status === "progress") {
      newStatus = "done";
    } else {
      newStatus = "undone";
    }
    (async () => {
      await updateTododata({ status: newStatus, id });
      const data = await getTododata();
      setTododata(data);
    })();
  };

  const handleAdd = () => {
    if (newText === "") return;
    const year = selectDate.getFullYear();
    const month = String(selectDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectDate.getDate()).padStart(2, "0");

    (async () => {
      await postTododata({
        text: newText,
        date: `${year}-${month}-${day}`,
        status: "undone",
      });
      const data = await getTododata();
      setTododata(data);
    })();
  };

  const handleDelete = (id) => {
    (async () => {
      await deleteTododata(id);
      const data = await getTododata();
      setTododata(data);
    })();
  };

  return (
    <div>
      <h2>
        {selectDate.getFullYear()}年{selectDate.getMonth() + 1}月
        {selectDate.getDate()}日
      </h2>
      <List
        sx={{
          backgroundColor: "lightgray",
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}
      >
        {tododata.map((item, index) => {
          return checkDate(item.date) ? (
            <ListItemWrapper key={index}>
              <ListItemAvatar>
                <Avatar>
                  <IconButton
                    aria-label="update"
                    onClick={() => handleUpdateStatus(item.status, item.id)}
                  >
                    <Icon status={item.status}></Icon>
                  </IconButton>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.text} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemWrapper>
          ) : (
            <div key={index}></div>
          );
        })}
        <ListItemWrapper>
          <TextField
            id="standard-basic"
            label="追加"
            variant="standard"
            onChange={(e) => setNewText(e.target.value)}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="add" onClick={() => handleAdd()}>
              <PlaylistAddIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItemWrapper>
      </List>
    </div>
  );
};

export default TodoList;
