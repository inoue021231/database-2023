import { useState } from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

const ListItemWrapper = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const TodoList = (props) => {
  const { tododata, setTododata, selectDate } = props;

  const [newText, setNewText] = useState("");

  const checkDate = (date) => {
    if (date.getFullYear() !== selectDate.getFullYear()) return false;
    if (date.getMonth() !== selectDate.getMonth()) return false;
    if (date.getDate() !== selectDate.getDate()) return false;
    return true;
  };

  const handleAdd = () => {
    // 現状使われているIDを抽出
    const todayId = tododata
      .filter((item) => checkDate(item.date))
      .map((item) => item.id % 10000)
      .sort((a, b) => a - b);

    const year = selectDate.getFullYear();
    const month = String(selectDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectDate.getDate()).padStart(2, "0");

    let newId = 1;
    while (newId <= 9999) {
      if (!todayId.find((item) => item === newId)) {
        newId = String(newId).padStart(4, "0");
        const newData = {
          id: parseInt(`${year}${month}${day}${newId}`),
          text: newText,
          status: "undone",
          date: selectDate,
        };
        setTododata([...tododata, newData]);
        break;
      } else {
        newId++;
      }
    }
    console.log(tododata);
  };

  const handleDelete = (id) => {
    const updatedItems = tododata.filter((item) => item.id !== id);
    setTododata(updatedItems);
  };

  return (
    <div>
      <List
        sx={{
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
                  <CheckIcon />
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
