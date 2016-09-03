
window.onload = function () {
  
  var questionArea = document.getElementsByClassName('questions')[0],
      answerArea   = document.getElementsByClassName('answers')[0],
      checker      = document.getElementsByClassName('checker')[0],
      info         = document.getElementsByClassName('info')[0]
      current      = 0,
  
     // An object that holds all the questions + possible answers.
     // In the array the last digit gives the right answer position
      allQuestions = {
        'Who was the last person to join the Beatles?' : 
                    ['Paul McCartney', 
                    'John Lennon', 
                    'Ringo Star',
                    'George Harrison',2],
        
        'Which is Not a Beatles movie?' : 
                    ['Hard Days Night', 
                    'Yellow Submarine', 
                    'Help!', 
                    'With the Beatles', 3],
        
        'How many albums did the Beatles sell in total?' : 
                    ['2,300,500,000', 
                    '4,100,000,000', 
                    '1,200,600,000', 
                    '1,400,500,000',0],

        'Who wrote the most songs for the Beatles?' : 
                    ['John Lennon', 
                    'Paul McCartney',
                     'George Harrison', 
                     'Lennon/McCartney',3],

        'How many people in America watched the Beatles appearance on the Ed Sullivan show?' : ['70 Million', 
                    '40 Million', 
                    '2 Million', 
                    '15 Million', 1],

        'What record company rejected the Beatles originally?' :       ['Abbey Road', 
                    'Singer Co,', 
                    'Decca', 
                    'Apple',2],

        'What was the Bealtes first single in 1962?' :             
                    ['Please Please Me', 
                    'Love Me Do', 
                    'I Saw Her Standing There', 
                    'Twist and Shout',1] 

      };

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

// Timer 
  function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(seconds);
// When Time Runs Out Question will Change
        if (--timer < 0) {
            timer = duration;
            current += 1;
            //loadQuestion(current);
            //loadAnswers(current);
            questionArea.innerHTML = 'You Ran Out of Time!';
            answerArea.innerHTML = '<a href="start.html">RESTART</a>';
            document.getElementById("timer").style.visibility = "hidden";
        }
    }, 1000);
}

jQuery(function Timer($) {
    var time = 60 * 1,
        display = $('#time');
    startTimer(time, display);
});


  function loadQuestion(curr) {
  // Loads the questions from the array
  
    var question = Object.keys(allQuestions)[curr];
    
    questionArea.innerHTML = '';
    questionArea.innerHTML = question;
  }
  
  function loadAnswers(curr) {
  // Will load the answers from the array and find which is marked correct
  
    var answers = allQuestions[Object.keys(allQuestions)[curr]];
    
    answerArea.innerHTML = '';
    
    for (var i = 0; i < answers.length -1; i += 1) {
      var createDiv = document.createElement('div'),
          text = document.createTextNode(answers[i]);
      
      createDiv.appendChild(text);      
      createDiv.addEventListener("click", checkAnswer(i, answers));

      
      
      answerArea.appendChild(createDiv);
    }
  }


  function checkAnswer(i, arr) {
    // Checks Answers and Will Mark Correct or Incorrect
    
    return function () {
      var givenAnswer = i,
          correctAnswer = arr[arr.length-1];
      
      if (givenAnswer === correctAnswer) {
        addChecker(true);             
      } else {
        addChecker(false);                        
      }
      
      if (current < Object.keys(allQuestions).length -1) {
        current += 1;
        
        loadQuestion(current);
        loadAnswers(current);
      } else {
        questionArea.innerHTML = '<a href="start.html">RESTART</a>';
        answerArea.innerHTML = '';

      }
                              
    };
  }

  function addChecker(bool) {
  // Adds the numbers at the bottom (styling done in CSS)
  
    var createDiv = document.createElement('div'),
        txt       = document.createTextNode(current + 1);
    
    createDiv.appendChild(txt);
    
    if (bool) {
      
      createDiv.className += 'correct';
      checker.appendChild(createDiv);
    } else {
      createDiv.className += 'false';
      checker.appendChild(createDiv);
    }
  }
  
  // Start the quiz right away
  loadQuestion(current);
  loadAnswers(current);
  
};


