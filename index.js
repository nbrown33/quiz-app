let state = {
    questionNumber: 0,
    currentScore: 0
  }
  
  const questionSet = [
      {
          question: 'In the penultimate episode of season 2, Jason’s test was to play a game of Madden against his favorite NFL team, the Jacksonville Jaguars. What team did he have to play as?',
          answerChoices: ['The Indianapolis Colts', 'The Tennessee Titans', 'The Tampa Bay Buccaneers', 'The Houston Texans'],
          image: "https://i.imgur.com/HynQ3cm.jpg",
          answer: 1,
          alt: 'Jason'
      },
      {
          question: 'What is the official name of the neighborhood known as The Good Place?',
          answerChoices: ['Neighborhood 12358W', 'Neighborhood 25189E', 'Neighborhood 97245S', 'Neighborhood 1389N'],
          image: "https://i.imgur.com/rSogeOb.jpg",
          answer: 0,
          alt: 'The Good Place'
      },
      {
          question: 'In the medium place, there is a jukebox that plays spoken word poetry by William Shatner, and every song ever (live versions only) by what band?',
          answerChoices: ['U2', 'Red Hot Chili Peppers', 'The Eagles', 'Counting Crows'],
          image: "https://i.imgur.com/YYT48ew.jpg",
          answer: 2,
          alt: 'Mindy St. Claire'
      },
      {
        question: 'Jason had a personalized license plate in his life. What did it say?',
        answerChoices: ['Asian Hugh Hefner', 'Jason Kardashian', 'Blake Bortles MVP', 'I love butts'],
        image: "https://i.imgur.com/HgoCWJ9.png",
        answer: 3,
        alt: 'Jason'
      },
      {
        question: 'In <i>The Burrito</i>, the judge that will decide the fate of Eleanor and friends tops her burrito with what sauce?',
        answerChoices: ['Envy', 'Greed', 'Malice', 'Resentment'],
        image: "https://i.imgur.com/w2CC8Rx.jpg",
        answer: 0,
        alt: 'Burrito'
      },
      {
        question: 'The Good Place translates what everyone says into a language the others can understand. What language does Chidi primarily speak?',
        answerChoices: ['Italian', 'Spanish', 'English', 'French'],
        image: "https://i.imgur.com/USbTei2.jpg",
        answer: 3,
        alt: 'Chidi'
      },
      {
        question: 'In the first episode of season 1, Michael tells Eleanor of a stoner kid from Calgary that once got really high on mushrooms and predicted what happens when we die with 92% accuracy. What was his name?',
        answerChoices: ['Randy Wilson', 'Hank Meyers', 'Doug Forcett', 'Jimmy Clifton'],
        image: "https://i.imgur.com/fmTgUc4.jpg",
        answer: 2,
        alt: 'Doug Forcett'
      },
      {
        question: 'In what did Jason suffocate to death while trying to rob a Mexican restaurant with his best friend, Pillboi?',
        answerChoices: ['A safe', 'The trunk of a car', 'A refrigerator', 'A duffel bag'],
        image: "https://i.imgur.com/iF0T6ox.jpg",
        answer: 0,
        alt: 'Pillboi'
      },
      {
        question: 'What is the name of the leader of The Bad Place?',
        answerChoices: ['Trevor', 'Marcus', 'Cody', 'Jaxon'],
        image: "https://i.imgur.com/0cf4MIi.jpg",
        answer: 0,
        alt: 'Trevor'
      },
      {
        question: 'In what style was the painting that Chidi made for Tahani in place of Jason\'s picture of Frank Caliendo?',
        answerChoices: ['Surrealism', 'Cubism', 'Impressionism', 'Modernism'],
        image: "https://i.imgur.com/8mO31a4.jpg",
        answer: 2,
        alt: 'Frank Caliendo'
      }
  ];
  
  function displayNav(){
      return `
          <span class ='q-num'>Question ${state.questionNumber + 1}</span>
          <span class='score'>Score: ${state.currentScore}</span>
      `
  }
  
  function generateQuestion() {
      let answers = [];
      for(let i=0; i < questionSet[state.questionNumber].answerChoices.length; i++ ){
        answers.push(`
        <label class="answer">
          <input type="radio" name="choice" value="${i}" >
          <span class='answer-text'>${questionSet[state.questionNumber].answerChoices[i]}</span>
        </label>
        `)
      }
  
  
      return `
      <div class="question-form">
          <form>
          <span class="question-text">${questionSet[state.questionNumber].question}</span>
          <img class="question-pic" src="${questionSet[state.questionNumber].image}" alt="${questionSet[state.questionNumber].alt}">
          <fieldset>
          ${answers.join("")}
          <button type="submit" class="submitAnswer">Submit</button>
          </fieldset>
          </form>
      </div>`
  }
  
  $('body').on('click', '.startButton', function(event){
      $('.welcome').remove();
      $('main').html(generateQuestion());
      $('.nav').html(displayNav());
      $('.nav').removeClass('hidden');
    });
  
  function nextQuestion() {
      if (state.questionNumber < questionSet.length - 1) {
        state.questionNumber += 1;
        $('.nav').html(displayNav());
        $('main').html(generateQuestion());
      } else {
        $('.nav').addClass('hidden');
        $('.final').show();
        $('.final').html(generateResults())
      };
  }
  
  function negativeFeedback() {
      return `
      <div class='feedback'>
      <p>WRONG. The correct answer is ${(questionSet[state.questionNumber]).answerChoices[questionSet[state.questionNumber].answer]}</p>
      <img class='feedback-pic' src='https://i.imgur.com/CJOY3mu.png' alt='crying'>
      <button class='nextButton'>Continue</button>
      </div>
      `
  }
  
  function positiveFeedback() {
      return `
      <div class='feedback'>
      <p>Correct! You're smarter than you look.</p>
      <img class='feedback-pic' src='https://i.imgur.com/pFDDG0m.jpg' alt='thumbsUp'>
      <button class='nextButton'>Continue</button>
      </div>
      `
  }
  
  $('main').on('click', '.nextButton', function(event) {
      $('.feedback').remove();
      nextQuestion();
  })
  
  function generatePositiveFeedback() {
      state.currentScore += 1;
      $('.nav').html(displayNav());
      $('.question-form').remove();
      $('main').html(positiveFeedback());
  }
  
  function generateNegativeFeedback() {
      $('.question-form').remove();
      $('main').html(negativeFeedback());
  }
  
  function generateResults() {
      return `
      <div class='results-page'>
        <p>Final Score: ${state.currentScore}/${questionSet.length}</p>
        <button class="start-over">Play Again</button>
      </div>
      `
  }
  
  $('body').on('click', '.start-over', function(event) {
      state = {
        currentScore : 0,
        questionNumber: 0
      }
      $('.final').hide();
      $('main').html(welcome());
  })
  
  $('body').on('click', '.submitAnswer', function(event) {
      event.preventDefault();
        
      const selected = $('input:checked');
      const userAnswer = Number(selected.val());
      const correctAnswer = questionSet[state.questionNumber].answer;
  
      if (userAnswer === correctAnswer) {
          generatePositiveFeedback();
      } else {
        generateNegativeFeedback();
      };
  
  });
  function welcome(){
    return `
    <div class="welcome">
      <img src='https://i.imgur.com/notkU9l.png' id='welcomePic' alt='welcome'>
      <p>Are you a fan of The Good Place? This 10 question quiz will test just how closely you paid attention during seasons 1 and 2. If you think you’re ready, click below to begin.</p>
      <button class='startButton'>Begin Quiz</button>
      <img src='https://i.imgur.com/it04EJK.png' class='bottomPic' alt='eleanor&michael'>
    </div>
      `
  };
  
  $('main').html(welcome());