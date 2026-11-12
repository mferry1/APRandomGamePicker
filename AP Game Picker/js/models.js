 /**
 * @typedef {Object} Tag
 * @property {number} id
 * @property {string} name
 * @property {number[]} games
 */

/**
 * @typedef {Object} Game
 * @property {number} id
 * @property {string} name
 * @property {number} timesPlayed
 * @property {number[]} tags
 */

/**
 * @typedef {Object} Rule
 * @property {number} id
 * @property {string} targetType
 * @property {number} targetId
 * @property {number} rulePresetDefId
 * @property {number[]} values
 */