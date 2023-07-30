// Calculator by M8X

import prompts = require("prompts")

let numbers: number[] = []
let operations: string[] = []

const inputNormal: string = "Enter an expression.\n'clean' for clear all inputs\n'reset' to reset the result: "
const inputCleanOrReset: string = "Enter an expression: "

function parseExp(input: string): void {
    for (let i = 0; i < input.length; i++) {
        let char = input[i]
        if (char === "+" || char === "-" || char === "*" || char === "/") {
            operations.push(char)
        } else if (char >= "0" && char <= "9") {
            numbers.push(parseInt(char))
        } else {
            throw new Error("Invalid input")
        }
    }
}

function calculate(numbers: number[], operations: string[]): number {
    let result = numbers[0];
  
    for (let i = 1; i < numbers.length; i++) {
      const operation = operations[i - 1];
      const number = numbers[i];
  
      switch (operation) {
        case "+":
          result += number;
          break;
        case "-":
          result -= number;
          break;
        case "*":
          result *= number;
          break;
        case "/":
          result /= number;
          break;
        default:
          throw new Error("Invalid operation");
      }
    }
  
    return result;
  }
  

(async () => {
    let result = 0
    let isResetOrClean: boolean = false

    while (true) {
        let response: any
        if (!isResetOrClean) {
            response = await prompts({
                type: "text",
                name: "exp",
                message: inputNormal
            })} else {
                response = await prompts({
                    type: "text",
                    name: "exp",
                    message: inputCleanOrReset
                })
            }

        switch (response.exp.toLowerCase()) {
            case "clean":
                isResetOrClean = true
                console.clear()
                break

            case 'reset':
                isResetOrClean = true
                result = 0
                numbers = []
                operations = []
                break

            default:
                parseExp(response.exp)
                result = calculate(numbers, operations)
                console.log(result + "\n")
                break
        }
    }

})()
