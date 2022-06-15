// main client js
import fetch from "node-fetch"
globalThis.fetch = fetch


const API_BASE = "http://localhost:5001"

// global question and answer arr imported from mongodb
let QA_arr = []

/* helper function to show formatted output */ 
const showFormatted = (arr, i) => {
    console.log(` ID: ${arr[i]._id} | Q: ${arr[i].question} | A: ${arr[i].answer}\n`)
}

/* Helper function to randomly shuffle an array of objects */ 
const randomly_shuffle = arr => {
    const indexes = []
    let times = 5
    const len = arr.length 
    if (len < times) { times = len }
    for (let i = 0; i < times; i++) {
        const randIndex = Math.floor(Math.random() * (len+1))
        if (arr.indexOf(randIndex) === -1) {
            showFormatted(arr, randIndex)
        } else {
            continue
        }
    }
}

/* for DELETE endpoint */ 
const newQAs = data => {
    QA_arr = data
    return QA_arr
}

/* apart from setQAs also shows data formatted */
const showQAs = data => {
    QA_arr.push.apply(QA_arr, data)
    console.log("\n")
    for (let i = 0; i < QA_arr.length; i++) {
        showFormatted(QA_arr, i)
    }
}

/* create array of q&a's from server info */
const setQAs = data => {
    QA_arr.push.apply(QA_arr, data)
    randomly_shuffle(QA_arr)
}

// call api to get current questions
const getQAs = () => {
    fetch(API_BASE + "/questions")
        .then(res => res.json())
        .then(data => showQAs(data))
        .catch(err => console.error("Error: ", err))
}

/* print different formatting than simply getQAs */ 
const getQAsToPlay = () => {
    fetch(API_BASE + "/questions")
        .then(res => res.json())
        .then(data => setQAs(data)) // only change from getQAs
        .catch(err => console.error("Error: ", err))
}

/* Delete question by clicking x functionality */
const deleteQA = async id => {
    const data = await fetch(API_BASE + "/question/delete/" + id, {method: "DELETE"}) 
        .then(res => res.json())
        .catch(() => console.error)

    // console.log(res)
    const newQuestions = questions => questions.filter(question => question._id !== data._id)
    newQAs(newQuestions)
}

/* Add question by clicking submit functionality */ 
const addQA = async (_question, _answer) => {
    const data = await fetch(API_BASE + "/question/new", {
        method: "POST", 
        headers: {
            "Content-type": "application/json"
        }, 
        body: JSON.stringify({
            question: _question, 
            answer: _answer
        })
    }).then(res => res.json())

    // update state
    newQAs([..._question, data]) // add question to previous question array
}



// =========== Functionality ===============
const functionality = `
== Flashy Functionality Menu by @technoabsurdist == 
-- node app.js play : shuffles and shows 5 random cards
-- node app.js list : lists all availables Q&As 
-- node app.js add "<question>" "<ansewr>"  : adds new questions and answers
-- node app.js rm id > => removes q&a with id of id
`

/* Main */ 
const main = () => {
    const all_args = process.argv

    if (all_args.length < 2) { 
        console.error("Not enough arguments provided: Use node app.js help")
        return
    }

    // guide the new-comer
    if (all_args[2] === "help") {
        console.log(functionality);
        return

    } else if (all_args[2] === "play") {
        getQAsToPlay()

    } else if (all_args[2] === "list") {
        getQAs() // we want to show all of the database questions

    } else if (all_args[2] === "add") {
        const _question = all_args[3]
        const _answer = all_args[4]
        addQA(_question, _answer)
        console.log("Question Added")
        return

    } else if (all_args[2] === "rm") {
        const id = all_args[3]
        deleteQA(id) 
        console.log(`ID ${id} deleted`)

    } else {
        console.log("Command not supported, please refer to `node app.mjs help`")
    }

}







// call main function (start program)
main()
