import firebase from 'firebase'

const config = {
  databaseURL: 'https://spidersunflower.firebaseio.com',
};

firebase.initializeApp(config);

const database = firebase.database();
const scoresRef = database.ref('scores')
const getScores = function(orderBy = 'date') {
  let scores = []

  if (orderBy) {
    scores = []
    if (orderBy === 'date' || orderBy === 'speed') {
      scoresRef.orderByChild(orderBy).on('child_added', (snapshot) => {
        scores.unshift(snapshot.val())
      })
    } else {
      scoresRef.orderByChild(orderBy).on('child_added', (snapshot) => {
        scores.push(snapshot.val())
      })
    }
  }

  return scores
}

export default getScores
