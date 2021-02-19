# JavaScript in-browser Quiz 

The idea of this project was to create a Quiz program with vanilla JavaScript. The quiz should keep track of a user's score with a timer, and give the option for the user to submit their initials to be posted onto a high-score list. The high-score list then should be saved in browser local storage to be able to print a high-scores list if the quiz has been taken before. 

![Starting page for quiz site](/assets/codequiz1.png)

The start page for the site that will initialize the quiz 

![Quiz question example](/assets/codequiz2.png)

Timer starting from 75 seconds is started when quiz starts, if a user selects the wrong, 10 seconds are subracted from timer. At the end of the quiz, the users score will be equal to seconds remaining. 

![High Score Page](/assets/codequizhighscores.png)

User is able to print their high-score to a high-score list. 

![Local Storage](/assets/codequizlocalstorage.png)

User information is saved into local storage with the key of userInfo, and the value equaling their initials and score. This way, scores from previous site visits can be stored and displayed in the high-score list. 

## Instructions 

You can demo a live version of this program at the deployed site hosted by github pages. 
[Link to deployed program]()