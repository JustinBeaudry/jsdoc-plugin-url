'use strict';
const voightKampffMachine = require('voight-kampff-machine');
/**
 * Takes an array of questions and returns a Promise that resolves to a `string` response to those questions.
 * See {@url voightKampff} for more information, the {@url urlPlugin}, and {@url jsdoc}, also should remove this
 * {@url invalid} since it's invalid.
 *
 * @function voightKampff
 * @since 1.0.0
 * @param {string[]} questions
 * @returns {Promise<string>}
 */
const voightKampff = questions => {
  return voightKampffMachine.handleQuestions(questions)
    .then(response => {
      if (!response) {
        return "They're only questions Leon";
      }
      return response;
    });
};
