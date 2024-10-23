const form = document.querySelector("form");
const holderName = document.querySelector("#card-holder-name"); 
const cardNumber = document.querySelector("#card-number"); 
const month = document.querySelector("#month"); 
const year = document.querySelector("#year"); 
const cvc = document.querySelector("#cvc"); 

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
    constructor(input, div, name) { 
      this.input = input; 
      this.div = div;
      this.name = name;
    }

errorMessage() { 
    let p = this.div.querySelector(".p");
if (!this.input.value) {
    if (!p) {
        this.errorFlag = false;
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
        this.div.querySelector.remove(p);
        return;
    }
}
}; 

}

cardNumber.addEventListener("input", () => { 
   let p;
   if (!/^\d*$/.test(cardNumber.value)) { 
    p = numberDiv.querySelector("p");
    if (!p) { 
        p = document.createElement("p");
        p.textContent = "Wrong format, numbers only";
        p.style.color = "red";
        numberDiv.appendChild(p);
    } else {
        p.textContent = "Wrong format, numbers only";
        p.style.color = "red";
    }
   } else { 
      const formattedValue = cardNumber.value.replace(/\s/g, "");
    let firstFour = cardNumber.value.slice(0, 4) || '0000';
    let secondFour = cardNumber.value.slice(4, 8) || '0000';
    let thirdFour = cardNumber.value.slice(8, 12) || '0000';
    let lastFour = cardNumber.value.slice(12, 16) || '0000';

    numberDisplay.textContent = `${(firstFour[0] || '0')}${(firstFour[1] || '0')}${(firstFour[2] || '0')}${(firstFour[3] || '0')} ${(secondFour[0] || '0')}${(secondFour[1] || '0')}${(secondFour[2] || '0')}${(secondFour[3] || '0')} ${(thirdFour[0] || '0')}${(thirdFour[1] || '0')}${(thirdFour[2] || '0')}${(thirdFour[3] || '0')} ${(lastFour[0] || '0')}${(lastFour[1] || '0')}${(lastFour[2] || '0')}${(lastFour[3] || '0')}`;
    numberDisplay.style.color = "white";

    p = numberDiv.querySelector("p");
    if (p) { 
        numberDiv.removeChild(p);
    }
   }
});

holderName.addEventListener("input", () => { 
    let p;
    if (!/^[A-Za-z\s]*$/.test(holderName.value)) {
        p = nameDiv.querySelector("p");
        if (!p) { 
            p = document.createElement("p");
        p.textContent = "Wrong format, text only";
        p.style.color = "red";
        nameDiv.appendChild(p);
        } else { 
            p.textContent = "Wrong format, text only";
            p.style.color = "red";
        }
    } else { 
        nameDisplay.textContent = `${holderName.value.toUpperCase()}` || "JANE APPLESEED";

        p = nameDiv.querySelector("p");
        if (p) { 
            nameDiv.removeChild(p);
        }
    };
}); 

month.addEventListener("input", () => { 
    let p;

    if (!/^[0-9]{2}$/.test(month.value) && month.value.length > 1) { 
        p = timeDiv.querySelector("p");
        if (!p) { 
            p = document.createElement("p");
            p.textContent = "Wrong format, numbers only";
            p.style.color = "red";
            timeDiv.appendChild(p);
        } else { 
            p.textContent = "Wrong format, numbers only";
            p.style.color = "red";
        }
    } else { 
       newMonth = month.value;

        timeDisplay.textContent = `${newMonth[0] || '0'}${newMonth[1] || 0}/${newYear || '00'}`; 

       p = timeDiv.querySelector("p"); 
        if (p) { 
            timeDiv.removeChild(p);
        }
    }
}) 

year.addEventListener("input", () => { 
    let p;
    if (!/^[0-9]{2}$/.test(year.value) && year.value.length > 1) {
        if (!p) { 
            p = document.createElement("p");
            p.textContent = "Wrong format, numbers only";
            p.style.color = "red";
            timeDiv.appendChild(p);
        } else { 
            p.textContent = "Wrong format, numbers only";
            p.style.color = "red";
        }
    } else {

          newYear = year.value;
          timeDisplay.textContent = `${newMonth || '00'}/${newYear[0] || '0'}${newYear[1] || '0'}`;

        p = timeDiv.querySelector("p"); 
        if (p) { 
            timeDiv.removeChild(p);
        }
    }
})

cvc.addEventListener("input", () => { 
    let p;
    if (!/^[0-9]{3}/.test(cvc.value) && cvc.value.length > 2) {
        if (!p) { 
            p = document.createElement("p");
            p.textContent = "Wrong format, numbers only";
            p.style.color = "red";
            cvcDiv.appendChild(p);
        } else { 
            p.textContent = "Wrong format, numbers only";
            p.style.color = "red";
        }
    } else { 
        const cvc1 = cvc.value[0];
        const cvc2 = cvc.value[1]; 
        const cvc3 = cvc.value[2];

        cvcDisplay.textContent = `${cvc1 || 0}${cvc2 || 0}${cvc3 || 0}`;
    }
});


form.addEventListener("submit", (event) => { 
    event.preventDefault(); 
    let p = false;
    const nameError = new ErrorHandler(holderName.value, nameDiv, 'Name');
    const numberError = new ErrorHandler(cardNumber.value, numberDiv, 'Card Number');
    const cvcError = new ErrorHandler(cvc.value, cvcDiv, 'CVC');

    if (!month.value && !year.value) {
        const monthError = new ErrorHandler(month.value, timeDiv, 'Month & Year'); 
        monthError.errorMessage(); 
    } else if (!month.value) { 
        const monthError = new ErrorHandler(month.value, timeDiv, 'Month'); 
        monthError.errorMessage(); 
    } else if (!year.value) { 
        const yearError = new ErrorHandler(year.value, timeDiv, 'Year'); 
        yearError.errorMessage(); 
    };

    if (!holderName.value) {
        nameError.errorMessage();
    }
   if (!cardNumber.value) {
    numberError.errorMessage(); 
   }
    if (!cvc.value) {
        cvcError.errorMessage();
    }
})
