const scores = JSON.parse(localStorage.getItem('scores')) || []


let questions = [{

  questions: "In which of these HTML elements do we put Javascript in?",
  choices: ["scripting", "js", "javascript", 'script'],
  answer: ['incorrect', 'incorrect', 'incorrect', 'correct']
},

{
  questions: "In Javascript, NaN means?",
  choices: ["Names and Numbers", "Nor a Number", "Non active Number", "Not a Number"],
  answer: ['incorrect', 'incorrect', 'incorrect', 'correct']
},

{
  questions: 'How would you call a function named "myFunction"?',
  choices: ["myFunction()", "call function myFunction", "call myFunction", "myFunction call"],
  answer: ['correct', 'incorrect', 'incorrect', 'incorrect']
},

{
  questions: 'How do you write "Hello World" using alerts?',
  choices: ['return("Hello World")', 'alert("Hello World")', 'print("Hello World")', 'confirm("Hello World")'],
  answer: ['incorrect', 'correct', 'incorrect', 'incorrect']
},

{
  questions: "Where should Javascript be placed?",
  choices: ["the head section", "the body section", "the inter section", "both the head and body section"],
  answer: ['incorrect', 'correct', 'incorrect', 'incorrect']
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
            <button type="button" class="btn btn-primary ${q.answer[0]}">A</button>
          </div>
          <div class="col-10  mt-5">
           ${q.choices[0]}
          </div>
        </div>
        <div class="row">
          <div class="col-1  mt-5"style="display: flex; justify-content: center;" >
            <button type="button" class="btn btn-primary ${q.answer[1]}">B</button>
          </div>
          <div class="col-10 mt-5">
           ${q.choices[1]}
          </div>
        </div>
        <div class="row">
          <div class="col-1  mt-5" style="display: flex; justify-content: center;">
            <button type="button" class="btn btn-primary ${q.answer[2]}">C</button>
          </div>
          <div class="col-10 mt-5">
            ${q.choices[2]}
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
        <h2>Time Remaining: ${elapsedTime}</h2>
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Challenger! Enter your name, and be known through history!</label>
            <input id="name" type="text" class="form-control" >
          </div>
          <button id="highScore" type="submit" class="btn btn-primary">Submit</button>
        </form>
    `
    document.getElementById('questions').append(finalScore)
    document.getElementById('highScore').addEventListener('click', event => {
      event.preventDefault()
      console.log("added")
      let name = document.getElementById('name').value
      console.log("name")
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