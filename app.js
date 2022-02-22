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
    for(let i = 0; i < recipes.length; i++){
        if (recipes[i].name && recipes[i].description && recipes[i].ingredients.length>0) {
            for(let j = 0; j < recipes[i].ingredients.length; j++){
                deleteWrongs(ingredientsarray, recipes[i].ingredients[j].ingredient)
            }
            deleteWrongs(appliancesarray, recipes[i].appliance)
            for(let j = 0; j < recipes[i].ustensils.length; j++){
                deleteWrongs(ustensilsarray, recipes[i].ustensils[j])
            }
        }
    };
    displayListsElements(ingredientsarray, 1, "ingredient")
    displayListsElements(appliancesarray, 2, "appliance")
    displayListsElements(ustensilsarray, 3, "ustensil")
}

//delete wrong characters or duplicates
function deleteWrongs(tagsarray, tag){
    if (tagsarray == allingredients || tagsarray == allappliances || tagsarray == allustensils) {
        let isthesame = false
        for(let i = 0; i < tagsarray.length; i++){
            if(tagsarray[i].normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "") == tag.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")){
                isthesame = true
            }
        };
        if (isthesame == false) {
            tagsarray.push((tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()).replace(/[.*+?^%${}()|[0-9[\]\\]/g, ""))
        }
    }else{
        for(let i = 0; i < tagsarray.length; i++){
            tagsarray.count = 0
            for (let j = 0; j < tagsarray.length; j++) {
                if (tagsarray[j] === tagsarray[i]) {
                    tagsarray.count++
                }
            }
            if (tagsarray.count >= 2) {
                tagsarray.splice(tagsarray.indexOf(tagsarray[i]), 1)
            }
        };
    }
}

