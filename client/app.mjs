// main client js
import fetch from "node-fetch"
globalThis.fetch = fetch


const API_BASE = "http://localhost:5000"

let QA_arr = []



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
        console.log(` ID: ${QA_arr[i]._id} | Q: ${QA_arr[i].question} | A: ${QA_arr[i].answer}\n`)
    }
}

/* create array of q&a's from server info */
const setQAs = data => {
    const times = 5 
    QA_arr.push.apply(QA_arr, data)
    const len = QA_arr.length
    for (let i = 0; i < times; i++) {
        const randIndex = Math.random() * (len + 1)
        console.log(QA_arr[randIndex])
    }
}

// call api to get current questions
const getQAs = () => {
    fetch(API_BASE + "/questions")
        .then(res => res.json())
        .then(data => showQAs(data))
        .catch(err => console.error("Error: ", err))
}

const getQAsNoPrint = () => {
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
    setQAs([..._question, data]) // add question to previous question array
}

const randomly_shuffle = arr => {
    let items = []
    // TODO: Figure out how to shuffle array
    for (const item of arr) {
       items.push(item) 
       console.log(items)
    }

    items = items.sort(() => Math.random() - 0.5) 
}


// =========== Functionality ===============
const functionality = `
== Functionality Menu == 
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
    }

    // else no perceived errors
    if (all_args[2] === "play") {
        // TODO:  
        getQAsNoPrint()
    
    }
    
    // list all flash cards
    if (all_args[2] === "list") {
        getQAs() // we want to show all of the database questions
    }

    // add flash card 
    if (all_args[2] === "add") {
        const _question = all_args[3]
        const _answer = all_args[4]
        addQA(_question, _answer)
        console.log("Question Added")
    }

    // remove flash cards
    if (all_args[2] === "rm") {
        const id = all_args[3]
        deleteQA(id) 
        console.log(`ID ${id} deleted`)
    }

}

main()
