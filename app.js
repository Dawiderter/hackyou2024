import { serveDir } from "@std/http/file-server";

const STATIC_PATH = "./static";

const socketArray = []

const chatSocketHandler = async (req) => {
    const { socket, response } = Deno.upgradeWebSocket(req);
    
    const number = socketArray.length
    socketArray.push(socket)

    socket.addEventListener("open", () => {
        console.log("a client " + number + " connected!");
    });
    
    socket.addEventListener("message", (event) => {
        for (let i = 0; i < socketArray.length; i++) {
            const sock = socketArray[i];
            if (sock != null) {
                console.log("sending to " + i)
                sock.send(number + ": " + event.data)
            }
        }
    });

    socket.addEventListener("close", (event) => {
        console.log("a client " + number + " disconnected!");
        socketArray[number] = null
    })
    
    return response;
}

/**
 * 
 * @param {Request} req 
 * @returns 
 */
const handler = async (req) => {
    const url = new URL(req.url)

    if (url.pathname == "/chat" && req.headers.get("upgrade") == "websocket") {
        return chatSocketHandler(req);
    }

    return serveDir(req, {
        fsRoot: STATIC_PATH,
    });
};

Deno.serve(handler);
