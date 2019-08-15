
/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/LeonChisum')
      .then(response => {
        console.log(response.data)
      })
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/
axios.get('https://api.github.com/users/LeonChisum')
      .then(response => {
        let card = gitCard(response.data)
        let dom = document.querySelector('.cards')
        dom.appendChild(card);
      })
      .catch(error =>{
        console.log(error)
      })
/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ["ron-hughes", "bigknell", "kdleonard93", "bobbidigi", "stevenfarrell32"];
followersArray.forEach(userName => {
    axios.get(`https://api.github.com/users/${userName}`)
          .then(response => {
            let card = gitCard(response.data)
            let dom = document.querySelector('.cards')
            dom.appendChild(card)
          })
          .catch(error =>{
            console.log(error)
          })
})

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
function gitCard(user){
  let card = document.createElement('div')
  card.classList.add('card')

  let image = document.createElement('img');// image on card
  image.src = user.avatar_url

  let info = document.createElement('div');// card info under image
  info.classList.add('card-info')

  let h3 = document.createElement('h3');// Name
  h3.classList.add('name')
  h3.innerText = user.name

  let pUsername = document.createElement('p')// username
  pUsername.classList.add('username')
  pUsername.innerText = user.login
  
  let pLocation = document.createElement('p');// Location
  pLocation.innerText = `Location: ${user.location}`

  let pProfile = document.createElement('p');// Profile
  pProfile.innerText = 'Profile: '
  let profile = document.createElement('a')
  profile.href = user.html_url
  profile.innerText = user.html_url
  pProfile.appendChild(profile)

  let pFollowers = document.createElement('p');// Followers
  pFollowers.innerText = `Followers: ${user.followers}`

  let pFollowing = document.createElement('p');// Following
  pFollowing.innerText = `Following: ${user.following}`

  let pBio = document.createElement('p');// Bio
  pBio.innerText = `Bio: ${user.bio}`

  card.appendChild(image)
  card.appendChild(info)

  info.appendChild(h3)
  info.appendChild(pUsername)
  info.appendChild(pLocation)
  info.appendChild(pProfile)
  info.appendChild(pFollowers)
  info.appendChild(pFollowing)
  info.appendChild(pBio)

  return card
}
