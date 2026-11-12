# APRandomGamePicker

This app is in alpha. Expect a few bugs, and report them please!

# What's the point of this App?
This App is a convenient way to view and manage the games you play for Archipelago sessions. It's primarily designed for use of one person to manage their own libraries, but can can be used for multi-person sessions too.

The App lets you create any number of games with any number tags associated with them. The games and tags are all items you create within the app and can be anything you want. You can create rules to decide how to combine these games and tags, and use a random game picker that will pick a random assortment of games of your choosing that adhere to the rules and constraints you've created!

Traditional 'spin the wheel' styles of randomly picking which games to play for your solo multi-world session. Say, for example, you regularly play several Dolphin emulated games in AP. Dolphin does not work well when multiple instances are running at the same time. You either have to do some jank emulator setup to get it working with multiple in parallel, close and reopen Dolphin every time you switch games, or simply don't do multiple Dolphin games in a single solo multi-world session. If you choose not to do multiple Dolphin games at the the same time, traditional ways of randomly picking your games end up with a lot or rerolls or manual conflict resolution. With this app, you can tag all your Dolphin games with the tag 'Dolphin' and create constraints for the random game picker to only allow one 'Dolphin' tagged game when it picks the games for you!

That's just one example though. Games can have multiple tags, so the combinations of conflicts can stack up quick. Say your game library is 30 games big. You usually like playing 5 games in one session. When you pick games, you might want no more than 2 CPU/GPU intensive games, no more than one game from the Zelda series, no more than one Adventure game, no more than one Metroidvania game, no more than two Mario games, no more than two 'long games', only one game that you haven't done an AP for yet, you absolutely want to include the Hungry Pumpkin game (I love you Mr. Pumpkin), and of course no more than one Dolphin game.

That's a lot of constraints, and randomly picking games the traditional way just cannot handle that. In the app, you make your games, tags, rules, and hit the button, and all you get your random assortment of games from your library right then and there!

# Pages

There is currently one main page and four sub pages

### Main Page
<img width="1040" height="821" alt="image" src="https://github.com/user-attachments/assets/4d49b239-63c3-4380-9cb9-6bb30a91755f" />

### Games and Tags Editor

<img width="957" height="1261" alt="image" src="https://github.com/user-attachments/assets/bcff95a6-6147-4699-b524-e8e424735126" />

<img width="922" height="1160" alt="image" src="https://github.com/user-attachments/assets/a6f90d64-0c55-4177-93e9-e68cbc638c09" />

Notice that you can update how many times you've played a game in AP!

### Rules Editor

<img width="843" height="1263" alt="image" src="https://github.com/user-attachments/assets/cea4951b-7b7c-4d63-9799-e3fe37104551" />

### Random Game Picker

<img width="807" height="1262" alt="image" src="https://github.com/user-attachments/assets/1e13c499-9217-4115-af89-e9bbd6880235" />

<img width="744" height="886" alt="image" src="https://github.com/user-attachments/assets/5a0ee401-6043-4ea4-bb3a-4bd64e5fc108" />

### Data Management

<img width="992" height="528" alt="image" src="https://github.com/user-attachments/assets/95dab8fc-f93b-4bcb-b6a5-49abe951a31d" />

# Upcoming features

This app is still in development. I'll be making tweaks to the UI here and there as feedback rolls in. Please report any bugs you find!

I don't know how possible some of these are from just an html app, but here's hoping
- Base weighted probability for games
- Additional Weighted probability for games based on the number of times it's been played relative to other games
- A page to make notes for each game you play, such as reminders for what puts certain checks in logic, reference pictures, and hyperlinks to guides
- A way to make pages to help starting up each game easier. Make custom commands for each game that do some kind of function
  - Hyperlinks to browser games or external websites
  - Open a patch file from the generated AP world folder
  - Open an AP client with command args to automatically connect
  - Launch the associated steam game or exe
  - Open a games mod launcher with command args
- Hotkeys to quick swap focus between running exes on your computer
     - Preset volume levels included

- Tie into other existing tools. Launch Axolotl, Sphere tracker, or other things. There are existing tools that can do most of these other things witch is why the rest are down here
  - A way to sort your yamls for each game
  - A page to quick select your yamls for your picked games and dump them into the Archipelago folder for generation
  - A way to generate the AP world and copy it wherever
  - Launch the AP world locally from the app
  
