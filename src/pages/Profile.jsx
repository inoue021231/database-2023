import Header from "../components/Header";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";

import { Link } from "react-router-dom";

import { Grid, Paper, Typography } from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { getTaskdata } from "../api";

const Profile = (props) => {
  const { user, setUser } = props;
  const navigate = useNavigate();
  const [undoneCount, setUndoneCount] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);

  const ListItemWrapper = styled(ListItem)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  useEffect(() => {
    (async () => {
      if (!user) {
        navigate("/");
      }
      const data = await getTaskdata({ userID: user.id });
      setUndoneCount(data.filter((item) => item.status === "undone").length);
      setProgressCount(
        data.filter((item) => item.status === "progress").length
      );
      setDoneCount(data.filter((item) => item.status === "done").length);
    })();
  }, []);
  return (
    <div>
      {user && (
        <div>
          <Header user={user} setUser={setUser}></Header>
          <Grid>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: "80vh",
                width: "280px",
                m: "20px auto",
              }}
            >
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Avatar>
                  <AccountCircle />
                </Avatar>
                <Typography variant={"h7"} sx={{ m: "30px" }}>
                  {user.name}
                </Typography>
              </Grid>

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
                <ListItemWrapper>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        backgroundColor: "lightgray",
                      }}
                    >
                      <ArrowRightIcon></ArrowRightIcon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={"未達成"} />
                  <ListItemText primary={undoneCount} />
                </ListItemWrapper>
                <ListItemWrapper>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        backgroundColor: "skyblue",
                      }}
                    >
                      <AccessTimeIcon></AccessTimeIcon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={"作業中"} />
                  <ListItemText primary={progressCount} />
                </ListItemWrapper>
                <ListItemWrapper>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        backgroundColor: "lightgreen",
                      }}
                    >
                      <CheckIcon></CheckIcon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={"達成済"} />
                  <ListItemText primary={" " + doneCount} />
                </ListItemWrapper>
              </List>

              <Typography variant="caption" display="block">
                <Link
                  to="/list"
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    textDecorationColor: "blue",
                  }}
                >
                  メイン画面に戻る
                </Link>
              </Typography>
            </Paper>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Profile;
