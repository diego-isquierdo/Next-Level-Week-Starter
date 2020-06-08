function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res=>res.json())
        .then(states=> {
            for(const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            }
        })
}


populateUFs();


function getCities(event){
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const indexOfSelectedState = event.target.selectedIndex;
    const ufValue = event.target.value;
    
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "";
    citySelect.disabled = true;

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for(const city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false;
        })
}

function handSelectedItem(event){
    const itemLi = event.target;

    //toggle > add se não tem e remove se tem
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;
    //verificar os itens selecionados e se sim pegar os itens seleciondos
    //findIndex retorna -1 se não contem e 0 se contem
    const alreadySelected = selectItems.findIndex(item=>item==itemId);
    
    if(alreadySelected>=0){
        const filteredItems = selectItems.filter(item=>item!= itemId);
        selectItems = filteredItems;
    }else{
        selectItems.push(itemId);
    }

    collectedItems.value=selectItems;
}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);

    //criando array p captar items selecionados
let selectItems = []

const itemsToColect = document.querySelectorAll(".items-grid li");

const collectedItems = document.querySelector("input[name=items]");

for (const item of itemsToColect){
    item.addEventListener("click", handSelectedItem);
}

