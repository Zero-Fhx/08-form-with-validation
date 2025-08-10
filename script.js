// DOM
const form = document.getElementById("contact-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

const messagesContainer = document.getElementById("messages");

const messageDialog = document.getElementById("message-dialog");
const messageDialogName = document.getElementById("dialog-author");
const messageDialogEmail = document.getElementById("dialog-email");
const messageDialogContent = document.getElementById("dialog-message");
const messageDialogCloseButton = document.getElementById("close-button");

let messages = {};

let messagesId = 0;

// Event listener for form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let name = nameInput.value.trim();
  let email = emailInput.value.trim();
  let message = messageInput.value.trim();

  const isValid = validate(name, email, message);

  if (!isValid) return;

  sendMessage(name, email, message);

  form.reset();
});

nameInput.addEventListener("input", () => {
  nameError.textContent = "";
});

emailInput.addEventListener("input", () => {
  emailError.textContent = "";
});

messageInput.addEventListener("input", () => {
  messageError.textContent = "";
});

function validate(name, email, message) {
  let isValid = true;

  if (name === "") {
    nameError.textContent = "El nombre es obligatorio.";
    isValid = false;
  } else {
    nameError.textContent = "";
  }

  if (email === "") {
    emailError.textContent = "El correo electrónico es obligatorio.";
    isValid = false;
  } else if (!validateEmail(email)) {
    emailError.textContent = "El correo electrónico no es válido.";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  if (message === "") {
    messageError.textContent = "El mensaje es obligatorio.";
    isValid = false;
  } else {
    messageError.textContent = "";
  }

  return isValid;
}

function validateEmail(email) {
  const emailPattern = /^[-a-zAZ0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

function sendMessage(name, email, message) {
  messagesId++;
  messages[messagesId] = {
    id: messagesId,
    name: name,
    email: email,
    message: message,
    read: false,
  };

  displayMessage(messages[messagesId]);
  checkMessages();
  saveMessagesToLocalStorage();
}

function displayMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  let readButtonText = "Marcar como leído";
  if (message.read) {
    messageElement.classList.add("read");
    readButtonText = "Marcar como no leído";
  } else {
    messageElement.classList.add("unread");
  }

  messageElement.innerHTML = `
    <div class="content">
      <div class="author">
        <h3>${message.name}</h3>
        <p>${message.email}</p>
      </div>
      <div class="message-preview">${message.message}</div>
    </div>
    <div class="buttons">
      <button class="read-button">${readButtonText}</button>
      <button class="delete-button">Eliminar</button>
    </div>
  `;

  messagesContainer.appendChild(messageElement);

  const readButton = messageElement.querySelector(".read-button");
  const deleteButton = messageElement.querySelector(".delete-button");

  readButton.addEventListener("click", () => {
    event.stopPropagation();
    message.read = !message.read;
    readButton.textContent = message.read
      ? "Marcar como no leído"
      : "Marcar como leído";
    messageElement.classList.toggle("read");
    messageElement.classList.toggle("unread");
    saveMessagesToLocalStorage();
  });

  deleteButton.addEventListener("click", () => {
    event.stopPropagation();
    messagesContainer.removeChild(messageElement);
    delete messages[message.id];
    checkMessages();
    saveMessagesToLocalStorage();
  });

  messageElement.addEventListener("click", () => {
    openMessageDetails(message);
    message.read = true;
    messageElement.classList.remove("unread");
    messageElement.classList.add("read");
    readButton.textContent = "Marcar como no leído";
    saveMessagesToLocalStorage();
  });
}

function openMessageDetails(message) {
  messageDialogName.textContent = message.name;
  messageDialogEmail.textContent = message.email;
  messageDialogContent.textContent = message.message;

  messageDialog.showModal();
}

messageDialogCloseButton.addEventListener("click", () => {
  messageDialog.classList.add("closing");
  messageDialog.addEventListener(
    "animationend",
    (event) => {
      if (event.animationName === "hide-dialog") {
        messageDialog.close();
        messageDialog.classList.remove("closing");
      }
    },
    { once: true }
  );
});

function checkMessages() {
  if (Object.keys(messages).length === 0) {
    messagesContainer.innerHTML = "<p>No hay mensajes.</p>";
  } else {
    messagesContainer.innerHTML = "";
    for (const id in messages) {
      displayMessage(messages[id]);
    }
  }
}

function saveMessagesToLocalStorage() {
  localStorage.setItem("messages", JSON.stringify(messages));
}

function loadMessagesFromLocalStorage() {
  const storedMessages = localStorage.getItem("messages");
  if (storedMessages) {
    messages = JSON.parse(storedMessages);
  } else {
    messages = {};
  }

  messagesId =
    Object.keys(messages).length > 0
      ? Math.max(...Object.keys(messages).map(Number))
      : 0;

  for (const id in messages) {
    displayMessage(messages[id]);
  }
}

loadMessagesFromLocalStorage();
checkMessages();
