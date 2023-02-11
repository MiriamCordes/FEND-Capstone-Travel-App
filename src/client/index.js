import { handleSubmit } from "./js/formHandler";

import "./styles/input.scss";
import "./styles/result.scss";

// solution taken from: https://knowledge.udacity.com/questions/793705
document.getElementById("form").addEventListener("submit", handleSubmit);

export { handleSubmit };
