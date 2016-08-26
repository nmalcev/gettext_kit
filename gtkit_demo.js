var		$gtkit = require('./gettext_kit');


//==============================================
// Example: Generate fragment of PO file
//==============================================
var 	poTitle = [
			'msgid ' + $gtkit.addQuotas(''),
			'msgstr ' + $gtkit.formattedQuotas('Language: xx_XX\nMIME-Version: 1.0\nContent-Type: text/plain; charset=UTF-8\nContent-Transfer-Encoding: 8bit\n'),
			'msgctxt ' + $gtkit.addQuotas('Are you sure you want to delete the parameter set with the \"%s\" tag?')
		].join('\n');

console.log('Po title:\n%s\n\n\n', poTitle);

//==============================================
// Example: Parsing po files
//==============================================
var poDoc = `
msgid ""
msgstr ""
	"Language: en_US\\n"
	"MIME-Version: 1.0\\n"
	"Content-Type: text/plain; charset=UTF-8\\n"
	"Content-Transfer-Encoding: 8bit\\n"

msgctxt "license"
msgid "License"
msgstr "License"

msgctxt "5_days_left"
msgid "1 day"
msgid_plural "%d day"
msgstr[0] "%d day"
msgstr[1] "%d days"
msgstr[2] "%d days"

msgctxt "scannedFiles"
msgid "The average number of files processed per second by the component,\\n during the last minute / 5 minutes / 15 minutes"
msgstr "The average number of files processed per second by the component,\\n during the last minute / 5 minutes / 15 minutes"

msgctxt "cpm_connect_as_newbie"
msgid "Connect the workstation as \\\"newbie\\\""
msgstr "Connect the workstation as \\"newbie\\""

msgctxt "Delete_parameter_set_with_tag"
msgid "Are you sure you want to delete the parameter set with the \\"%s\\" tag?"
msgstr "Are you sure you want to delete the parameter set with the \\"%s\\" tag?"
`;

var doc = $gtkit.parseDoc(poDoc);
console.log('\nPo 2 json:');
console.dir(doc);