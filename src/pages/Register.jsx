import Header from "../components/Header";

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
import { postUser } from "../api";

const Register = (props) => {
  const { user, setUser } = props;
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const navigate = useNavigate();
  const handleRegister = () => {
    if (userID && userName && userPassword) {
      (async () => {
        postUser({ userID, userName, userPassword });
        navigate("/");
      })();
    }
  };
  return (
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
            <Avatar sx={{ bgcolor: teal[400] }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant={"h7"} sx={{ m: "30px" }}>
              新規アカウント登録
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
            label="名前"
            variant="standard"
            onChange={(event) => setUserName(event.target.value)}
            fullWidth
            required
          />
          <TextField
            type="password"
            label="パスワード"
            variant="standard"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            onChange={(event) => setUserPassword(event.target.value)}
            fullWidth
            required
          />
          <Box mt={3}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => handleRegister()}
              fullWidth
            >
              登録
            </Button>
          </Box>
          <Typography variant="caption" display="block">
            <Link href="/">ログイン画面に戻る</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Register;
