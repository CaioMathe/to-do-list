const getData = JSON.parse(localStorage.getItem('List')) ?? [];
const data = getData;
const setData = (data) => localStorage.setItem('List', JSON.stringify(data))


const NewTask =  (Task, State='', indice) =>{ 
         const item =`<label class="lista_itens">
                      <input type="checkbox" ${State} data-indice =${indice}>
                      <div>${Task}</div>
                      <input type="button" value="X">
                      </label>`
                      document.body.querySelector(".Lista-todo").innerHTML += item;
                   }



const clearTask= ()=>{
    const todoList = document.getElementById("todoList");
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}                  
                   
const render = ()=>{
    clearTask()
    
     data.forEach((e, indice)=>{
        NewTask(e.Task, e.State, indice)
     })

}
render();

const NovoItem = (event) =>{
    const tecla = event.key;
    if(tecla === "Enter" && !event.target.value == ''){
        data.push({'Task': event.target.value, 'State': ''})
        setData(data);
        render()
        event.target.value = '';
    }
}
const removeItem = (i)=>{
    data.splice(i,1);
    setData(data)
    render();
}
const checkItem = (event) =>{
    const element = event.target;
    if(element.type === 'button'){
        const indice = element.dataset.indice;
        removeItem(indice);
    }else if(element.type ==="checkbox"){
        const indice = element.dataset.indice;
       data[indice].State = data[indice].State === '' ? 'checked' : '';
       setData(data)
    }
}

document.querySelector(".Lista-todo").addEventListener("click", checkItem)
document.getElementById("newTask").addEventListener("keypress", NovoItem);
