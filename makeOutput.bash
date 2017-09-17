for filename in ./cv/*; do
	th ../char-rnn/sample.lua "$filename" -temperature 0.7 -length 100 -primetext "Thanks " >> ./output/thanks/thanks.txt
done
