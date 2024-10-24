const form = document.querySelector("form");
const holderName = document.querySelector("#card-holder-name"); 
const cardNumber = document.querySelector("#card-number"); 
const month = document.querySelector("#month"); 
const year = document.querySelector("#year"); 
const cvc = document.querySelector("#cvc"); 

const inputArea = document.querySelector(".input-area");
const successMessage = document.querySelector(".success-message"); 
const container = document.querySelector(".container"); 
const submitButton = document.querySelector(".submit-button"); 
const successButton = document.querySelector(".success-button");

const numberDisplay = document.querySelector(".c-number"); 
const nameDisplay = document.querySelector(".holder-name"); 
const timeDisplay = document.querySelector(".duration");
const cvcDisplay = document.querySelector(".cvc-preview");

const numberDiv = document.querySelector(".card-digits");
const nameDiv = document.querySelector(".name");
const timeDiv = document.querySelector(".time-period");
const cvcDiv = document.querySelector(".backside-code");
let newYear;
let newMonth;

class ErrorHandler { 
    constructor(input, div, name, regex) { 
      this.input = input; 
      this.div = div;
      this.name = name;
      this.regex = regex;
    }

errorMessage() { 
    let p = this.div.querySelector(".p");
if (!this.input.value) {
    if (!p) {
        p = document.createElement("p");
        p.setAttribute("class", "p")
        p.textContent = `${this.name} cannot be empty!!!`; 
        p.style.color = "red";
        this.div.appendChild(p);
    } else { 
        p.textContent = `${this.name} cannot be empty!!!`; 
        p.style.color = "red";
    }
} else { 
    if (p) {
        this.div.removeChild(p);
    }
    return;
}
}; 

typeChecker() {
    let p = this.div.querySelector(".p"); 
    if (!this.regex) {
       
        if (!p) {
            p = document.createElement("p"); 
            p.setAttribute("class", "p");
            p.style.color = "red"; 
            p.textContent = `Wrong format, ${this.name} only`;
            this.div.appendChild(p);
            return;
        } else {
            p.style.color = "red";
            p.textContent = `Wrong format, ${this.name} only`;
            return;
        } 

    }  else { 
        if (p) {
            this.div.removeChild(p);
        }
        return;
    }
}

}

cardNumber.addEventListener("input", () => { 

    const regex = /^\d*$/.test(cardNumber.value);
    const typeError = new ErrorHandler(cardNumber, numberDiv, 'number', regex);

if (!regex) {
      typeError.typeChecker();
} else {
    const formattedValue = cardNumber.value.replace(/\s/g, "");
    let firstFour = cardNumber.value.slice(0, 4) || '0000';
    let secondFour = cardNumber.value.slice(4, 8) || '0000';
    let thirdFour = cardNumber.value.slice(8, 12) || '0000';
    let lastFour = cardNumber.value.slice(12, 16) || '0000';

   numberDisplay.textContent = `${(firstFour[0] || '0')}${(firstFour[1] || '0')}${(firstFour[2] || '0')}${(firstFour[3] || '0')} ${(secondFour[0] || '0')}${(secondFour[1] || '0')}${(secondFour[2] || '0')}${(secondFour[3] || '0')} ${(thirdFour[0] || '0')}${(thirdFour[1] || '0')}${(thirdFour[2] || '0')}${(thirdFour[3] || '0')} ${(lastFour[0] || '0')}${(lastFour[1] || '0')}${(lastFour[2] || '0')}${(lastFour[3] || '0')}`;
   numberDisplay.style.color = "white";   
   typeError.typeChecker();
}
});

holderName.addEventListener("input", () => { 
   
    const regex = /^[A-Za-z\s]*$/.test(holderName.value);
      const typeError = new ErrorHandler(holderName, nameDiv, 'text', regex);
     if (!regex) {
        typeError.typeChecker();
     } else {
        nameDisplay.textContent = `${holderName.value.toUpperCase()}` || "JANE APPLESEED";
        typeError.typeChecker();
     }
}); 

month.addEventListener("input", () => { 
   if (month.value.length === 2) {
    const regex = /^[0-9]{2}$/.test(month.value);
    const typeError = new ErrorHandler(month, timeDiv, 'numbers', regex);
    typeError.typeChecker();
   }

       newMonth = month.value;
        timeDisplay.textContent = `${newMonth[0] || '0'}${newMonth[1] || 0}/${newYear || '00'}`; 
});

year.addEventListener("input", () => { 
    if (year.value.length === 2) {
        const regex = /^[0-9]{2}$/.test(year.value) && year.value.length > 0;
    const typeError = new ErrorHandler(year, timeDiv, 'numbers', regex);
    typeError.typeChecker();
    };
          newYear = year.value;
          timeDisplay.textContent = `${newMonth || '00'}/${newYear[0] || '0'}${newYear[1] || '0'}`;
})

cvc.addEventListener("input", () => { 
    if (cvc.value.length === 3) {
        const regex = /^[0-9]{3}/.test(cvc.value) && cvc.value.length > 2;
    const typeEror = new ErrorHandler(cvc, cvcDiv, 'cvc', regex);
    typeEror.typeChecker();
    };
   
        const cvc1 = cvc.value[0];
        const cvc2 = cvc.value[1]; 
        const cvc3 = cvc.value[2];

        cvcDisplay.textContent = `${cvc1 || 0}${cvc2 || 0}${cvc3 || 0}`;
});


form.addEventListener("submit", (event) => { 
    event.preventDefault(); 
    let errorFlag = false;
    
    const nameError = new ErrorHandler(holderName.value, nameDiv, 'Name');
    const numberError = new ErrorHandler(cardNumber.value, numberDiv, 'Card Number');
    const cvcError = new ErrorHandler(cvc.value, cvcDiv, 'CVC');

    if (!month.value && !year.value) {
        const monthError = new ErrorHandler(month.value, timeDiv, 'Month & Year'); 
        monthError.errorMessage(); 
        errorFlag = true;
    } else if (!month.value) { 
        const monthError = new ErrorHandler(month.value, timeDiv, 'Month'); 
        monthError.errorMessage(); 
        errorFlag = true;
    } else if (!year.value) { 
        const yearError = new ErrorHandler(year.value, timeDiv, 'Year'); 
        yearError.errorMessage(); 
        errorFlag = true;
    };

    if (!holderName.value) {
        nameError.errorMessage();
        errorFlag = true;
    }
   if (!cardNumber.value) {
    numberError.errorMessage(); 
    errorFlag = true;
   }
    if (!cvc.value) {
        cvcError.errorMessage(); 
        errorFlag = true;
    }

    if (!errorFlag) {
      submitButton.addEventListener("click", () => { 
        inputArea.style.display = "none"; 
        container.style.justifyContent = "center"; 
        container.style.alignItems = "center"; 
        successMessage.style.display = "block";
      }); 
      successButton.addEventListener("click", () => { 
              
        holderName.value = ''; 
        cardNumber.value = ''; 
        month.value = ''; 
        year.value = ''; 
        cvc.value = ''

        successMessage.style.display = "none"; 
        container.style.justifyContent = ""; 
        container.style.alignItems = ""; 
        inputArea.style.display = "flex";
      })
    }
})
