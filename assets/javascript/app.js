// Establish a single object to hold entire trivia game

var triviaGame = {
    "questions": [
        {
            "question": "The TV show 'Frasier' is based on what US city?",
            "answers": [
                "Boston",
                "Austin",
                "Seattle",
            ],
            "correct": 2
        },
        {
            "question": "What sitcom drew an audience of 80.4 million viewers for its final episode, in 1993?",
            "answers": [
                "M*A*S*H",
                "Newhart",
                "Cheers",
            ],
            "correct": 2,
        },
        {
            "question": "The fictional town of South Park is located in what US state?",
            "answers": [
                "Colorado",
                "Montana",
                "Utah",
            ],
            "correct": 0,
        },
        {
            "question": "What is Indiana Jones' daytime occupation?",
            "answers": [
                "Anthropologist",
                "Professor",
                "Economist",
            ],
            "correct": 1
        },
        {
            "question": "What movie features the line: 'You can't handle the truth?",
            "answers": [
                "Born on the Fourth of July",
                "Top Gun",
                "A Few Good Men",
            ],
            "correct": 0
        },
        {
            "question": "In Harry Potter, who is it that reveals to Harry that he is a wizard?",
            "answers": [
                "Dumbledore",
                "Ron Weasley",
                "Hagrid",
            ],
            "correct": 2
        },
        {
            "question": "What city was the setting for the film 'Die Hard'?",
            "answers": [
                "Los Angeles",
                "New York",
                "San Diego",
            ],
            "correct": 0
        },
        {
            "question": "What movie features the line: 'You can't handle the truth?",
            "answers": [
                "Born on the Fourth of July",
                "Top Gun",
                "A Few Good Men",
            ],
            "correct": 0
        },
        {
            "question": "Peter Marshall was the host of what game show for 15 years?",
            "answers": [
                "Let's Make a Deal",
                "The Hollywood Squares",
                "The Dating Game",
            ],
            "correct": 0
        },
        {
            "question": "Which TV show used the song 'Love and Marriage' by Frank Sinatra as its theme song?",
            "answers": [
                "Family Matters",
                "Who's the Boss?",
                "Married...With Children",
            ],
            "correct": 0
        },
        
    ],
};


triviaGame.buildForm = function () {
    var myForm = $('<form id="trivia-form" name="triviaForm">');

    for (var i = 0; i < 3; i++) {
        var myDiv = $('<div class="trivia-answer">');
        myDiv.append($('<label><input class="trivia-radio" type="radio" name="answer" value="' + i + '"><span id="trivia-answer-' + i + '"/></label>'));
        myDiv.append($('<br>'));


        myForm.append(myDiv);
    }
    myDiv.append($('<button id="submit-btn" type="submit">Submit Your Answer</button>'));

    $("#trivia-answers").append(myForm);

    $(myForm).submit(function (event) {
        event.preventDefault();
        triviaGame.submitAnswer(this.answer.value);
    });
};

triviaGame.showAnswerRight = function () {
    this.numCorrect++;
    $("#trivia-message").text("Congratulations! You got the right answer!");
    $("#trivia-message").show();

    setTimeout(function () {
        triviaGame.showNextQuestion();
    }, 3000);
}

triviaGame.showAnswerWrong = function () {
    this.numWrong++;
    $("#trivia-message").text("You got the wrong answer! The correct answer was: " + this.questions[this.currentQuestion].answers[this.questions[this.currentQuestion].correct]);
    $("#trivia-message").show();

    setTimeout(function () {
        triviaGame.showNextQuestion();
    }, 3000);
}

triviaGame.showAnswerTimeout = function () {
    this.numWrong++;
    $("#trivia-message").text("You ran out of time! The correct answer was: " + this.questions[this.currentQuestion].answers[this.questions[this.currentQuestion].correct]);
    $("#trivia-message").show();

    setTimeout(function () {
        triviaGame.showNextQuestion();
    }, 3000);
}

triviaGame.showFirstQuestion = function () {
    $("#trivia-control").hide();
    this.currentQuestion = -1;
    this.numCorrect = 0;
    this.numWrong = 0;
    this.showNextQuestion();
}

triviaGame.showNextQuestion = function () {
    this.currentQuestion++;

    if (this.currentQuestion >= this.questions.length) {
        $("#trivia-message").text("You got " + this.numCorrect + " correct and " + this.numWrong + " wrong. Press start to play again.");
        $("#trivia-control").show();
        $("#trivia-question").hide();
        $("#trivia-answers").hide();
    } else {
        $("#trivia-question").text("#" + (this.currentQuestion + 1) + ": " + this.questions[this.currentQuestion].question);

        for (var i = 0; i < 3; i++) {
            $("#trivia-answer-" + i).text(this.questions[this.currentQuestion].answers[i]);
        }

        $("#trivia-question").show();
        $("#trivia-answers").show();


        this.timeRemaining = 10;
        $("#trivia-message").text("You have " + triviaGame.timeRemaining + " seconds remaining");

        this.currentInterval = setInterval(function () {
            triviaGame.timeRemaining--;

            if (triviaGame.timeRemaining < 1) {
                clearInterval(triviaGame.currentInterval);
                triviaGame.showAnswerTimeout()
            } else {
                $("#trivia-message").text("You have " + triviaGame.timeRemaining + " remaining");
            }
        }, 1000);

    }
}


triviaGame.submitAnswer = function (answer) {

    if (answer === undefined || answer === "" || this.timeRemaining <= 0) {
        return;
    }
    clearInterval(this.currentInterval);
    this.timeRemaining = 0;

    if (answer == this.questions[this.currentQuestion].correct) {
        this.showAnswerRight();
    } else {
        this.showAnswerWrong();
    }
};

$(document).ready(function () {
    triviaGame.buildForm();
    $("#trivia-question").hide();
    $("#trivia-answers").hide();

    $("#trivia-start").click(function () {
        triviaGame.showFirstQuestion();
    });
});