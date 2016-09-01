 //Play & Pause Song
$(document).ready(function() {
  var playing = true;

  $('#button').click(function() {
      $(this).toggleClass("down");

      if (playing == true) {
          document.getElementById('player').play();
          playing = false;
          $(this).text("pause");

      } else {
        document.getElementById('player').pause();
        playing = true;
        $(this).text("play");
      }

  });
});

var questions = [{

    question: 'Who was the last person to join the Beatles?',
    choices: [      'Paul McCartney', 
                    'John Lennon', 
                    'Ringo Star', 
                    'George Harrison'],
    correctAnswer: 2,
    //questionInfo: 'The Beatles only acquired Ringo as a member after their former drummer Pete Best left.'
},
{
    question: 'Which is Not a Beatles movie?',
    choices: [      'Hard Days Night', 
                    'Yellow Submarine', 
                    'Help!', 
                    'With the Beatles'],
    correctAnswer: 3,
    //questionInfo: ' The Beatles had a long running film career with movies including Hard Days Night, Help!, Magical Mystery Tour, Yellow Submarine(thier only annimated feature), and The End.'
},
{   question: 'How many albums did the Beatles sell in total?',
    choices: [      '2,300,500,000', 
                    '4,100,000,000', 
                    '1,200,600,000', 
                    '1,400,500,000'],
    correctAnswer: 0,
    //questionInfo: 'In the United States alone the Beatles sold 209.1 Million albums on all avaiable markets, including iTunes.'
},
{   question: 'Who wrote the most songs for the Beatles?',
    choices: [      'John Lennon', 
                    'Paul McCartney',
                     'George Harrison', 
                     'Lennon/McCartney'],
    correctAnswer: 3,
    //questionInfo: 'From the begining John Lennon and Paul McCartney decided to publish their sings under both their names so all songs they worked on were under the hallmark Lennon/McCartney. The two wrote in total 159 of the groups 183 songs.'
    },
    {   question: 'How many people in America watched the Beatles appearance on the Ed Sullivan show?',
    choices: [      '70 Million', 
                    '40 Million', 
                    '2 Million', 
                    '15 Million'],
    correctAnswer: 0,
    },
    //questionInfo: 'In the United States alone the Beatles sold 209.1 Million albums on all avaiable markets, including iTunes.'
    {   question: 'What record company rejected the Beatles originally?',
    choices: [      'Abbey Road', 
                    'Singer Co,', 
                    'Decca', 
                    'Apple'],
    correctAnswer: 2,
    },
    //questionInfo: 'In the United States alone the Beatles sold 209.1 Million albums on all avaiable markets, including iTunes.'
    {   question: 'What was the Bealtes first single in 1962?',
    choices: [      'Please Please Me', 
                    'Love Me Do', 
                    'I Saw Her Standing There', 
                    'Twist and Shout'],
    correctAnswer: 1,
    //questionInfo: 'In the United States alone the Beatles sold 209.1 Million albums on all avaiable markets, including iTunes.'
}];
 



//Global Variables
var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;


//Start of Quiz
$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();


 // On clicking next, display the next question
    $(this).find("#nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++;
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find("#nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find("#nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}