function searchInSelectedTags(element){
    const selectedli = document.querySelectorAll(".selectedtags li")
    let retour = false
    for(let i = 0; i < selectedli.length; i++){
        if (selectedli[i].textContent == element) {
            retour = true
        }
    };
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
    for(let i = 0; i < tagsarray.length; i++){
        if (tagsarray[i] != "") {
            let li = document.createElement("li")
            let croix = document.createElement("img")
            croix.src = "assets/croix.png"
            li.innerHTML = tagsarray[i]
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
            if (searchInSelectedTags(tagsarray[i]) == false) { 
                document.querySelector(".tags>li:nth-child("+ listnth +") .listall").appendChild(li)
            }
        }
    }
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
for(let i = 0; i < recipes.length; i++){
    if (recipes[i].name && recipes[i].description && recipes[i].ingredients.length>0) {
        let article = document.createElement("article")
        article.ingredientsstring = ""
        article.description = recipes[i].description
        article.globalinfos = recipes[i].name + " "
        article.ingredients = []
        article.appliance = []
        article.appliance.push(recipes[i].appliance)
        article.ustensils = recipes[i].ustensils

        let imagecontainer = document.createElement("div")
        imagecontainer.classList.add("imagecontainer")

        let name = document.createElement("h3")
        name.innerHTML = recipes[i].name
        name.classList.add("name")

        let timecontainer = document.createElement("div")
        timecontainer.classList.add("timecontainer")
        let timeicon = document.createElement("img")
        timeicon.src = "assets/horloge.png"
        let time = document.createElement("p")
        time.innerHTML = recipes[i].time + " min"

        let needs = document.createElement("div")
        needs.classList.add("needs")
        for(let j = 0; j < recipes[i].ingredients.length; j++){
            article.ingredientsstring = article.ingredientsstring + recipes[i].ingredients[j].ingredient + " "
            article.ingredients.push(recipes[i].ingredients[j].ingredient)
            let ingredientp = document.createElement("p")
            let details = document.createElement("span")
            if (recipes[i].ingredients[j].unit == "grammes") {
                recipes[i].ingredients[j].unit = "g"
            }
            if (recipes[i].ingredients[j].unit) {
                if (recipes[i].ingredients[j].unit.indexOf(" ")>-1){
                    recipes[i].ingredients[j].unit = recipes[i].ingredients[j].unit.substring(0, recipes[i].ingredients[j].unit.indexOf(' '))
                }
                if (recipes[i].ingredients[j].unit.length>3){
                    recipes[i].ingredients[j].unit = " " + recipes[i].ingredients[j].unit
                }
                ingredientp.innerHTML = recipes[i].ingredients[j].ingredient
                details.innerHTML = ": " + recipes[i].ingredients[j].quantity + recipes[i].ingredients[j].unit
                ingredientp.appendChild(details)
            }else{
                if (recipes[i].ingredients[j].quantity) {
                    ingredientp.innerHTML = recipes[i].ingredients[j].ingredient
                    details.innerHTML = ": " + recipes[i].ingredients[j].quantity
                    ingredientp.appendChild(details)
                }else{
                    ingredientp.innerHTML = recipes[i].ingredients[j].ingredient
                }
            }
            needs.appendChild(ingredientp)
        }
        article.globalinfos = article.globalinfos + article.ingredientsstring

        let description = document.createElement("p")
        description.classList.add("description")
        description.innerHTML = recipes[i].description

        article.appendChild(imagecontainer)
        article.appendChild(name)
        timecontainer.appendChild(timeicon)
        timecontainer.appendChild(time)
        article.appendChild(timecontainer)
        article.appendChild(needs)
        article.appendChild(description)
        recipescontainer.appendChild(article)
    }
};
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
        for(let i = 0; i < articles.length; i++){ 
            if((searchTerm(articles[i])==true ||articles[i].description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(searchallbar.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))>-1) == false) {
                articles[i].style.display = "none"
                articles[i].showed = false
            }else{
                articles[i].style.display = ""
                articles[i].showed = true
            }
        };
    }else{
        for(let i = 0; i < articles.length; i++){
            articles[i].style.display = ""
            articles[i].showed = true
        };
    }
    for(let i = 0; i < articles.length; i++){
        if(advanced == true) {
            applyAdvanced(".selectedustensil", articles[i], articles[i].ustensils)
            applyAdvanced(".selectedappliance", articles[i], articles[i].appliance)
            applyAdvanced(".selectedingredient", articles[i], articles[i].ingredients)       
        }
        if (articles[i].showed == true) {
            for(let j = 0; j < articles[i].ingredients.length; j++){
                presentsingredients.push((articles[i].ingredients[j].charAt(0).toUpperCase() + articles[i].ingredients[j].slice(1).toLowerCase()).replace(/[.*+?^%${}()|[0-9[\]\\]/g, ""))
            };
            for(let j = 0; j < articles[i].ustensils.length; j++){
                presentsustensils.push((articles[i].ustensils[j].charAt(0).toUpperCase() + articles[i].ustensils[j].slice(1).toLowerCase()).replace(/[.*+?^%${}()|[0-9[\]\\]/g, ""))
            };
            presentsappliances.push((articles[i].appliance[0].charAt(0).toUpperCase() + articles[i].appliance[0].slice(1).toLowerCase()).replace(/[.*+?^%${}()|[0-9[\]\\]/g, ""))
        }
        
    };
    selectAllTags(presentsingredients, presentsappliances, presentsustensils)
    searchingredient.value = ""
    searchappliance.value = ""
    searchustensil.value = ""
}

function searchTerm(article){
    let retour = false
    let verifiedstring = 0
    let prevelement = ""
    for(let i = 0; i < searchallbar.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").length; i++){
        if (article.globalinfos.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchallbar.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ")[i]) && prevelement != searchallbar.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ")[i]) {
                verifiedstring++
        }
        if (verifiedstring == searchallbar.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").length) {
            retour = true
        }else{
            retour = false
        }
        prevelement = searchallbar.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ")[i]
    };
    if (retour == false) {
        return false
    }else{
        return true
    }
}

function applyAdvanced(categorie, article, categarray){
    for(let i = 0; i < document.querySelectorAll(categorie).length; i++){
        let test = 0
        if (categarray.length==0) {
            article.style.display = "none"
            article.showed = false
        }
        for(let j = 0; j < categarray.length; j++){
            if (categarray[j].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.*+?^%${}()|[0-9[\]\\]/g, "") == (document.querySelectorAll(categorie)[i].textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) && article.showed == true) {
                article.style.display = ""
                article.showed = true
            }else{
                test ++
            }
            if(test == categarray.length){     
                article.style.display = "none"
                article.showed = false
            }
        };
    };
}

function resultAdvancedSearchbar(searchbar, type){
    searchbar.addEventListener("input", () => {
        for(let i = 0; i < document.querySelectorAll(".listall."+type+" li").length; i++){
            if (element.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchbar.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                element.style.display = ""
            }else{
                element.style.display = "none"
            }
        };
    })
}