/* jshint esversion: 6 */

//select all the flip cards
const cards = document.querySelectorAll(".flip-card-inner");

//Do this function for every card
cards.forEach((card, index) => {
    //get the status box inside the card
  const statusBox = card.querySelector(".status-box");

  // I am telling the program to wait for the user to click the card
  card.addEventListener("click", () => {
    // Flip the card
    card.classList.toggle("is-flipped");

      setTimeout(() => { //delays the function so you only see it turn green after it the card has fullt flipped
        statusBox.textContent = "Completed";
        statusBox.classList.add("completed");
      }, 550);
   
  });
});

//QUIZ 1//
const quiz1Data = [
    {
        id: "0",
        question: "What is a Kiwisaver?",
        options: ["A NZ Goverment scheme aimed with helping people save for retirement", "A bank account for everyday spending", "A system to help pay your taxes", "The process you repay your student loans."],
        answer: "A NZ Goverment scheme aimed with helping people save for retirement"
    },
    {
        id: "1",
        question: "What age can most people acsess their Kiwisaver money fore retirement?",
        options: ["50", "60", "65", "70"],
        answer: "65"
    },
    {
        id: "2",
        question: "What is the minimum percent an employer must contribute to your KiwiSaver?",
        options: ["2%", "2.5%", "3%", "3.5%"],
        answer: "3.5%"
    },
    {
        id: "3",
        question: "If you save $1040 in your Kiwisaver over the year how much will the Goverment contribute?",
        options: ["$1040", "$521.43", "Nothing", "$654.87"],
        answer: "$521.43"
    },
      {
        id: "4",
        question: "What percentage contribution is recommended for young people?",
        options: ["10%", "8%", "6%", "7%"],
        answer: "6%"
    },
       {
        id: "5",
        question: "You can withdraw money from your Kiwisaver to buy your...",
        options: ["Your groceries", "A room in a rest home", "Your Holiday", "First Home"],
        answer: "First Home"
    },
     {
        id: "6",
        question: "What is one of the mistakes people make when using a Kiwisaver?",
        options: ["Opting out too early", "Contributing too much", "Checking their balance too often", "Telling their friends about it"],
        answer: "Opting out too early"
    },
  
   
];

//QUIZ 2//
const quiz2Data = [
    {
        id: "0",
        question: "At what age are you able to start part time work?",
        options: ["18-19", "11-12", "13-14", "14-15"],
        answer: "14-15"
    },
    {
        id: "1",
        question: "What is not a right for workers in NZ",
        options: ["Holiday Pay", "Free lunch", "Minimum wage", "Meal breaks"],
        answer: "Free lunch"
    },
    {
        id: "2",
        question: "What is minimum hourly wage for fully trained adults?",
        options: ["$23.95", "$50", "$23.50", "$25"],
        answer: "$23.95"
    },
    {
        id: "3",
        question: "What does PAYE stand for?",
        options: ["Nothing", "Production Ascosiation Your Earth", "Pay As You Earn", "Please Add Your Earnings"],
        answer: "Pay As You Earn"
    },
     {
        id: "4",
        question: "What percentage does the rule of thumb say to spend on your needs?",
        options: ["20%", "100%", "60%", "50%"],
        answer: "50%"
    },
    {
        id: "5",
        question: "When is the end of the tax year?",
        options: ["31st of March", "30th of March", "29th of March", "13 of March"],
        answer: "31st of March"
    },
    {
        id: "6",
        question: "How much money (at least) do you have to make before paying off your student loans?",
        options: ["$2,000+", "$44,000+", "$22,000+", "$23,000+"],
        answer: "$22,000+"
    },

];

//STORE BOTH QUIZZES//
const allQuizData = {
    1: quiz1Data,
    2: quiz2Data
};

// RUN EACH QUIZ SEPARATELY//
document.querySelectorAll(".quiz").forEach((quizBox, index) => {

    const quizNumber = index + 1; //quiz 1 quiz 2//
    const quizData = allQuizData[quizNumber];

    const questionElement = quizBox.querySelector(".question"); //Setting the variables//
    const optionsElement = quizBox.querySelector(".options"); //Setting the variables//
    const nextButton = quizBox.querySelector('.submit'); //Setting the variables// 

    let currentQuestion = 0;
    let score = 0;

    function showQuestion() {
        const question = quizData[currentQuestion]; 
        questionElement.innerText = question.question;

        optionsElement.innerHTML = "";
        question.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.addEventListener("click", selectAnswer);
            optionsElement.appendChild(button);
        });
        
    }

    //Select answer//
    function selectAnswer(e) {
   
       optionsElement.querySelectorAll('button') //Finds all the options in the .options container//
       .forEach(btn => {btn.classList.remove('selected');}); //unselects everything//
       e.target.classList.add('selected'); //Selects the function that was actually clicked//
       
       nextButton.classList.add('active');//makes the submit button active//
      
    }

    

    function handleSubmit() {
        const selectedBtn = optionsElement.querySelector('.selected');

        //If no option selected, do nothing//
        if (!selectedBtn) return;

        const selectedAnswer = selectedBtn.innerText;
        const correctAnswer = quizData[currentQuestion].answer;

        //Check if correct//
        if (selectedAnswer === correctAnswer) {
            score++;
        }

        currentQuestion++;

        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showResults();
        }
        nextButton.classList.remove("active"); //makes it unactive//
    }

    function showResults() {
        
        

        quizBox.innerHTML = `
            <h2>Quiz Completed!</h2>
            <p>Your score: ${score}/${quizData.length}</p>
            <button class="restart">Play Again</button>
        `;

        quizBox.querySelector(".restart").addEventListener("click", () => {
            location.reload(); //gets .restart - refreshes the page//
        });

       
    }

    //Attach submit button event//
    nextButton.addEventListener("click", handleSubmit);

    //Start the quiz//
    showQuestion();
// ====================== RECENT SCORE SYSTEM ======================




});
