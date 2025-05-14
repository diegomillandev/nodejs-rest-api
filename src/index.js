import server from "./server.js";
import colors from "colors";
import { PORT } from "./constants/env.js";

server.listen(PORT, () => {
  console.log(colors.cyan.bold(`Server running on port ${PORT}`));
});
