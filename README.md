## Trump Facebook Messenger Bot

This bot was trained from a set of tweets by @theRealDonald from 2009 till present. The tweets were trained with a char-rnn using Lua.

## Work

We were able to get all of our Trump Tweet needs satisfied at [Trump Archive](http://www.trumptwitterarchive.com/archive). Next we aggregated all of the tweet texts in `trainData/input.txt`. Using this input file, we feed it to a character Recurant Neural Network found [here](https://github.com/karpathy/char-rnn). <br><br> 
After training for 4 hours or so, we were able to output some text by priming the model with some text like "hello" and "I like ". Taking these reponses limited to 100 characters, we aggregated them in a file called `all.txt` in the output directory. The chat bot uses this `all.txt` to grab responses. <br><br>
Type anything and get ready for a great responses.

## Chatbot 

The chatbot for messenger is found [here](https://www.facebook.com/hackmit2017trumpbot/). <br><br> Enjoy. <br>

![Screen Shot](https://rawgit.com/johnlk/trumpMessengerBot/master/sreenshot.png)
