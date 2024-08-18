let cookies = [];
let taskID = 1;
function createTask(obj = {}){
    let parent = document.querySelector(".tasks");
    const n = parent.childElementCount;
    // Creating a div for the task
    let div = document.createElement("div");
    div.setAttribute("class", "task");
    // Entering Elements of div
    let span = document.createElement("span");
    let textArea = document.createElement("textarea");
    let btn = document.createElement("button");
    // Set properties
    if (Object.keys(obj).length == 0){
        div.setAttribute("id", taskID++);
    }
    else{
        const setID = Object.keys(obj)[0];
        div.setAttribute("id", setID);
        textArea.value = obj[setID];
    }
    const ID = div.getAttribute("id");

    textArea.setAttribute("name", "task");
    btn.setAttribute("class", "del");
    span.innerHTML = `${n+1}.`
    btn.innerHTML = `<img src="icon.svg" alt="">`;

    div.append(span);
    div.append(textArea);
    div.append(btn);

    // Adding event Listener for TextArea and Delete
    textArea.addEventListener("change", ()=>{
        // adding in cookies
        let tempObj = {};
        tempObj[ID] = textArea.value;
        cookies.push(tempObj);
        setCookies();
    })
    btn.addEventListener("click", ()=>{
        // Delete the current element
        let delIdx = -1;
        cookies.forEach((element, idx) => {
            if (Object.keys(element)[0] == ID)
                delIdx = idx;
        });
        if (delIdx != -1){
            cookies.splice(delIdx, 1);
        }
        // Setting numbering
        div.remove();
        setNumbering();
        setCookies();
    })  

    return div;
}

function setNumbering(){
    let childs = document.querySelector(".tasks").children;
    childs = Array.from(childs);
    for (let i=0; i<childs.length; i++){
        childs[i].querySelector("span").innerHTML = `${i+1}.`;
    }
}

function addTask(div){
    let parent = document.querySelector(".tasks");
    parent.append(div);
}

function setCookies(){
    // This functon will basically called when there will be a change i.e. this is will update cookies
    localStorage.setItem("allData", JSON.stringify({allData: cookies}));
    localStorage.setItem("prevID", JSON.stringify({prevID: taskID}));
}

function main(){
    // initially check for existing cookies
    let prevData = localStorage.getItem("allData");
    let setID = localStorage.getItem("prevID");
    if (prevData != null){
        prevData = JSON.parse(prevData);
        cookies = prevData["allData"];
        cookies.forEach(element => {
            if (element != undefined)
                addTask(createTask(element));
        });
        setID = JSON.parse(setID);
        
        if (cookies.length == 0)
            setID["prevID"] = 1;

        taskID = setID["prevID"];
                
    }

    // add event listener on + button
    let addBtn = document.querySelector(".add");
    addBtn.addEventListener("click", ()=>{
        addTask(createTask());
    });
}
main();
