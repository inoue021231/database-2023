import Header from "./../components/Header";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { teal } from "@mui/material/colors";
import { getUser } from "../api";

const Login = (props) => {
  const { user, setUser } = props;
  const [userID, setUserID] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const navigate = useNavigate();
  const handleLogin = () => {
    (async () => {
      const data = await getUser();
      if (
        data.find(
          (item) => item.userID === userID && item.userPassword === userPassword
        )
      ) {
        const name = data.filter(
          (item) => item.userID === userID && item.userPassword === userPassword
        )[0].userName;
        console.log(name);
        setUser({ id: userID, name });
        navigate("/list");
      }
    })();
  };
  return (
    <div>
      <Header user={user} setUser={setUser}></Header>
      <Grid>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            height: "70vh",
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
            <Avatar sx={{ bgcolor: teal[400] }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant={"h5"} sx={{ m: "30px" }}>
              ログイン
            </Typography>
          </Grid>
          <TextField
            label="ユーザーID"
            variant="standard"
            onChange={(event) => setUserID(event.target.value)}
            fullWidth
            required
          />
          <TextField
            type="password"
            label="パスワード"
            variant="standard"
            onChange={(event) => setUserPassword(event.target.value)}
            fullWidth
            required
          />
          <Box mt={3}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => handleLogin()}
              fullWidth
            >
              ログイン
            </Button>
            <Typography variant="caption" display="block">
              <Link href="/register">アカウントを作成</Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
