import SinglePlayer from 'pages/singlePlayer'
import MultiPlayer from 'pages/multiplayer'
import Scores from 'pages/scores'

export default [
  { path: '/', component: SinglePlayer },
  { path: '/multiplayer', component: MultiPlayer },
  { path: '/scores', component: Scores }
]
