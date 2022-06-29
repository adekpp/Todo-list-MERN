import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, clearError } from "../../feauters/authSlice";
import { useNavigate } from "react-router-dom";
import { clearTodos } from "../../feauters/todosSlice";
import { AnimatePresence, motion } from "framer-motion";
import ReportIcon from "@mui/icons-material/Report";
import Icon from "../../googleicon.svg";

export const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, loginError } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clearTodos());

    if (user.token) {
      navigate("/todos");
    }
    if (loginError) {
      setErrorMessage(loginError);
      dispatch(clearError());
    }
  }, [user, loginError, navigate, dispatch, errorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(false);
    dispatch(clearError());
    if (!username || !password) {
      return setErrorMessage(true);
    }
    dispatch(login({ username: username, password: password }));
  };

  return (
    <div className="flex flex-col w-full h-full bg-gradient-to-r from-[#809bae] to-[#bed7e2] place-items-center justify-center">
      <motion.div
        className="relative flex flex-col gap-3 h-fit bg-[#d8dccc] p-8 drop-shadow-md place-items-center z-10"
        initial={{ x: -1000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              className="absolute top-[-30px] bg-red-400 w-full text-center font-semibold z-0"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p>{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="place-content-center">
          <h1 className="text-center font-semibold mb-4">Login</h1>
          <form
            className="flex flex-col"
            onSubmit={handleSubmit}
            onChange={(e) => {
              dispatch(clearError());
              setErrorMessage(false);
            }}
          >
            <label className="mb-4">
              <p>Username:</p>
              <input
                type="text"
                autoComplete="email"
                className="px-2 py-1 border-0 focus:outline-none"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
              />
              <AnimatePresence>
                {errorMessage && (
                  <motion.span
                    className="absolute ml-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ReportIcon color="warning" />
                  </motion.span>
                )}
              </AnimatePresence>
            </label>
            <label className="mb-4">
              <p>Password:</p>
              <input
                type="password"
                autoComplete="current-password"
                className="px-2 py-1 border-0 focus:outline-none"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <AnimatePresence>
                {errorMessage && (
                  <motion.span
                    className="absolute ml-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ReportIcon color="warning" />
                  </motion.span>
                )}
              </AnimatePresence>
            </label>
            <button className="bg-gray-600 rounded-sm text-white py-2 drop-shadow-md hover:bg-gray-500 active:scale-90">
              Login
            </button>
          </form>
          <p
            className="text-xs underline text-center mt-3 md:mt-1 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Don't have an account? Sign up!
          </p>
          <p className="text-center">or</p>
        </div>

        <button className="flex flex-row gap-1 w-full max-h-24 place-items-center justify-center bg-black text-white drop-shadow-md cursor-pointer active:scale-95 px-2 py-2">
          <img src={Icon} alt="Google icon" className="w-[30px] mx-auto " />
          <p className="text-center text-sm">Log in with google account</p>
        </button>
      </motion.div>
    </div>
  );
};
