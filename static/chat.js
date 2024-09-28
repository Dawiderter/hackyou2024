const socket = new WebSocket("/chat");

const textArea = document.getElementById("chat_area");
const submitButton = document.getElementById("send_button");
const textInput = document.getElementById("text_input");

socket.addEventListener("open", (event) => {
    console.log("Connected");
});

socket.addEventListener("message", (event) => {
    console.log(event.data);

    const newP = document.createElement("p");
    newP.innerText = event.data;
    textArea.appendChild(newP);
    textArea.scrollTop = textArea.scrollHeight;
    //textArea.textContent += event.data + "\r\n";
});

submitButton.addEventListener("click", (event) => {
    const input = textInput.value;
    textInput.value = "";
    socket.send(input);
});

textInput.addEventListener("keyup", (event) => {
    if (event.code === "Enter") {
        const input = textInput.value;
        textInput.value = "";
        socket.send(input);
    }
});
