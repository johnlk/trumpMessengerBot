import json

with open('trumpTweets.json') as json_file:
	data = json.load(json_file)

for x in xrange(0, len(data)):
	#print data[x]
	text = data[x]['text'].split(' ') #want to tokenize
	#print text[0]
	finalTweet = ""
	for y in range(0, len(text)):
		if len(text[y]) < 1 or text[y][0] == '@':#if it's a twitter handle or url we dont add
			continue
		elif len(text[y]) >= 4 and text[y][0:4] == "http":
			continue
		finalTweet += text[y] + " "
	#print finalTweet
	trump_train_file = open('trumpTweetsTraining.txt', 'a')
	try:
		trump_train_file.write(finalTweet + '\n')
	except:
		continue

trump_train_file.close()


