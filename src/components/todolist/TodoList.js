import React from "react";
import { SingleTodo } from "../todo/SingleTodo";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
export const TodoList = () => {
  const todos = useSelector((state) => state.todos.todos);

  return (
    <ul className="flex flex-col gap-2 w-full">
      <AnimatePresence>
        {todos &&
          todos.map((todo, i) => (
            <motion.div
              key={todo._id}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              exit={{ opacity: 0, width: 0, transition: { duration: 0.2 } }}
            >
              <SingleTodo key={i} todo={todo} />
            </motion.div>
          ))}
      </AnimatePresence>
    </ul>
  );
};
