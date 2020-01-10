const puppyUrl = 'http://localhost:3000/pups'

document.addEventListener("DOMContentLoaded",event =>{
    const div = document.querySelector("#dog-bar")
    const infoDiv = document.querySelector("#dog-info")
    readAction(div,infoDiv)


})

function readAction (div,infoDiv){
    fetch(puppyUrl)
    .then(r => r.json() )
    .then(dogObjs => {
        dogObjs.forEach(dog => {
            const span = document.createElement("span")
            span.innerText += dog.name
            div.append(span)
            const Img = document.createElement("img")
            Img.src = dog.image
          
            const Title = document.createElement("h2")
            Title.innerText = dog.name
          
            const Button = document.createElement("button")
            Button.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
            span.addEventListener("click",e => {
                infoDiv.innerText = ""
                infoDiv.append(Img, Title, Button)     
            })
            Button.addEventListener("click",e =>{
                if (dog.isGoodDog){
                    dog.isGoodDog = false
                }
                else{
                    dog.isGoodDog = true
                }
                fetch(`http://localhost:3000/pups/${dog.id}`,{
                    method : 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                      },
                    body : JSON.stringify({
                        "isGoodDog": dog.isGoodDog
                    })
                }).then(r => r.json())
                .then(r => {
                    if(r.isGoodDog){
                        e.target.innerText =  "Good Dog!"
                    }
                    else{
                        e.target.innerText =  "Bad Dog!"
                    }
                    
                })
            })
        })
    })
}


