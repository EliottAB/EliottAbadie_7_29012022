let allingredients = []
let allappliances = []
let allustensils = []
let presentsingredients = []
let presentsappliances = []
let presentsustensils = []
let selectedtags = document.querySelector(".selectedtags")
let searchallbar = document.querySelector("#search")
let recipescontainer = document.querySelector(".recettes")

selectAllTags(allingredients, allappliances, allustensils)
function selectAllTags(ingredientsarray, appliancesarray, ustensilsarray){
    recipes.forEach(element => {
        element.ingredients.forEach(ingredients => {
            deleteWrongs(ingredientsarray, ingredients.ingredient)
        })
        deleteWrongs(appliancesarray, element.appliance)
        element.ustensils.forEach(ustensil => {
            deleteWrongs(ustensilsarray, ustensil)
        })
    });
    displayListsElements(ingredientsarray, 1, "ingredient")
    displayListsElements(appliancesarray, 2, "appliance")
    displayListsElements(ustensilsarray, 3, "ustensil")
}


function deleteWrongs(tagsarray, tag){
    if (tagsarray == allingredients || tagsarray == allappliances || tagsarray == allustensils) {        
        let isthesame = false
        tagsarray.forEach(element => {
            if(element.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "") == tag.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")){
                isthesame = true
            }
        });
        if (isthesame == false) {
            tagsarray.push((tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()).replace(/[.*+?^${}()|[0-9[\]\\]/g, ""))
        }
    }else{
        tagsarray.forEach(element => {
            tagsarray.count = 0
            for (let i = 0; i < tagsarray.length; i++) {
                if (tagsarray[i] === element) {
                    tagsarray.count++
                }
            }
            if (tagsarray.count >= 2) {
                tagsarray.splice(tagsarray.indexOf(element), 1)
            }
        });
    }
}


function displayListsElements(tagsarray, listnth, type){
    document.querySelector(".tags>li:nth-child("+ listnth +") .listall").innerHTML = ""
    tagsarray.sort(function (a, b) {
        return a.localeCompare(b);
      });
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
    if ((document.querySelector(element).listopened == true) == false) {
        closeList(".tags>li:nth-child(1)", "Ingredients")
        closeList(".tags>li:nth-child(2)", "Appareils")
        closeList(".tags>li:nth-child(3)", "Ustensiles")
    }
    if(document.querySelector(element).listopened != true){
        document.querySelector(element + " .groupbutton").classList.add("listopened")
        document.querySelector(element + " .groupbutton button").innerHTML = ""
        document.querySelector(element).classList.add("listopened")
        document.querySelector(element + " .specificsearch").classList.add("listopened")
        document.querySelector(element + " .listall").classList.add("listopened")
        document.querySelector(element).listopened = true
    }else{
        closeList(element, buttontext)
    }
}

function closeList(element, buttontext){
    document.querySelector(element + " .groupbutton").classList.remove("listopened")
        document.querySelector(element + " .groupbutton button").innerHTML = buttontext
        document.querySelector(element).classList.remove("listopened")
        document.querySelector(element + " .specificsearch").classList.remove("listopened")
        document.querySelector(element + " .listall").classList.remove("listopened")
        document.querySelector(element).listopened = false
}

recipes.forEach(recipe => {
    let article = document.createElement("article")
    article.ingredientsstring = ""
    article.description = recipe.description
    article.globalinfos = recipe.name + " "
    article.ingredients = []
    article.appliance = recipe.appliance
    article.ustensils = recipe.ustensils

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
        article.ingredientsstring = article.ingredientsstring + ingredients.ingredient + " "
        article.ingredients.push(ingredients.ingredient)
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
    article.globalinfos = article.globalinfos + article.ingredientsstring

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
    if (searchallbar.value.length >= 3) {
        presentsingredients = []
        presentsappliances = []
        presentsustensils = []
        document.querySelectorAll(".recettes article").forEach(article => { 
            if ((searchTerm(article)==true || article.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(searchallbar.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))>-1) == false) {
                article.style.display = "none"
                article.showed = false
            }else{
                article.style.display = ""
                article.showed = true
                article.ingredients.forEach(ingredient => {
                    presentsingredients.push(ingredient)
                });
                article.ustensils.forEach(ustensil => {
                    presentsustensils.push(ustensil)
                });
                presentsappliances.push(article.appliance)
            }
        });
        selectAllTags(presentsingredients, presentsappliances, presentsustensils)
    }else{
        document.querySelectorAll(".recettes article").forEach(article => {
            article.style.display = ""
            article.showed = true
        });
        selectAllTags(allingredients, allappliances, allustensils)
    }
})

function searchTerm(article){
    let retour = false
    let verifiedstring = 0
    let prevelement = ""
    searchallbar.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").forEach(element => {
        if (article.globalinfos.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(element) && prevelement != element) {
                verifiedstring++
        }
        if (verifiedstring == searchallbar.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").length) {
            retour = true
        }else{
            retour = false
        }
        prevelement = element
    });
    if (retour == false) {
        return false
    }else{
        return true
    }
}