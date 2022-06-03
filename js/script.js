'use strict';

void function () {
    const formSelector = '#todoForm';
    const inputsSelector = 'input, textarea';
    const todoListSelector = '#todoItems';



    const todoList ={
        form : null,
        inputs : null,
        data : [],
        saveElData : null,
        init(){
            this.form = this.getElement(document, formSelector);
            this.inputs = this.getElements(this.form, inputsSelector);
            this.setEvent('submit',this.form,this.setDataToLocalStorage)

        },
        getElement(elementSearch, selector){
            if(!selector || !elementSearch) console.warn('function arguments were not passed');
            return elementSearch.querySelector(selector)

        },
        getElements(elementSearch, selectors){
            if(!selectors || !elementSearch) console.warn('function arguments were not passed');
            return elementSearch.querySelectorAll(selectors)

        },
        setData(elData){
            if(!elData) console.warn('function argument were not passed');
            elData = Array.from(elData);
            elData = (elData.reduce((acc, item)=>{
                acc[item.name] = item.value;
                return acc;
            },{}))

            this.saveElData = structuredClone(elData);
            elData.id = this.data.length;
            this.data.push(elData);

        },
        setDataToLocalStorage(){
            this.setData(this.inputs);
            localStorage.setItem( formSelector, JSON.stringify(this.data))
        },
        setEvent(eventType, element, eventHandler) {
            if(!eventType || !element || !eventHandler) console.warn('function arguments were not passed');
            element.addEventListener(eventType,event =>{
                event.preventDefault();
                event.stopPropagation();
                eventHandler.call(this, event);
                this.renderTodoItem(this.createTodoElement(this.saveElData.title, this.saveElData.description))
            } )
        },
        createTodoElement(title, body){
            const wrapper = document.createElement('div');
            wrapper.classList.add('col-4');

            const template = `<div class="taskWrapper">
                <div class="taskHeading">${title}</div>
                <div class="taskDescription">${body}</div>
            </div>`

            wrapper.innerHTML = template;
            return wrapper;
        },
        renderTodoItem(dataToRender) {
            const todosList = this.getElement(document, todoListSelector );
            todosList.append(dataToRender);
        }

    }
    todoList.init();

}()