export const currentInput = {
    goingLeft : false,
    goingRight : false,
    goingUp: false,
    goingDown: false,
}

export function initInputCapture(on) {
    on.addEventListener("keydown", (event) => {
        turn(event.code, true)
    });
    on.addEventListener("keyup", (event) => {
        turn(event.code, false)
    });
}

function turn(key, state) {
    switch (key) {
        case "KeyW": {
            currentInput.goingUp = state
            break;
        }
        case "KeyS": {
            currentInput.goingDown = state
            break;
        }
        case "KeyA": {
            currentInput.goingLeft = state
            break;
        }
        case "KeyD": {
            currentInput.goingRight = state
            break;
        }
        default:
            break;
    }
}