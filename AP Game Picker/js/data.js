/** @typedef {import('./models.js').Tag} Tag */
/** @typedef {import('./models.js').Game} Game */

/**
 * Shared application data and functions.
 */
window.data = (() => {
    const RULEPRESETDEFS = {
    game: [
        {
            id: 1,
            name: "Must Include",
            fields: []
        },
        {
            id: 2,
            name: "Must Exclude",
            fields: []
        },
        {
            id: 3,
            name: "Maximum Amount",
            fields: [{
                key: "limit",
                label: "Max",
                type: "number",
                defaultValue: 2,
                min: 0,
                step: 1
            }]
        },
        {
            id: 4,
            name: "Minimum Amount",
            fields: [{
                key: "limit",
                label: "Min",
                type: "number",
                defaultValue: 1,
                min: 0,
                step: 1
            }]
        },
        {
            id: 5,
            name: "Between",
            fields: [
                {
                    key: "min",
                    label: "Min",
                    type: "number",
                    defaultValue: 1,
                    min: 0,
                    step: 1
                },
                {
                    key: "max",
                    label: "Max",
                    type: "number",
                    defaultValue: 3,
                    min: 0,
                    step: 1
                }
            ]
        }
    ],
    tag: [
        {
            id: 1,
            name: "Must Include",
            fields: []
        },
        {
            id: 2,
            name: "Must Exclude",
            fields: []
        },
        {
            id: 3,
            name: "Maximum Amount",
            fields: [{
                key: "limit",
                label: "Max",
                type: "number",
                defaultValue: 2,
                min: 0,
                step: 1
            }]
        },
        {
            id: 4,
            name: "Minimum Amount",
            fields: [{
                key: "limit",
                label: "Min",
                type: "number",
                defaultValue: 1,
                min: 0,
                step: 1
            }]
        },
        {
            id: 5,
            name: "Between",
            fields: [
                {
                    key: "min",
                    label: "Min",
                    type: "number",
                    defaultValue: 1,
                    min: 0,
                    step: 1
                },
                {
                    key: "max",
                    label: "Max",
                    type: "number",
                    defaultValue: 3,
                    min: 0,
                    step: 1
                }
            ]
        }
    ]
    };

    const savedData = JSON.parse(
        localStorage.getItem('ap-tools-data') || '{}'
    );

    /** @type {Tag[]} */
    const tags = Array.isArray(savedData.tags) ? savedData.tags : [];

    /** @type {Game[]} */
    const games = Array.isArray(savedData.games) ? savedData.games : [];

    /** @type {Rule[]} */
    const rules = Array.isArray(savedData.rules) ? savedData.rules : [];

    /** @type {number[]} */
    const activeRules = Array.isArray(savedData.activeRules) ? savedData.activeRules : [];

    /** @type {number[]} */
    const activeGames = Array.isArray(savedData.activeGames) ? savedData.activeGames : [];

    /** @type {string[]} */
    const pickedGames = Array.isArray(savedData.pickedGames) ? savedData.pickedGames : [];

    // Save the current data to localStorage
    function saveData() {
        localStorage.setItem('ap-tools-data', JSON.stringify({
            tags,
            games, 
            rules,
            activeRules,
            activeGames,
            pickedGames
        }));
    }

    /**
     * @param {string} name
     * @param {number[]} [games=[]]
     * @returns {Tag}
     */
    function createTag(name, games = []) {
        const tag = {
            id: Date.now(),
            name: name,
            games: games
        };

        tags.push(tag);
        saveData();
        return tag;
    }

    /**
    * Updates an existing tag.
    * @param {number} id
    * @param {string} name
    * @param {number[]} [games=[]]
    * @returns {Tag}
    */
    function updateTag(id, name, games = []) {
        const tag = tags.find(tag => tag.id === id);

        tag.name = name;
        tag.games = games;

        // Update the corresponding games' tag arrays
        const selectedGameIds = games;

        // Remove this tag from every game first
        window.data.games.forEach(game => {
            game.tags = (game.tags || []).filter(tagId => tagId !== id);
        });

        // Add this tag to the newly selected games
        selectedGameIds.forEach(gameId => {
            const game = window.data.games.find(game => game.id === gameId);

            if (game) {
                game.tags = game.tags || [];

                if (!game.tags.includes(id)) {
                    game.tags.push(id);
                }
            }
        });

        saveData();
        return tag;
    }

    /**
    * Deletes a tag and removes its references from games.
    * @param {number} id
    * @returns {boolean}
    */
    function deleteTag(id) {
    const tagIndex = tags.findIndex(tag => tag.id === id);

    if (tagIndex === -1) return false;

    // Remove the tag ID from every game
    window.data.games.forEach(game => {
        game.tags = (game.tags || []).filter(tagId => tagId !== id);
    });

    // Remove any rules targeting this tag
    window.data.rules = window.data.rules.filter(rule =>
        !(rule.targetType === 'tags' && rule.targetId === id)
    );

    // Remove the tag itself
    tags.splice(tagIndex, 1);

    saveData();
    return true;
}

    /**
     * @param {string} name
     * @param {number} timesPlayed
     * @param {number[]} [tags=[]]
     * @returns {Game}
     */
    function createGame(name, timesPlayed, tags = []) {
        const game = {
            id: Date.now(),
            name: name,
            timesPlayed: timesPlayed,
            tags: tags
        };

        games.push(game);

        tags.forEach(tagId => {
            const tag = window.data.tags.find(tag => tag.id === tagId);
            if(tag) {
                tag.games.push(game.id);
            }
        });

        saveData();
        return game;
    }

    /**
     * @param {number} id
     * @param {string} name
     * @param {number} timesPlayed
     * @param {number[]} [tags=[]]
     * @returns {Game}
     */
    function updateGame(id, name, timesPlayed, tags = []) {
        const game = window.data.games.find(game => game.id === id);

        game.name = name;
        game.timesPlayed = timesPlayed;
        game.tags = tags;

        // Update every tag's game assignments
        window.data.tags.forEach(tag => {
            if (tags.includes(tag.id)) {
                // Add game ID if it isn't already assigned
                if (!tag.games.includes(game.id)) {
                    tag.games.push(game.id);
                }
            } else {
                // Remove game ID if this tag is no longer assigned
                tag.games = tag.games.filter(gameId => gameId !== game.id);
            }
        });

        saveData();
        return game;
    }

    /**
     * @param {number} id
     * @returns {boolean}
     */
    function deleteGame(id) {

        // Remove game ID from every tag
        window.data.tags.forEach(tag => {
            tag.games = tag.games.filter(gameId => gameId !== id);
        });

        // Remove any rules targeting this game
        window.data.rules = window.data.rules.filter(rule =>
            !(rule.targetType === 'games' && rule.targetId === id)
        );

        // Remove game from games array
        const gameIndex = window.data.games.findIndex(g => g.id === id);
        if (gameIndex !== -1) {
            window.data.games.splice(gameIndex, 1);
        }

        deleteActiveGame(id);

        saveData();
        return true;
    }

    /**
     * Creates a new rule.
     * @param {string} targetType
     * @param {number} targetId
     * @param {number[]} [values=[]]
     * @returns {Rule}
     */
    function createRule(targetType, targetId, rulePresetDefId, values = []) {
        const rule = {
            id: Date.now(),
            targetType: targetType,
            targetId: targetId,
            rulePresetDefId: rulePresetDefId,
            values: [...values]
        };

        rules.push(rule);
        saveData();

        return rule;
    }

    /**
     * Updates an existing rule.
     * @param {number} id
     * @param {string} targetType
     * @param {number} targetId
     * @param {number[]} values
     * @returns {Rule|null}
     */
    function updateRule(id, targetType, targetId, rulePresetDefId, values) {
        const rule = rules.find(rule => rule.id === id);

        rule.targetType = targetType;
        rule.targetId = targetId;
        rule.rulePresetDefId = rulePresetDefId;
        rule.values = [...values];

        saveData();

        return rule;
    }

    /**
     * Deletes an existing rule.
     * @param {number} id
     * @returns {boolean}
     */
    function deleteRule(id) {
        const ruleIndex = rules.findIndex(rule => rule.id === id);

        if (ruleIndex === -1) return false;

        rules.splice(ruleIndex, 1);
        deleteActiveRule(id);
        saveData();

        return true;
    }

    /**
     * @param {number} ruleId
     * @returns {number[]}
     */
    function addActiveRule(ruleId) {
        if (activeRules.includes(ruleId)) return activeRules;

        activeRules.push(ruleId);
        saveData();
        return activeRules;
    }

    /**
     * @param {number} ruleId
     * @returns {boolean}
     */
    function deleteActiveRule(ruleId) {
        const index = activeRules.indexOf(ruleId);

        if (index === -1) return false;

        activeRules.splice(index, 1);
        saveData();
        return true;
    }

    /**
     * @param {number} gameId
     * @returns {number[]}
     */
    function addActiveGame(gameId) {
        if (activeRules.includes(gameId)) return activeGames;

        activeGames.push(gameId);
        saveData();
        return activeGames;
    }

    /**
     * @param {number} gameId
     * @returns {boolean}
     */
    function deleteActiveGame(gameId) {
        const index = activeGames.indexOf(gameId);

        if (index === -1) return false;

        activeGames.splice(index, 1);
        saveData();
        return true;
    }

    /**
     * @param {string[]} games
     * @returns {boolean}
     */
    function updatePickedGames(games) {
        pickedGames.length = 0;
        pickedGames.push(...games);
        saveData();
        return true;
    }

    /**
     * @returns {boolean}
     */
    function deletePickedGames() {
        pickedGames.length = 0;
        saveData();
        return true;
    }

    return {
        tags,
        games,
        rules,
        activeRules,
        activeGames,
        RULEPRESETDEFS,
        pickedGames,
        createTag,
        updateTag,
        deleteTag,
        createGame,
        updateGame,
        deleteGame,
        createRule,
        updateRule,
        deleteRule,
        addActiveRule,
        deleteActiveRule,
        addActiveGame,
        deleteActiveGame,
        updatePickedGames,
        deletePickedGames,
        saveData
    };

})();