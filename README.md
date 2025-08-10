# 📝 Formulario con Validación

Un formulario de contacto avanzado con validación completa y gestión de mensajes desarrollado con HTML, CSS y JavaScript vanilla. Este es el **Proyecto #8** de mi serie de proyectos de desarrollo web.

## 📋 Descripción

Aplicación web que permite enviar mensajes de contacto con validación en tiempo real, persistencia de datos y un sistema completo de gestión de mensajes. Incluye validación de campos, feedback visual, modal de detalles y funcionalidades de lectura/eliminación de mensajes.

## ✨ Características Implementadas

- **Validación de email:** Expresión regular para formato correcto
- **Mensajes de error:** Feedback inmediato con mensajes específicos
- **Persistencia con localStorage:** Mantiene mensajes entre sesiones
- **Sistema de lectura:** Marca mensajes como leídos/no leídos
- **Modal de detalles:** Dialog nativo para ver mensaje completo
- **Gestión de mensajes:** Eliminar mensajes individuales
- **Animaciones CSS:** Transiciones suaves y efectos visuales
- **Estados visuales:** Diferenciación entre mensajes leídos y no leídos

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Estructura semántica moderna con:
  - Formularios accesibles con labels
  - Dialog element nativo para modal
  - Inputs con tipos específicos (email, text)
  - Meta tags optimizados
- **CSS3:** Estilos avanzados con:
  - CSS Nesting moderno
  - Flexbox para layouts responsivos
  - Keyframes para animaciones
  - Backdrop-filter para modal
  - Transitions y transforms
  - Custom properties implícitas
- **JavaScript ES6+:** Lógica avanzada con:
  - Event listeners múltiples
  - Manipulación del DOM dinámica
  - localStorage API
  - Validación con expresiones regulares
  - State management complejo
  - Template literals para HTML
- **Google Fonts:** Tipografía Onest (100-900 weights)

## 🎨 Diseño y Estilo

### Paleta de Colores

```css
/* Tema limpio y profesional */
--bg-primary: #f0f0f0; /* Fondo de página */
--bg-container: #ffffff; /* Fondo del contenedor */
--bg-unread: #f8f9fa; /* Fondo mensajes no leídos */
--bg-hover: #e9ecef; /* Fondo en hover */
--bg-message-detail: #f9f9f9; /* Fondo del mensaje en modal */
--text-primary: #333333; /* Texto principal */
--text-secondary: #444444; /* Texto secundario */
--text-muted: #555555; /* Texto tenue */
--text-light: #666666; /* Texto claro */
--accent-primary: #007bff; /* Azul principal */
--accent-success: #28a745; /* Verde para enviar */
--accent-success-hover: #218838; /* Verde hover */
--accent-hover: #005bb5; /* Azul hover */
--error: #ff0000; /* Rojo para errores */
--border: #cccccc; /* Bordes */
```

### Efectos Especiales

- **Box-shadow elevado** en contenedores principales
- **Animaciones de modal** con keyframes personalizados
- **Backdrop-filter blur** en dialog
- **Transform effects** en hover de botones
- **Transiciones suaves** en todos los elementos interactivos

## 📱 Diseño Responsivo

### Características

- **Contenedor máximo:** 1200px con centrado automático
- **Modal responsivo:** 600px máximo, 90% en móviles
- **Padding adaptativo:** 20px general con ajustes automáticos
- **Overflow handling:** Text-overflow ellipsis para previews

## 📂 Estructura del Proyecto

```
08-form-with-validation/
├── index.html              # Página principal
├── styles.css              # Estilos CSS
├── script.js               # Lógica JavaScript
├── screenshots/            # Capturas de pantalla
│   └── app-view.png        # Vista de la aplicación
└── README.md              # Documentación
```

## 🚀 Instalación y Uso

### Clonar el repositorio

```bash
git clone https://github.com/Zero-Fhx/08-form-with-validation.git
cd 08-form-with-validation
```

### Ejecutar el proyecto

1. **Método simple:** Abre `index.html` directamente en tu navegador
2. **Con Live Server (recomendado):**
   - Instala Live Server en VS Code
   - Click derecho en `index.html` → "Open with Live Server"
3. **Servidor local:**

   ```bash
   # Con Python 3
   python -m http.server 8000

   # Con Node.js (http-server)
   npx http-server
   ```

## ✅ Requisitos Cumplidos

Este proyecto incluye todas las características esenciales de un formulario con validación:

- [x] Formulario de contacto funcional
- [x] Validación de campos obligatorios
- [x] Validación de formato de email
- [x] Mensajes de error específicos
- [x] Feedback visual en tiempo real
- [x] Persistencia de datos
- [x] Gestión de mensajes enviados
- [x] Interfaz moderna y profesional

## 🌐 Demo en Vivo

