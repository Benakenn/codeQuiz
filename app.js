const scores = JSON.parse(localStorage.getItem('scores')) || []


let questions = [{
  questions: "Which of the following is NOT a JavaScript Data Types?",
  choices: ["Number", "String", "Object", "Web"],
  answer: ['incorrect', 'incorrect', 'incorrect', 'correct']
},

{
  questions: "What does NaN mean?",
  choices: ["Not a Neutral", "Never ate Natto", "Not a Number", "Not a Name"],
  answer: ['incorrect', 'incorrect', 'correct', 'incorrect']
},

{
  questions: "What is considered to be a looping structure?",
  choices: ["for", "repeat", "around", "again"],
  answer: ['correct', 'incorrect', 'incorrect', 'incorrect']
},

{
  questions: "What is not a type of Pop up boxes in JavaScript?",
  choices: ["Alert", "Prompt", "Confirm", "Show"],
  answer: ['incorrect', 'incorrect', 'incorrect', 'correct']
}]

let index = 0
let correct = 0;
let incorrect = 0;
let timer = ''
let seconds = 100

const renderQuestion = (q) => {
  if (index < questions.length) {


    document.getElementById('questions').innerHTML = ''
    const questionElem = document.createElement('div')
    questionElem.innerHTML = `
     <h1>${q.questions}</h1>
        <div class="row">
          <div class="col-1 mt-5" style="display: flex; justify-content: center;">
            <button type="button" class="btn btn-primary ${q.answer[3]}">A</button>
          </div>
          <div class="col-10  mt-5">
           ${q.choices[3]}
          </div>
        </div>
        <div class="row">
          <div class="col-1  mt-5"style="display: flex; justify-content: center;" >
            <button type="button" class="btn btn-primary ${q.answer[2]}">B</button>
          </div>
          <div class="col-10 mt-5">
           ${q.choices[2]}
          </div>
        </div>
        <div class="row">
          <div class="col-1  mt-5" style="display: flex; justify-content: center;">
            <button type="button" class="btn btn-primary ${q.answer[0]}">C</button>
          </div>
          <div class="col-10 mt-5">
            ${q.choices[0]}
          </div>
        </div>
        <div class="row">
          <div class="col-1  mt-5" style="display: flex; justify-content: center;">
            <button type="button" class="btn btn-primary ${q.answer[3]}">D</button>
          </div>
          <div class="col-10  mt-5">
           ${q.choices[3]}
          </div>
        </div>
  
  `
    document.getElementById('questions').append(questionElem)
    index++
  }

  else {
    clearInterval(timer)
    let elapsedTime = 100 - document.getElementById('seconds').textContent
    document.getElementById('questions').innerHTML = ''
    const finalScore = document.createElement('div')
    percentage = correct / (correct + incorrect)
    finalScore.innerHTML = `
    <h1>Final Score</h1>
        <h2>Answers Correct: ${correct}</h2>
        <h2>Incorrect: ${incorrect}</h2>
        <h2>Elapsed Time: ${elapsedTime}</h2>
        <form>
          <div class="mb-3">
            <label for="initials" class="form-label">Enter your initials to record your score!</label>
            <input id="initials" type="text" class="form-control"  style=" width:25%">
          </div>
          <button id="highScore" type="submit" class="btn btn-primary">Submit</button>
        </form>
    `
    document.getElementById('questions').append(finalScore)
    document.getElementById('highScore').addEventListener('click', event => {
      event.preventDefault()
      console.log("caught")
      let name = document.getElementById('initials').value
      console.log(name)
      scores.push({ name, correct, elapsedTime })

      localStorage.setItem('scores', JSON.stringify(scores))
      location.reload();

      alert("Score added!")
    })
  }

}


document.getElementById('start').addEventListener('click', event => {
  index = 0
  timer = setInterval(() => {

    if (seconds <= 0) {
      seconds = 0
    } else {
      seconds--
    }
    document.getElementById('seconds').innerText = seconds
  }, 1000)
renderQuestion(questions[index])

})

document.addEventListener('click', event => {
  if (event.target.classList.contains('correct')) {
    event.target.classList.add('green')
    correct++
    alert("Correct!")
    renderQuestion(questions[index])

  }
  else if (event.target.classList.contains('incorrect')) {
    event.target.classList.add('red')
    incorrect++
    seconds -= 20
    timer = setInterval(() => {
      if (seconds <= 0) {
        seconds = 0
      } else {
        seconds--
      }
      document.getElementById('seconds').innerText = seconds
    }, 1000)

    alert("Incorrect! -20 sec")
    if (seconds <= 0) {
      index = questions.length
      document.getElementById('seconds').innerText = 0

    }
    renderQuestion(questions[index])

  }

})