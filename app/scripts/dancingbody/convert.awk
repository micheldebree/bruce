BEGIN { 
	FS = ";";
	firstline = 1;
	print "var motion = [{";
}

/^[0-9]+;$/ {
	print "},{";
	firstline = 1;
}

/^[A-Z]/ {
	sub(/,/,".",$2);  
	sub(/,/,".",$3);  
	if (firstline == 1) {
		print "\"" $1 "\": [" $2 ", " $3 "]";
		firstline = 0;
	} else {
		print ",\"" $1 "\": [" $2 ", " $3 "]";
	}
}

END {
	print "}];";
}