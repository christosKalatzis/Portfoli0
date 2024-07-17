document.addEventListener('DOMContentLoaded', () => {
  showOutput();
  document.querySelector('.reset').addEventListener('click', resetOutput);
  doTheMath();
  handleKeyboardInput();
});

let numbers = "";
let calculationDone = false;

// Function to handle button clicks and display output
function showOutput() {
  document.querySelectorAll('.buttons').forEach(button => {
    if (!button.classList.contains('reset') && !button.classList.contains('equals') && !button.classList.contains('backspace')) {
      button.addEventListener('click', () => {
        let buttonValue = button.textContent;

        // If the last action was a calculation and zero is pressed, reset the output
        if (calculationDone && buttonValue === "0") {
          resetOutput();
          return;
        }

        // Update the numbers string and display it on the screen
        numbers += buttonValue;
        document.querySelector('.result span').textContent = numbers;
        calculationDone = false;
      });
    }
  });

  // Add event listener for the backspace button
  document.querySelector('.backspace').addEventListener('click', backspace);
}

// Function to reset the output display and numbers string
function resetOutput() {
  console.log("Reset button clicked.");
  document.querySelector('.result span').textContent = "0";
  numbers = "";
  calculationDone = false;
}

// Function to perform the calculation when equals button is clicked
function doTheMath() {
  document.querySelector('.equals').addEventListener('click', () => {
    let result;
    try {
      // Use Function constructor to safely evaluate the expression
      result = new Function(`return ${numbers}`)();
      if (isNaN(result) || !isFinite(result)) {
        throw new Error('Invalid calculation');
      }
      document.querySelector('.result span').textContent = result;
      console.log("Result:", result);
      numbers = String(result);
      calculationDone = true;
    } catch (error) {
      console.error('Error');
      document.querySelector('.result span').textContent = "Error";
      numbers = "";
    }
  });
  percent();
}

// Function to calculate the percentage
function percent() {
  document.querySelector('.percent').addEventListener('click', () => {
    let buttonValue = numbers.trim();
    let parsedNumber = parseFloat(buttonValue);

    if (isNaN(parsedNumber)) {
      console.error('Invalid number:', buttonValue);
      return;
    }

    // Calculate the percentage and update the display
    let result = parsedNumber / 100;
    document.querySelector('.result span').textContent = result;
    numbers = String(result);
  });
}

// Function to handle keyboard input
function handleKeyboardInput() {
  document.addEventListener('keydown', (event) => {
    const key = event.key;

    // Allow numeric keys, operators, and Enter key
    if (/\d/.test(key) || ['+', '-', '*', '/'].includes(key)) {
      if (calculationDone && key === "0") {
        resetOutput();
        return;
      }

      // Append the key to the numbers string and update the display
      numbers += key;
      document.querySelector('.result span').textContent = numbers;
      calculationDone = false;
    } else if (key === 'Enter') {
      document.querySelector('.equals').click();
    } else if (key === 'Escape') {
      resetOutput();
    } else if (key === '%') {
      document.querySelector('.percent').click();
    } else if (key === 'Backspace') {
      backspace();
    }
  });
}

// Function to handle backspace action
function backspace() {
  if (numbers.length > 0) {
    numbers = numbers.slice(0, -1);
    if (numbers === "") {
      document.querySelector('.result span').textContent = "0";
    } else {
      document.querySelector('.result span').textContent = numbers;
    }
  }
}
