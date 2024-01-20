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
  getTaskdata,
  getTododata,
  postTododata,
  updateTododata,
} from "../api";

const ListItemWrapper = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const TodoList = (props) => {
  const { tododata, setTododata, selectDate, user } = props;

  const [newText, setNewText] = useState("");

  const checkDate = (date) => {
    const newDate = new Date(date);
    if (newDate.getFullYear() !== selectDate.getFullYear()) return false;
    if (newDate.getMonth() !== selectDate.getMonth()) return false;
    if (newDate.getDate() !== selectDate.getDate()) return false;
    return true;
  };

  const Icon = (prop) => {
    const { status, id } = prop;
    const undone = (
      <Avatar
        sx={{
          backgroundColor: "lightgray",
        }}
      >
        <IconButton
          aria-label="update"
          onClick={() => handleUpdateStatus(status, id)}
        >
          <ArrowRightIcon></ArrowRightIcon>
        </IconButton>
      </Avatar>
    );
    const progress = (
      <Avatar
        sx={{
          backgroundColor: "skyblue",
        }}
      >
        <IconButton
          aria-label="update"
          onClick={() => handleUpdateStatus(status, id)}
        >
          <AccessTimeIcon></AccessTimeIcon>
        </IconButton>
      </Avatar>
    );
    const done = (
      <Avatar
        sx={{
          backgroundColor: "lightgreen",
        }}
      >
        <IconButton
          aria-label="update"
          onClick={() => handleUpdateStatus(status, id)}
        >
          <CheckIcon></CheckIcon>
        </IconButton>
      </Avatar>
    );
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
      const data = await getTaskdata({ userID: user.id });
      setTododata(data);
    })();
  };

  const handleAdd = () => {
    if (newText === "") return;
    const year = selectDate.getFullYear();
    const month = String(selectDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectDate.getDate()).padStart(2, "0");

    (async () => {
      if (user) {
        await postTododata({
          text: newText,
          date: `${year}-${month}-${day}`,
          status: "undone",
          userID: user.id,
        });
        const data = await getTaskdata({ userID: user.id });
        setTododata(data);
      }
    })();
  };

  const handleDelete = (id) => {
    (async () => {
      await deleteTododata(id);
      const data = await getTaskdata({ userID: user.id });
      setTododata(data);
    })();
  };

  return (
    <div>
      <div style={{ fontSize: "20px", marginTop: "10px" }}>
        {selectDate.getFullYear()}年{selectDate.getMonth() + 1}月
        {selectDate.getDate()}日
      </div>
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
                <Icon status={item.status} id={item.id}></Icon>
              </ListItemAvatar>
              <ListItemText
                primary={item.text}
                onClick={() => handleUpdateStatus(item.status, item.id)}
              />
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