🔗 **[Ver Demo](https://zero-fhx.github.io/08-form-with-validation/)** (GitHub Pages)

## 📸 Captura de Pantalla

![Vista de la aplicación](screenshots/app-view.png)

## 🔧 Características Técnicas Destacadas

### Validación Completa de Formulario

```javascript
function validate(name, email, message) {
  let isValid = true;

  if (name === "") {
    nameError.textContent = "El nombre es obligatorio.";
    isValid = false;
  }

  if (email === "") {
    emailError.textContent = "El correo electrónico es obligatorio.";
    isValid = false;
  } else if (!validateEmail(email)) {
    emailError.textContent = "El correo electrónico no es válido.";
    isValid = false;
  }

  if (message === "") {
    messageError.textContent = "El mensaje es obligatorio.";
    isValid = false;
  }

  return isValid;
}
```

### Validación de Email con RegEx

```javascript
function validateEmail(email) {
  const emailPattern = /^[-a-zAZ0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}
```

### Gestión de Estado de Mensajes

```javascript
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
```

### Persistencia con localStorage

```javascript
function saveMessagesToLocalStorage() {
  localStorage.setItem("messages", JSON.stringify(messages));
}

function loadMessagesFromLocalStorage() {
  const storedMessages = localStorage.getItem("messages");
  if (storedMessages) {
    messages = JSON.parse(storedMessages);
  }

  messagesId =
    Object.keys(messages).length > 0
      ? Math.max(...Object.keys(messages).map(Number))
      : 0;
}
```

### Modal con Animaciones CSS

```css
@keyframes show-dialog {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

#message-dialog {
  animation: show-dialog 0.3s ease-in-out;

  &::backdrop {
    backdrop-filter: blur(5px);
  }
}
```

### Creación Dinámica de Elementos

```javascript
function displayMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");

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
}
```

## 📋 Funcionalidades del Formulario

### Validación

- **Campos obligatorios:** Nombre, email y mensaje requeridos
- **Formato de email:** Validación con expresión regular
- **Feedback inmediato:** Errores mostrados al enviar o escribir
- **Limpieza automática:** Errores se limpian al escribir

### Gestión de Mensajes

- **Persistencia:** Mensajes guardados en localStorage
- **Estados visuales:** Diferenciación entre leídos/no leídos
- **Preview truncado:** Ellipsis para mensajes largos
- **Modal completo:** Dialog para ver mensaje completo

### Interactividad

- **Botones dinámicos:** Cambio de texto según estado
- **Eliminación:** Remover mensajes individuales
- **Marcado de lectura:** Toggle entre leído/no leído
- **Animaciones:** Transiciones suaves en todas las acciones

## 🔮 Futuras Mejoras

- [ ] **Envío real por email** con servicio backend
- [ ] **Filtros de mensajes** (leídos, no leídos, fecha)
- [ ] **Búsqueda de mensajes** con coincidencias
- [ ] **Validaciones adicionales** (longitud mínima, caracteres especiales)
- [ ] **Adjuntar archivos** con preview
- [ ] **Respuesta a mensajes** con threading
- [ ] **Exportar mensajes** a CSV/JSON
- [ ] **Notificaciones push** para nuevos mensajes
- [ ] **Modo oscuro** toggle
- [ ] **Confirmación de eliminación** con modal

## 📝 Lecciones Aprendidas

### Validación de Formularios

- **RegEx patterns** para validación de formato
- **Event handling** para feedback en tiempo real
- **State management** para control de errores
- **User experience** con mensajes claros

### DOM Manipulation

- **Creación dinámica** de elementos complejos
- **Event delegation** para elementos generados
- **Template literals** para HTML estructurado
- **Class management** para estados visuales

### Persistencia de Datos

- **localStorage** para datos complejos
- **JSON serialization** de objetos
- **State restoration** al cargar página
- **ID management** para elementos únicos

### CSS Avanzado

- **CSS Nesting** para código más limpio
- **Keyframe animations** para transiciones
- **Backdrop-filter** para efectos modernos
- **Flexbox layouts** para alineación perfecta

### UX/UI Design

- **Feedback inmediato** en todas las acciones
- **Visual hierarchy** clara en mensajes
- **Responsive design** para múltiples dispositivos
- **Accessibility** con labels y estructura semántica

## 🤝 Contribuciones

Este es un proyecto personal de aprendizaje, pero si encuentras mejoras o tienes sugerencias:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -m 'Añadir mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

## 👨‍💻 Autor

**Erick Obed Flores Ricra**

- 🐙 GitHub: [@Zero-Fhx](https://github.com/Zero-Fhx)
- 💼 LinkedIn: [Erick Obed Flores Ricra](https://www.linkedin.com/in/erick-obed-flores-ricra-14a121280)
- 📧 Email: erickflores170404@gmail.com

---

**🤖 Desarrollo Asistido por IA:** Este proyecto fue desarrollado con la asistencia de inteligencia artificial para la búsqueda de información, resolución de problemas técnicos, optimización de código, consulta de conceptos desconocidos y creación de esta documentación.
