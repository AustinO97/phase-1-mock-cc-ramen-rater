// write your code here

const ramenMenu = document.querySelector('#ramen-menu')
const ramenDetail = document.querySelector("#ramen-detail > img")
let newRamen = document.querySelector('#new-ramen')
const detailImg = document.querySelector('#detail-image')
const detailName = document.querySelector('#detail-name')
const detailRestaurant = document.querySelector('#detail-restaurant') 
const ratingDisplay = document.querySelector('#rating-display') 
const commentDisplay = document.querySelector('#comment-display') 

const ramenUrl = 'http://localhost:3000/ramens'
function fetchRamen() {
    fetch(ramenUrl)
    .then(res => res.json())
    .then(data => data.forEach(addRamen))
}
fetchRamen()

function addRamen(ramen) {
    const img = document.createElement('img')

    img.src = ramen.image
    img.setAttribute('src', ramen.image)


    img.addEventListener('click', () => detailFn(ramen))

    ramenMenu.append(img)
}

function detailFn(ramen) {

    detailImg.src = ramen.image
    detailName.textContent = ramen.name
    detailRestaurant.textContent = ramen.restaurant
    ratingDisplay.textContent = ramen.rating
    commentDisplay.textContent = ramen.comment
}

function submitNewRamen() {



    newRamen.addEventListener('submit', (e) => {
        e.preventDefault()
        addRamen()
        newRamen.reset()

    })
    

    const newName = document.getElementById('new-name').value
    const newRestaurant = document.getElementById('new-restaurant').value
    const newImg = document.getElementById('new-image').value
    const newRating = document.getElementById('new-rating').value
    const newComment = document.getElementById('new-comment').value

    newRamen = {
        'name': newName,
        'restaurant': newRestaurant,
        'image': newImg,
        'rating': newRating,
        'comment': newComment
    },

    fetch(ramenUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({newRamen})
    })

    addRamen(newRamen)

    detailFn(newRamen)

}
submitNewRamen()