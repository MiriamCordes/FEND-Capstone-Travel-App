import { handleSubmit } from './js/formHandler'

import './styles/index.scss'

// solution taken from: https://knowledge.udacity.com/questions/793705
document.getElementById("form")
    .addEventListener("submit", handleSubmit)

export{handleSubmit}