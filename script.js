

//**################### CREATE GROUP FRONT-END ######################## **/




function createGroupDisplay(button){
    button.disabled = "disabled";
    let noFencers = parseInt(document.getElementById('nofencers').value);

    let line = document.createElement("div");
    line.classList.add("colored-divider");
    document.body.append(line);

    

    let container = document.createElement("div");
    container.classList.add("group-holder");
    document.body.append(container);




    for (let i=0;i<noFencers;i++){
        
        // create <form> for this row
        let form = document.createElement("form");
        form.classList.add("row-holder")

        // append it to <div> holder
        container.append(form);

        // create name input box
        let nameBox = document.createElement("input");
        nameBox.classList.add("name-box");
        nameBox.setAttribute("id",`name-${i+1}`);

        // append it to <form>
        form.append(nameBox);



        for (let j=0;j<noFencers;j++){
            if (i === j){
                
                // create disabled box
                let disabledBox = document.createElement("input")

                // append it to form
                form.append(disabledBox);

                // create class and add it to this element
                disabledBox.classList.add("disabled-score-box")

            }
            else {
                
                // create score input box
                let scoreBox = document.createElement("input")

                // append it to form
                form.append(scoreBox)

                // create class and add it to this element

                scoreBox.classList.add("score-box");
               // scoreBox.classList.add(`row-${i+1}`);
               // scoreBox.classList.add(`column-${j+1}`);
                scoreBox.setAttribute("id",`${i+1}-${j+1}`);
                

                
            }
        }
        
    }
     
    let calculateButton = document.createElement("button");
    document.body.append(calculateButton);
    calculateButton.setAttribute("id","calculate-button");
    calculateButton.setAttribute("onclick","calculate_results(this)");
    document.getElementById("calculate-button").innerHTML = "Calculate group";

  

    const disabledBoxes = document.querySelectorAll(".disabled-score-box");
    disabledBoxes.forEach((item) => {
        item.toggleAttribute("disabled")
    })


    const scoreBoxes = document.querySelectorAll(".score-box");
    scoreBoxes.forEach((item) => {
        item.setAttribute("type","number");
        item.setAttribute("onchange","check_score_input(this)");
        item.setAttribute("min","0");
        item.setAttribute("max","5");
    })

    
    const nameBoxes = document.querySelectorAll(".name-box");
    nameBoxes.forEach((item) => {
        item.setAttribute("type","text")
    })

}


function check_score_input(input){

    if (input.value > 5 || input.value < 0){
        console.log('Invalid input in score box');
        input.value = "";
        alert("Score must be between 0-5")
    }
}

function return_value(input){
    let score = input.value * 1;
    console.log(input.value, typeof input.value);
    console.log(score, typeof score);
}

let fencerNames = [];
let fencerData = [];
let fencerWins = [];
let fencerPercentage = [];
let fencerTouchesFor = [];
let fencerTouchesAgainst = [];
let fencerPlusMinus = [];
let finalFencerStats = [];
let numberOfMatches = [];


function store_names(){
    
    let noFencers = parseInt(document.getElementById('nofencers').value);
    for (let i=0;i<noFencers;i++){
        fencerNames[i+1]=[];
        let currentName = document.getElementById(`name-${i+1}`);
        fencerNames[i+1]=currentName.value;
    }
}

function store_scores(){
    let noFencers = parseInt(document.getElementById('nofencers').value);
    for (let i = 0; i<noFencers;i++){
        fencerData[i+1]=[];
        numberOfMatches[i+1]=[];
    }

    for (let i = 0; i<noFencers;i++){
        
        for (let j =0;j<noFencers;j++){
            if (i !== j){
                let currentBoxScore = document.getElementById(`${i+1}-${j+1}`);
                fencerData[i+1][j+1]=currentBoxScore.value;
                numberOfMatches[i+1]++;
                
            }
        }
    }
 
}


function calculate_win_percentage(){
   
    let noFencers = parseInt(document.getElementById('nofencers').value);
    let winCounter = 0;
    for (let i = 0; i<noFencers;i++){
        fencerWins[i+1]=0;
    }

    for (let i=0;i<noFencers;i++){
        for (let j=0;j<noFencers;j++){
            if (i!==j){
                if (fencerData[i+1][j+1]==5){
                    fencerWins[i+1]++;
                }
            }
        }
    }

    for (let i = 0; i<noFencers;i++){
        fencerPercentage[i+1]=0;
    }

    for (let i=0;i<noFencers;i++){
        fencerPercentage[i+1]=(fencerWins[i+1]/(noFencers-1)).toFixed(3); //converted number to string
    }

}


