import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../feauters/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#624639",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TODO List
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{
              marginRight: "1rem",
            }}
          >
            Hello, {user && user.username}
          </Typography>
          <Button
            className="active:scale-90"
            sx={{
              backgroundColor: "#3f2e26",
              color: "white",
              "&:hover": {
                backgroundColor: "#3f2e26",
              },
            }}
            size="small"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
