// v2 2016/08/26
// Tools for working with gettext translation files.

// Convert multiline string at one string `"123"\n"456"` -> `123456`
// @param {String} str
// @return {string}
function getLiter(str){
	var 	pos = -2,
			lastPos, 
			bufPos,
			final = '',
			count = 0;

	while(pos != -1){
		pos = str.indexOf('"', pos + 1);
		
		if(str[pos - 1] != '\\'){
			if(++count%2){
				lastPos = pos + 1;
			}else{
				final += str.substring(lastPos, pos).replace(/\\"/g, '"').replace(/\\n/g, '\n');
			}	
		}
	}
	return final;
}

// Parse .po document to json object
// @param {String} source
function parseDoc(source){
	var 	pattern = /([\w]+)(?:\[(\d+)\])?\s+((?:".*(?!\\)"\s*)+)/ig, 
			match, prev,
			collection = [], 
			tempBuf = {};

	while(match = pattern.exec(source.replace(/\#.*$/g, ''))){ // 0 - key, 1 - index, 2 - literal
		

		if(match[1] == 'msgctxt' || match[1] == 'msgid' && prev != 'msgctxt'){
			tempBuf = {};
			collection.push(tempBuf);
		}
		
		if(match[2]){
			if(!Array.isArray(tempBuf[match[1]])){
				tempBuf[match[1]] = [];
			}
			tempBuf[match[1]].push(getLiter(match[3]));
		}else{
			tempBuf[match[1]] = getLiter(match[3]);
		}
		prev = match[1];
	}

	return collection;
}
// Add quotas to original string
// 'abc\n123' -> '"abc\\n123"'
// @param {String} str 
// @return {String}
function addQuotas(str){
	// return str ? ('"' + str.replace(/\n/g, '\\n') + '"') : '""';
	return str ? ('"' + str.replace(/\n/g, '\\n').replace(/\"/g, '\\\"') + '"') : '""';
}
// Add quotas to original string
// 'abc\n123' -> '"abc\\n"\n"123"'
// @param {String} str 
// @return {String}
function formattedQuotas(str){
	var size = str.length;
	// It can be like so
	// return '"' + str.replace(/\n/g, '\\n"\n"') + '"';
	return '""\n"' + str.replace(/\n/g, function(str, offset, s){
		if(size - offset > 1){ // not last
			return '\\n"\n"';
		}else{
			return '\\n';
		}
		
	}) + '"';
}

module.exports.parseDoc = parseDoc;
module.exports.getLiter = getLiter;
module.exports.addQuotas = addQuotas;
module.exports.formattedQuotas = formattedQuotas;
