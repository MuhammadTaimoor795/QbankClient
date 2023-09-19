import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';

const DraggableCalculator = () => {
  const [visible, setVisible] = useState(false);
  const [enteredValue, setEnteredValue] = useState('');
  const [sum, setSum] = useState(0);

  const toggleCalculator = () => {
    setVisible(!visible);
    // setEnteredValue('');
    // setSum(0);
  };

  const handleButtonClick = (value) => {
    const updatedValue = enteredValue + value;
    const maxLength = 12; // Define the maximum length for the entered value

    if (updatedValue.length <= maxLength) {
      setEnteredValue(updatedValue);
    }
  };

  const handleClear = () => {
    setEnteredValue('');
    setSum(0);
  };

  const handleEqual = () => {
    try {
      const result = eval(enteredValue);
      const numberString = result.toString(); // Convert the result to a string

      const firstEleven = numberString.slice(0, 12); // Extract the first 11 characters using the slice method
      const firstElevenNumber = +firstEleven;
      setSum(firstElevenNumber);
    } catch (error) {
      setSum('Error');
    }
  };

  const handleKeyDown = (event) => {
    const { key } = event;

    // Check if the key pressed is a number or an operator
    if (/^[0-9]$/.test(key) || ['+', '-', '*', '/', '(', ')'].includes(key)) {
      event.preventDefault(); // Prevent the default behavior of the key event
      handleButtonClick(key);
    } else if (key === 'Enter') {
      handleEqual();
    } else if (key === 'Backspace') {
      handleClear();
    }
  };


useEffect(() => {
  // Add touch event listeners
  const buttons = document.querySelectorAll('.calculator-button');
  buttons.forEach((button) => {
    button.addEventListener('touchend', (e) => {
      e.preventDefault();
      const value = e.target.textContent;

      // Determine the action based on the button value
      switch (value) {
        case 'C':
          handleClear();
          break;
        case '(':
        case ')':
        case '/':
        case '7':
        case '8':
        case '9':
        case '*':
        case '4':
        case '5':
        case '6':
        case '-':
        case '1':
        case '2':
        case '3':
        case '+':
        case '0':
        case '.':
          handleButtonClick(value);
          break;
        case '=':
          handleEqual();
          break;
        // Add additional cases for other buttons as needed
        default:
          break;
      }
    });
  });
}, []);

  

  return (
    <div
      className="relative"
      style={{ display: 'inline-block' }}
      onKeyDown={handleKeyDown}
      tabIndex={0} // Enable keyboard focus on the container
    >
      <span onClick={toggleCalculator} style={{ cursor: 'pointer' }}>
        Calculator
      </span>
      {visible && (
        // <Draggable handle=".calculator-header">
          <div className="fixed" style={{ zIndex: 9999999, right: 0, top: 200 }}>
            <div className="calculator-header">
              <div className="flex justify-center items-center">
                <div className="w-64 h-auto bg-white rounded-2xl shadow-xl border-4 border-gray-100 select-none">
                  <button
                    style={{ color: 'black' }}
                    className="mt-3 ml-3"
                    onClick={toggleCalculator}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 11.414L15.657 17.071a2 2 0 102.828-2.828L12.828 8l5.657-5.657a2 2 0 10-2.828-2.828L10 5.172 4.343.515a2 2 0 10-2.828 2.828L7.172 8 .515 14.657a2 2 0 102.828 2.828L10 11.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div className="w-auto m-3 text-right space-y-2 py-2">
                    {enteredValue && <div className="text-gray-700">{enteredValue}</div>}
                    <div className="text-black font-bold text-3xl">{sum}</div>
                  </div>
                  <div className="w-auto m-1 h-auto mb-2">
                    <div className="m-2 flex justify-between">
                      <div
                        className="calculator-button btn-yellow"
                        style={{ cursor: 'pointer' }}
                        onClick={handleClear}
                      >
                        C
                      </div>
                      <div
                        className="calculator-button btn-grey"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleButtonClick('(')}
                      >
                        (
                      </div>
                      <div
                        className="calculator-button btn-grey"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleButtonClick(')')}
                      >
                        )
                      </div>
                      <div
                        className="calculator-button btn-orange"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleButtonClick('/')}
                      >
                        /
                      </div>
                    </div>
                    <div className="m-2 flex justify-between">
                      <div
                        className="calculator-button btn-grey"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleButtonClick('7')}
                      >
                        7
                      </div>
                      <div
                        className="calculator-button btn-grey"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleButtonClick('8')}
                      >
                        8
                      </div>
                      <div
                        className="calculator-button btn-grey"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleButtonClick('9')}
                      >
                        9
                      </div>
                      <div
                        className="calculator-button btn-orange"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleButtonClick('*')}
                      >
                        x
                      </div>
                    </div>
                    <div className="m-2 flex justify-between">
                      <div
                        className="calculator-button btn-grey"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleButtonClick('4')}
                      >
                        4
                      </div>
                      <div
                        className="calculator-button btn-grey"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleButtonClick('5')}
                      >
                        5
                      </div>
                      <div
                        className="calculator-button btn-grey"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleButtonClick('6')}
                      >
                        6
                      </div>
                      <div
                        className="calculator-button btn-orange"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleButtonClick('-')}
                      >
                        -
                      </div>
                    </div>
                    <div className="m-2 flex justify-between">
                      <div
                        className="calculator-button btn-grey"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleButtonClick('1')}
                      >
                        1
                      </div>
                      <div
                        className="calculator-button btn-grey"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleButtonClick('2')}
                      >
                        2
                      </div>
                      <div
                        className="calculator-button btn-grey"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleButtonClick('3')}
                      >
                        3
                      </div>
                      <div
                        className="calculator-button btn-orange"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleButtonClick('+')}
                      >
                        +
                      </div>
                    </div>
                    <div className="m-2 flex justify-between">
                      <div
                        className="calculator-button btn-grey-jumbo"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleButtonClick('0')}
                      >
                        0
                      </div>
                      <div className="flex w-full ml-3 justify-between">
                        <div
                          className="calculator-button btn-grey"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleButtonClick('.')}
                        >
                          .
                        </div>
                        <div
                          className="calculator-button btn-green"
                          style={{ cursor: 'pointer' }}
                          onClick={handleEqual}
                        >
                          =
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center mt-5">
                      <div className="w-20 h-1 bg-gray-100 rounded-l-xl rounded-r-xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        // {/* </Draggable> */}
      )}
    </div>
  );
};

export default DraggableCalculator;
