let allingredients = []
let allappliances = []
let allustensils = []
let selectedtags = document.querySelector(".selectedtags")
let searchallbar = document.querySelector("#search")
let recipescontainer = document.querySelector(".recettes")

recipes.forEach(element => {
    element.ingredients.forEach(ingredients => {
        deleteWrongs(allingredients, ingredients.ingredient)
    })
});
displayListsElements(allingredients, 1, "ingredient")

recipes.forEach(element => {
    deleteWrongs(allappliances, element.appliance)
});
displayListsElements(allappliances, 2, "appliance")

recipes.forEach(element => {
    element.ustensils.forEach(ustensil => {
        deleteWrongs(allustensils, ustensil)
    })
});
displayListsElements(allustensils, 3, "ustensil")


function deleteWrongs(tagsarray, tag){
    if(tagsarray.indexOf((tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z ]/g, ""))>-1 == false){
        tagsarray.push((tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z ]/g, ""))
    }
}

function displayListsElements(tagsarray, listnth, type){
    tagsarray.forEach(element => {
        let li = document.createElement("li")
        let croix = document.createElement("img")
        croix.src = "assets/croix.png"
        li.innerHTML = element
        li.addEventListener("click", () => {
            if(li.selected == true){
                li.removeChild(croix)
                li.classList.remove("selected" + type)
                document.querySelector(".tags>li:nth-child("+ listnth +") .listall").appendChild(li)
                li.selected = false
            }else{
                li.appendChild(croix)
                li.classList.add("selected" + type)
                selectedtags.appendChild(li)
                li.selected = true
            }
        })
        document.querySelector(".tags>li:nth-child("+ listnth +") .listall").appendChild(li)
    })
}

function showList(element, buttontext){
    if(document.querySelector(element).listopened != true){
        document.querySelector(element + " .groupbutton").classList.add("listopened")
        document.querySelector(element + " .groupbutton button").innerHTML = ""
        document.querySelector(element).classList.add("listopened")
        document.querySelector(element + " .specificsearch").classList.add("listopened")
        document.querySelector(element + " .listall").classList.add("listopened")
        document.querySelector(element).listopened = true
    }else{
        document.querySelector(element + " .groupbutton").classList.remove("listopened")
        document.querySelector(element + " .groupbutton button").innerHTML = buttontext
        document.querySelector(element).classList.remove("listopened")
        document.querySelector(element + " .specificsearch").classList.remove("listopened")
        document.querySelector(element + " .listall").classList.remove("listopened")
        document.querySelector(element).listopened = false
    }
}

recipes.forEach(recipe => {
    let article = document.createElement("article")

    let imagecontainer = document.createElement("div")
    imagecontainer.classList.add("imagecontainer")

    let name = document.createElement("h3")
    name.innerHTML = recipe.name
    name.classList.add("name")

    let timecontainer = document.createElement("div")
    timecontainer.classList.add("timecontainer")
    let timeicon = document.createElement("img")
    timeicon.src = "assets/horloge.png"
    let time = document.createElement("p")
    time.innerHTML = recipe.time + " min"

    let needs = document.createElement("div")
    needs.classList.add("needs")
    recipe.ingredients.forEach(ingredients => {
        let ingredientp = document.createElement("p")
        let details = document.createElement("span")
        if (ingredients.unit == "grammes") {
            ingredients.unit = "g"
        }
        if (ingredients.unit) {
            if (ingredients.unit.indexOf(" ")>-1){
                ingredients.unit = ingredients.unit.substring(0, ingredients.unit.indexOf(' '))
            }
            if (ingredients.unit.length>3){
                ingredients.unit = " " + ingredients.unit
            }
            ingredientp.innerHTML = ingredients.ingredient
            details.innerHTML = ": " + ingredients.quantity + ingredients.unit
            ingredientp.appendChild(details)
        }else{
            if (ingredients.quantity) {
                ingredientp.innerHTML = ingredients.ingredient
                details.innerHTML = ": " + ingredients.quantity
                ingredientp.appendChild(details)
            }else{
                ingredientp.innerHTML = ingredients.ingredient
            }
        }
        needs.appendChild(ingredientp)
    })

    let description = document.createElement("p")
    description.classList.add("description")
    description.innerHTML = recipe.description

    article.appendChild(imagecontainer)
    article.appendChild(name)
    timecontainer.appendChild(timeicon)
    timecontainer.appendChild(time)
    article.appendChild(timecontainer)
    article.appendChild(needs)
    article.appendChild(description)
    recipescontainer.appendChild(article)
});

searchallbar.addEventListener("input", () => {
    console.log(searchallbar.value)
})