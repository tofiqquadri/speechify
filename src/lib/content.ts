const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
  const response = await fetch(url);
  return response.json();
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string): string[] => {
  let sentances = [];

  if (content) {
    let updatedContent = content.replace("<speak>", "");
    updatedContent = updatedContent.replace("</speak>", "");

    const lexSentances = updatedContent.split("</s>");

    for (let i = 0; i < lexSentances.length; i++) {
      const lexSentance = lexSentances[i];
      const indexOfStart = lexSentance.indexOf("<s>");

      if (indexOfStart > -1) {
        const sentance = lexSentance
          .slice(indexOfStart, lexSentance.length)
          .replace("<s>", "");
        sentances.push(sentance);
      }
    }
  }

  return sentances;
};

export { fetchContent, parseContentIntoSentences };
