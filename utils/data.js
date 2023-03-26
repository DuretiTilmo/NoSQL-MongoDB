const name = [
    'Tom',
    'Jerry',
    'Nina',
    'Ali',
    'Dure',
    'Moti',
    'Anna',
    'Fatima',
    'Sam',
    'Bill',
    'Walid',
];

const emailAddress = [
    'green@gmail.com',
    'yellow@gmail.com',
    'grey@gmail.com',
    'blue@gmail.com',
    'purple@gmail.com',
    'red@gmail.com',
    'violet@gmail.com',
    'star@gmail.com',
    'sugar@gmail.com',
    'peace@gmail.com',
    'light@gmail.com',
];

const randomThoughts = [
    'What a nice place to be',
    'This is once in a lifetime thing',
    'I have never felt this proud',
    'It is quite an experience',
    'The sky looks clearer now',
    'Be the reason for someones joy',
    'Spreading love is my thing',
    'Life has become fun',
    'Letting good things flow towards me',
    
];

const possibleReactions = [
    'I could not agree more!',
    'Sure thing!',
    'Good for you',
    'You said right',
    'It is good day to say out',
    'Thank you for sharing your thought',
    'I am going to share this with friends',
];

const users = [];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random  username
const getRandomName = () => 

  `${getRandomArrItem(name)} `;

  const getRandomEmail = () => 

  `${getRandomArrItem(emailAddress)} `;
//  generates random thoughts that we can add to the database. Includes reactions.
const getRandomThoughts = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        thoughtText: getRandomArrItem(randomThoughts),
        username: getRandomName(),
        reactions: [...getThoughtReactions()],
      });
    }
    return results;
  };

  const getThoughtReactions = (int) => {
    if (int === 1) {
        return getRandomArrItem(possibleReactions);
      }
      let results = [];
      for (let i = 0; i < int; i++) {
        results.push({
          thoughtText: getRandomArrItem(possibleReactions),
          username: getRandomName(),
        });
      }
      return results;
  };
  module.exports = { getRandomName, getRandomThoughts, getThoughtReactions , getRandomEmail};
