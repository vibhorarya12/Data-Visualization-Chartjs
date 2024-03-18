import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../mystyle.css";
import officeman from "../assets/officeman.png";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import black from "../assets/black.png";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("admin@abcd.com");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@abcd.com" && password === "admin") {
      console.log("Login Successful");
      navigate("/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image-container">
        <img className="login-image" src={officeman} alt="md" />
      </div>
      <div className="login-form">
        <div className="login-box">
          <Box
            component="form"
            noValidate
            sx={{
              position: "relative",
              width: "80%",
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div className="logo-container">
              <img className="logo" src={black} alt="abcd" />
            </div>
            <Typography>Please log-in to your account</Typography>
            <Alert severity="info" sx={{ mt: 3, mb: 2 }}>
              email : admin@abcd.com | Pass : admin
            </Alert>
            <TextField
              error={error}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachEmailIcon sx={{ color: "black" }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              error={error}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityIcon sx={{ color: "black" }} />
                      ) : (
                        <VisibilityOffIcon sx={{ color: "black" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={error ? "Invalid credentials" : null}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                width: "50%",
                alignSelf: "center",
                bgcolor: "black",
                borderRadius: "20px",
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Divider>login with</Divider>
            <Stack direction="row" spacing={2} justifyContent={"center"} sx={{ mt: 2 }}>
              <IconButton>
                <FcGoogle size={25} />
              </IconButton>
              <IconButton>
                <FaFacebook size={25} color="blue" />
              </IconButton>
              <IconButton>
                <BsTwitterX size={25} color="black" />
              </IconButton>
              <IconButton>
                <FaGithub size={25} color="black" />
              </IconButton>
            </Stack>
          </Box>
        </div>
      </div>
    </div>
  );
}
