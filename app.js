let allingredients = []
let allappliances = []
let allustensils = []
let presentsingredients = []
let presentsappliances = []
let presentsustensils = []
const selectedtags = document.querySelector(".selectedtags")
const searchallbar = document.querySelector("#search")
const searchingredient = document.querySelector(".searchingredient")
const searchappliance = document.querySelector(".searchappliance")
const searchustensil = document.querySelector(".searchustensil")
const recipescontainer = document.querySelector(".recettes")

selectAllTags(allingredients, allappliances, allustensils)


//take elements from recipe.js to put it in advanced filters
function selectAllTags(ingredientsarray, appliancesarray, ustensilsarray){
    recipes.forEach(recipe => {
        if (recipe.name && recipe.description && recipe.ingredients) {
            recipe.ingredients.forEach(ingredients => {
                deleteWrongs(ingredientsarray, ingredients.ingredient)
            })
            deleteWrongs(appliancesarray, recipe.appliance)
            recipe.ustensils.forEach(ustensil => {
                deleteWrongs(ustensilsarray, ustensil)
            })
        }
    });
    displayListsElements(ingredientsarray, 1, "ingredient")
    displayListsElements(appliancesarray, 2, "appliance")
    displayListsElements(ustensilsarray, 3, "ustensil")
}

//delete wrong characters or duplicates
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

function searchInSelectedTags(element){
    let retour = false
    document.querySelectorAll(".selectedtags li").forEach(tag => {
        if (tag.textContent == element) {
            retour = true
        }
    });
    if (retour == true) {
        return true
    }else{
        return false
    }
}


function displayListsElements(tagsarray, listnth, type){
    document.querySelector(".tags>li:nth-child("+ listnth +") .listall").innerHTML = ""
    tagsarray.sort(function (a, b) {
        return a.localeCompare(b);
      });
    tagsarray.forEach(element => {
        if (element != "") {
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
                resultSearchbar(allarticles, true)
                searchingredient.value = ""
                searchappliance.value = ""
                searchustensil.value = ""
            })
            if (searchInSelectedTags(element) == false) { 
                document.querySelector(".tags>li:nth-child("+ listnth +") .listall").appendChild(li)
            }
        }
    })
}

//show the advanced tags list
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


//display all recipes
recipes.forEach(recipe => {
    if (recipe.name && recipe.description && recipe.ingredients.length>0) {
        let article = document.createElement("article")
        article.ingredientsstring = ""
        article.description = recipe.description
        article.globalinfos = recipe.name + " "
        article.ingredients = []
        article.appliance = []
        article.appliance.push(recipe.appliance)
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
    }
});
const allarticles = document.querySelectorAll(".recettes article")

searchallbar.addEventListener("input", () => {
    resultSearchbar(allarticles, true)
})

//show results and filter tags when user is typing in global searchbar
function resultSearchbar(articles, advanced){
        presentsingredients = []
        presentsappliances = []
        presentsustensils = []
    if (searchallbar.value.length >= 3) {
        articles.forEach(article => { 
            if((searchTerm(article)==true ||article.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(searchallbar.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))>-1) == false) {
                article.style.display = "none"
                article.showed = false
            }else{
                article.style.display = ""
                article.showed = true
            }
        });
    }else{
        articles.forEach(article => {
            article.style.display = ""
            article.showed = true
        });
    }
    articles.forEach(article => {
        if(advanced == true) {
            applyAdvanced(".selectedustensil", article, article.ustensils)
            applyAdvanced(".selectedappliance", article, article.appliance)
            applyAdvanced(".selectedingredient", article, article.ingredients)       
        }
        if (article.showed == true) {
            article.ingredients.forEach(ingredient => {
                presentsingredients.push((ingredient.charAt(0).toUpperCase() + ingredient.slice(1).toLowerCase()).replace(/[.*+?^${}()|[0-9[\]\\]/g, ""))
            });
            article.ustensils.forEach(ustensil => {
                presentsustensils.push((ustensil.charAt(0).toUpperCase() + ustensil.slice(1).toLowerCase()).replace(/[.*+?^${}()|[0-9[\]\\]/g, ""))
            });
            presentsappliances.push((article.appliance[0].charAt(0).toUpperCase() + article.appliance[0].slice(1).toLowerCase()).replace(/[.*+?^${}()|[0-9[\]\\]/g, ""))
        }
        
    });
    selectAllTags(presentsingredients, presentsappliances, presentsustensils)
    searchingredient.value = ""
    searchappliance.value = ""
    searchustensil.value = ""
}

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

function applyAdvanced(categorie, article, categarray){
    document.querySelectorAll(categorie).forEach(tag => {
        let test = 0
        if (categarray.length==0) {
            article.style.display = "none"
            article.showed = false
        }
        categarray.forEach(element => {
            if (element.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") == (tag.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) && article.showed == true && categarray.length>=1) {
                article.style.display = ""
                article.showed = true
            }else{
                test ++
            }
            if(test == categarray.length){     
                article.style.display = "none"
                article.showed = false
            }
        });
    });
}

function resultAdvancedSearchbar(searchbar, type){
    searchbar.addEventListener("input", () => {
        document.querySelectorAll(".listall."+type+" li").forEach(element => {
            if (element.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchbar.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                element.style.display = ""
            }else{
                element.style.display = "none"
            }
        });
    })
}