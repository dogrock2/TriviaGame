$().ready(function () {

    var name;
    var intervalId;
    var timerCnt;
    var category;
    var question;
    var rand;
    var randAnswers;
    var noDuplicates;
    var numQuestions;
    var correct = 0;
    var incorrect = 0;
    var missed = 0;
    var showGif;

    var questions = [
        ['Game of Thrones', 'What is John Snow\'s real name?', 'Aegon_Targaryen'],
        ['Game of Thrones', 'Which dragon did the Night King killed?', 'Viserion'],
        ['Game of Thrones', 'From what city did Daenerys get the unsullied army?', 'Astapor'],
        ['Game of Thrones', 'What was the Mad King\'s real name?', 'Aerys_Targaryen'],
        ['Game of Thrones', 'What hero wielded the burning sword called \'Lightbringer\'?', 'Azor_Ahai'],
        ['Silicon Valley', 'What actor plays the role of Erlich Bachman?', 'TJ_Miller'],
        ['Silicon Valley', 'Along with Gavin Belson, who founded Hooli?', 'Peter_Gregory'],
        ['Silicon Valley', 'What is the name of the compression company created by Richard?', 'Pied_Piper'],
        ['The Walking Dead', 'What was the name of the town of carnivores?', 'Terminus'],
        ['The Walking Dead', 'Who killed The Governor?', 'Michonne'],
        ['The Walking Dead', 'Who was Rick\'s partner at the Sheriff\'s Department?', 'Shane'],
        ['The Walking Dead', 'Whats the name of Carl\'s baby sister?', 'Judith']
    ];
    var answers = [
        ['Viserys_Targaryen', 'Aegon_Targaryen', 'Rhaegar_Targaryen', 'Petyr_Baelish'],
        ['Drogon', 'Rhaegal', 'Viserion', 'Nymeria'],
        ['Pentos', 'Meereen', 'Yunkai', 'Astapor'],
        ['Viserion_Targaryen', 'Aegon_Targaryen', 'Rhaegar_Targaryen', 'Gregor_Clegane'],
        ['Azor_Ahai', 'Jorah_Mormont', 'Theon_Greyjoy', 'Joramun'],
        ['TJ_Miller', 'Thomas_Middleditch', 'Zach_Woods', 'Martin_Starr'],
        ['Richard_Hendricks', 'Erlich_Bachman', 'Bertram_Gilfoyle', 'Peter_Gregory'],
        ['Pied_Piper', 'Hooli', 'TechCrunch', 'Aviato'],
        ['Woodbury', 'Alexandria', 'Hilltop', 'Terminus'],
        ['Daryl', 'Michonne', 'Rick', 'Glenn'],
        ['Carl', 'Hershel', 'Eugene', 'Shane'],
        ['Beth', 'Tara', 'Judith', 'Carol']
    ];

    var gifLinks = [
        ["https://media.giphy.com/media/Hse9B8evCuTxm/giphy.gif", "https://media.giphy.com/media/ntH8ApnIwy9G0/giphy.gif"],
        ["https://media.giphy.com/media/1qyXr3Dtl7pRe/giphy.gif", "https://media.giphy.com/media/PP14k6hfM4CK4/giphy.gif"],
        ["https://media.giphy.com/media/ojdRC2Om3auJ2/giphy.gif", "https://media.giphy.com/media/ZP77hdeIBIUfe/giphy.gif"],
        ["https://media.giphy.com/media/XIZqzraTsKgOQ/giphy.gif", "https://media.giphy.com/media/J3tWFC8EE1vW/giphy.gif"],
        ["https://media.giphy.com/media/HWEu0z9HFiXYI/giphy.gif", "https://media.giphy.com/media/3o7qDHE7qtr0Nftodi/giphy.gif"],
        ["https://media.giphy.com/media/SXJ0L8VSI4vmg/giphy.gif", "https://media.giphy.com/media/emSXn8DWV520g/giphy.gif"],
        ["https://media.giphy.com/media/l41YyfXQ2Y50oMpKU/giphy.gif", "https://media.giphy.com/media/l3V0Ek8VNxQ69ObJK/giphy.gif"],
        ["https://media.giphy.com/media/l3V0oeWJZQru5gGTS/giphy.gif", "https://media.giphy.com/media/OmoBzhit6A8tW/giphy.gif"],
        ["https://media.giphy.com/media/Aa9zP9nyaHeuY/giphy.gif", "https://media.giphy.com/media/3oz8xGeudzgjnuWPlK/giphy.gif"],
        ["https://media.giphy.com/media/lqBAeIFwVEX6g/giphy.gif", "https://media.giphy.com/media/13GleYVVfqpIeQ/giphy.gif"],
        ["https://media.giphy.com/media/3o6Zt8MY4WYNRul4pa/giphy.gif", "https://media.giphy.com/media/3o7TKqtGkUW07hDK9y/giphy.gif"],
        ["https://media.giphy.com/media/F6YWgQwUr7cGI/giphy.gif", "https://media.giphy.com/media/haukaDVxTZiiQ/giphy.gif"]
    ];

    //Starts the game when the start button is pressed
    $("#forResult").on("click", "#startButton", function () {
        name = $("#name-input").val();
        $("#timerDiv").show();
        $("#name-input").hide();
        $("#nameSpan").html("<h4>Welcome " + name + "</h4");
        $("#startButton").hide();
        showIds();
        setQuestions();
    });

    //Executes when an answer is chosen and calls the function to
    //verify the answer.
    $("#answers").on("click", ".answer", function () {

        var bClicked = $(this).text();
        verifyAnswer(bClicked);

    });

    // Reset function
    function initialize() {
        rand = Math.floor(Math.random() * 11);
        timerCnt = 25;
        noDuplicates = [];
        numQuestions = 12;
        correct = 0;
        incorrect = 0;
        missed = 0;
        $('#nameSpan').html('What is your name:');
        $("#name-input").show();
        $("#startButton").show();
        $("#timerDiv").hide();
        $("#forResult").append(" <button type='button' class='btn btn-primary mt-4' id='startButton'><span id='bText'>Start</span></button>");
    } //ends initialize

    // Generates a random number from 0-11 without duplicates.
    // That random number is used to pick a different question
    // every time from the questions array so it wont always be 
    // in the same order.    
    function randomizer() {

        if (numQuestions > 0) {
            while (true) {
                if (noDuplicates.includes(rand)) {
                    rand = Math.floor(Math.random() * 12);
                    if (numQuestions === 0)
                        break;
                } else {
                    noDuplicates.push(rand);
                    category = questions[rand][0];
                    question = questions[rand][1];
                    break;
                } //ends else
            } //ends while
            numQuestions--;
        } else {
            displayResult();
        }

    } //ends randomizer

    //scrambles answers options so they wont be in the same order every time.
    function randomizeAnswers() {
        var randPick = Math.floor(Math.random() * 4);

        if (randPick === 0)
            randAnswers = answers[rand];
        if (randPick === 1)
            randAnswers = answers[rand].sort();
        if (randPick === 2)
            randAnswers = answers[rand].reverse();
        if (randPick === 3)
            randAnswers = answers[rand].sort().reverse();

    } //ends randomAnswers

    // Runs the randomizer function and sets a new question everytime.    
    function setQuestions() {
        randomizer();
        $("#category").html("<h3>Your category is - \"" + category + "\"</h3");
        $("#question").html("<h4>" + question + "</h4");
        setAnswers();

    } //ends setQuestions
    function setAnswers() {

        clearInterval(intervalId);
        timerCnt = 25;
        $("#counter").text(timerCnt);
        if (numQuestions >= 0)
            startTimer();
        $("#answers").empty();

        randomizeAnswers();
        for (var i = 0; i < 4; i++)
            $("#answers").append("<div class='m-2 border p-2 d-flex flex-column justify-content-center answer'>" + randAnswers[i] + "</div");

    } //ends setQuestions

    //Verifies if the answer chosen matches the correct answer. Sets the count for incorrect
    //and correct. Then calls for next question.
    function verifyAnswer(selection) {

        if (selection === questions[rand][2]) {
            correct++;
            setGif(0);
        } else {
            incorrect++;
            setGif(1);
        }

    } //ends verifyAnswer

    function hideIds() {
        $("#answers").hide();
        $("#category").hide();
        $("#question").hide();
        $("#timerDiv").hide();
    } //ends hideIds

    function showIds() {
        $("#answers").show();
        $("#category").show();
        $("#question").show();
        $("#timerDiv").show();
    } //ends showIds

    function displayResult() {

        clearInterval(intervalId);
        //hideIds();
        $("#nameSpan").html("<h4>Good game " + name + "</h4");
        $("#forResult").append("<div class='mt-5'>Correct answers: " + correct + "</div>");
        $("#forResult").append("<div>Incorrect answers: " + incorrect + "</div>");
        $("#forResult").append("<div>Missed questions: " + missed + "</div>");
        $("#forResult").append("<button type='button' class='btn btn-primary mt-4' id='retry'><span id='bText'>Retry?</span></button>");

    } //ends displayResult

    $("#forResult").on("click", "#retry", function () {

        $("#forResult").empty();
        initialize();
        $(this).remove();

    });

    //Starts the timer until it reaches zero
    function startTimer() {
    
        intervalId = setInterval(function () {            
            timerCnt--;
            if (timerCnt >= 0) {
                $("#counter").text(timerCnt);
            } else {
                clearInterval(intervalId);
                missedTimer();
            }
        }, 1000);

    } //ends startTimer

    function setGif(inVal) {
        showGif = gifLinks[rand][inVal];
        hideIds();
        $("#category").show();

        if (inVal === 0) {
            $("#category").html("<h2>CORRECT!!</h2>");
        } else if (inVal === 1){
            $("#category").html("<h2>WRONG ANSWER!!</h2>");
        } else {
            $("#category").html("<h2>Time Ran Out!!</h2>");
            showGif = gifLinks[rand][1];
        }
        $("#forGif").html("<img src=" + showGif + ">");

        var fiveSec = setTimeout(function () {
            if (numQuestions > 0) {
                setQuestions();
                showIds();
            } else {
                displayResult();
                $("#category").hide();
            }
            $("#forGif").empty();
        }, 2000);

    } //ends setGif

    function missedTimer() {
        missed++;
        setGif(3);
        //setQuestions();

    } //ends missedTime


    initialize() //call upon start

}); //ends ready