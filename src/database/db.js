import firebase from 'firebase'

const config = {
  databaseURL: 'https://spidersunflower.firebaseio.com',
};

firebase.initializeApp(config);

const database = firebase.database();
const scoresRef = database.ref('scores')
let scores = []

scoresRef.orderByChild('date').on('child_added', (snapshot) => {
  scores.unshift(snapshot.val())
})

export default function(orderBy) {
  if (orderBy) {
    scores = []
    scoresRef.orderByChild(orderBy).on('child_added', (snapshot) => {
      scores.unshift(snapshot.val())
    })
  }

  return scores
}
