if (/Mobi/.test(navigator.userAgent)) {
    // Está en un dispositivo móvil
    document.querySelector('.instructions p').textContent = 'Toca para editar, desliza hacia la derecha para marcar o desmarcar como completado. ¡Manos a la obra!';
  } else {
    // Está en un navegador de escritorio
    document.querySelector('.instructions p').textContent = 'Un clic para editar, doble clic para marcar o desmarcar como completado. ¡Manos a la obra!';
  }
  
  // Obtener elementos del DOM
  const toDoList = document.querySelector('ul[name="to-do-list"]');
  const completedTaskList = document.querySelector('ul[name="completed-task"]');
  const addItemButton = document.querySelector('button[name="add-task"]');
  const newTaskTemplate = document.getElementById('listItem-newTask');
  
  // Variables de estado
  let initialX = null;
  let currentX = null;
  
  // Event listeners
  toDoList.addEventListener("click", handleSingleClick);
  toDoList.addEventListener("dblclick", handleListItemClick);
  toDoList.addEventListener('touchstart', handleTouchStart);
  toDoList.addEventListener('touchmove', handleTouchMove);
  toDoList.addEventListener('touchend', handleTouchEnd);
  
  completedTaskList.addEventListener("dblclick", handleListItemClick);
  completedTaskList.addEventListener('touchstart', handleTouchStart);
  completedTaskList.addEventListener('touchmove', handleTouchMove);
  completedTaskList.addEventListener('touchend', handleTouchEnd);
  
  addItemButton.addEventListener("click", addListItem);
  
  // Funciones de manejo de eventos
  function handleSingleClick(event) {
    const listItem = event.target.closest("li");
    if (!listItem) return;
  
    // Verificar si el contenido del li es "Nueva Tarea"
    if (listItem.textContent === "Nueva tarea") {
      // Borrar contenido del li
      listItem.textContent = "";
    }else if (listItem.textContent === ""){
      listItem.textContent = "Nueva tarea";
    }
  }
  
  function handleTouchStart(event) {
    initialX = event.touches[0].clientX;
  }
  
  function handleTouchMove(event) {
    if (initialX === null) return;
    currentX = event.touches[0].clientX;
  }
  
  /*Esta función gestiona el evento touchend, que se activa cuando un usuario levanta el dedo de una pantalla táctil */
  function handleTouchEnd(event) {
    //Comprueba si initialX y currentX son nulos; si es así, sale de la funcion
    if (initialX === null || currentX === null) return;
  
    //Calcula la distancia horizontal entre initialX y currentX
    const distance = currentX - initialX;
    const listItem = event.target.closest("li");
  
    if (!listItem || Math.abs(distance) <= 50) return;
  
    if (distance > 0) {
      const completed = listItem.dataset.completed === "true";
      listItem.dataset.completed = !completed;
      if (completed) {
        handleCompletedListItem(listItem);
      } else {
        handleToDoListItem(listItem);
      }
    }
  
    initialX = null;
    currentX = null;
  }
  
  function addListItem() {
    const newTaskListItem = newTaskTemplate.content.cloneNode(true).firstElementChild;
    toDoList.appendChild(newTaskListItem);
  }
  
  function handleListItemClick(event) {
    const listItem = event.target.closest("li");
    if (!listItem) return;
  
    const completed = listItem.dataset.completed === "true";
  
       // Verificar si el contenido de la tarea no está vacío
      if (listItem.textContent.trim() !== "") {
        // Actualizar el estado completado solo si la tarea no está vacía
        listItem.dataset.completed = !completed;
  
        if (completed) {
          handleCompletedListItem(listItem);
        } else {
          handleToDoListItem(listItem);
        }
      }
  }
  
  function handleCompletedListItem(listItem) {
    const deleteButton = listItem.querySelector(".delete-button");
    if (deleteButton) deleteButton.remove();
  
    toDoList.appendChild(listItem);
    listItem.setAttribute("contenteditable", true);
  }
  
  function handleToDoListItem(listItem) {
    const deleteButton = createDeleteButton();
    listItem.append(deleteButton);
  
    completedTaskList.appendChild(listItem);
    listItem.removeAttribute("contenteditable");
  }
  
  function createDeleteButton() {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = '<img src="icons/icons8-delete-icon-16.png" alt="Eliminar tarea">';
    
    deleteButton.addEventListener("click", function (event) {
      event.target.closest("li").remove();
    });
  
    return deleteButton;
  }