function calculate_touches_for_against(){

    let noFencers = parseInt(document.getElementById('nofencers').value);

    for (let i=0; i<noFencers;i++){
        fencerTouchesFor[i+1]=0;
        fencerTouchesAgainst[i+1]=0;
        fencerPlusMinus[i+1]=0;
    }


    for (let i=0; i<noFencers;i++){
        for (let j=0; j<noFencers;j++){
            if (i !== j){
                fencerTouchesFor[i+1] += fencerData[i+1][j+1]*1;
                fencerTouchesAgainst[i+1] += fencerData[j+1][i+1]*1;
            }
            
        }
    }
    for (let i=0; i<noFencers;i++){
        fencerPlusMinus[i+1]=fencerTouchesFor[i+1]-fencerTouchesAgainst[i+1];
    }
}



function final_group_result(){
   
    let noFencers = parseInt(document.getElementById('nofencers').value);

    for (let i=0;i<noFencers;i++){
        finalFencerStats[i+1]={
            name: fencerNames[i+1],
            wins: fencerWins[i+1],
            matches: numberOfMatches[i+1],
            winPercentage: fencerPercentage[i+1],
            touchesFor: fencerTouchesFor[i+1],
            touchesAgainst: fencerTouchesAgainst[i+1],
            plusMinus: fencerPlusMinus[i+1]
            
        }
    }

    
}

function sort_group_results(){


    finalFencerStats.sort((a,b) =>{
        const winDiff = parseFloat(b.winPercentage) - parseFloat(a.winPercentage);
        if (winDiff !==0){
            return winDiff;
        }
        
        const plusMinusDiff = b.plusMinus - a.plusMinus;
        if (plusMinusDiff !==0){
            return plusMinusDiff;
        }

        const touchesForDiff = b.touchesFor - a.touchesFor;
        if (touchesForDiff!==0){
            return touchesForDiff;
        }

        return a.touchesAgainst - b.touchesAgainst;
    })
console.log(finalFencerStats)
}


function display_results_table(){
    let noFencers = parseInt(document.getElementById('nofencers').value);

    //create div container for table
    let container = document.createElement("div");
    container.classList.add("table-holder");
    document.body.append(container);

    //create table
    let table = document.createElement("table");
    table.classList.add("table");
    container.append(table);

    //create caption 
    let caption = document.createElement("caption");
    caption.classList.add("caption");
    table.append(caption);

    //create thead
    let thead = document.createElement("thead");
    table.append(thead);
        //create 8x <th scope="column">Rank,name...</th>
    let columnNames = ["Rank","Name","V","M","Ind","TF","TA","Diff"];

    for (let i = 0; i<8;i++){
        let column = document.createElement("th");
        column.setAttribute("scope","column");
        column.setAttribute("id",`col-${i}`)
        thead.append(column);
        document.getElementById(`col-${i}`).innerHTML = columnNames[i];
    }
    
    //create tbody
    let tbody = document.createElement("tbody");
    table.append(tbody);

    // create tr * noFencers
        //create <th scope = "row"> (rank value)
        // 7x td to populate table row
    
    let valueNames = ["name","wins","matches","winPercentage","touchesFor","touchesAgainst","plusMinus"];

    for (let i=0; i<noFencers;i++){
        let tr = document.createElement("tr");
        let rankVal = document.createElement("th")
        rankVal.setAttribute("scope","row");
        rankVal.innerHTML = i+1;
        tbody.append(tr);
        tr.append(rankVal);
        
        for (let j=0; j<7;j++){
            let tdValue = document.createElement("td");
            tdValue.setAttribute("id",`tdvalue-${i}-${j}`);
            tr.append(tdValue);
            document.getElementById(`tdvalue-${i}-${j}`).innerHTML = finalFencerStats[i][valueNames[j]];
        }
        
    }


    let createTableauButton = document.createElement("button")
    createTableauButton.setAttribute("id","tableau-button");
    document.body.append(createTableauButton);

    document.getElementById("tableau-button").innerHTML = "Create tableau";

}




function calculate_results(button){
    button.disabled = "disabled";
    store_names();
    store_scores();
    calculate_win_percentage();
    calculate_touches_for_against();
    final_group_result();
    sort_group_results();

    let line = document.createElement("div");
    line.classList.add("colored-divider");
    document.body.append(line);

    display_results_table();

}






