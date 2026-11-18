
const fs = require('fs');
const path = require('path');

const mainPath = path.join(__dirname, 'main.html');
const gamesandtagsPath = path.join(__dirname, 'gamesandtags.html');
const rulesettingsPath = path.join(__dirname, 'rulesettings.html');
const datamanagementPath = path.join(__dirname, 'datamanagement.html');
const gamepickerPath = path.join(__dirname, 'gamepicker.html');

let mainHTML = fs.readFileSync(mainPath, 'utf8');
const gamesandtagsHTML = fs.readFileSync(gamesandtagsPath, 'utf8');
const rulesettingsHTML = fs.readFileSync(rulesettingsPath, 'utf8');
const datamanagementHTML = fs.readFileSync(datamanagementPath, 'utf8');
const gamepickerHTML = fs.readFileSync(gamepickerPath, 'utf8');

// Insert the Games screen before the closing </main> tag.
mainHTML = mainHTML.replace(
    '</main>',
    `${gamesandtagsHTML}\n${rulesettingsHTML}\n${datamanagementHTML}\n${gamepickerHTML}\n</main>`
);

// Write the combined HTML to a separate release file.
const outputPath = path.join(__dirname, 'release.html');

fs.writeFileSync(outputPath, mainHTML, 'utf8');

console.log('Build complete! Generated release.html');
