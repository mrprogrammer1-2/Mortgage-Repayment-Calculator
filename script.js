const defaultText = document.getElementById("default-text")
const calculationContainer = document.getElementById("calculation-container")


document.querySelectorAll(".mortgage-type").forEach(input=> {
    input.addEventListener("change", function() {
        document.querySelectorAll(".radio-inputs").forEach(el=> {
            el.classList.remove("selected")
        })

        if (this.checked) {
            this.parentElement.classList.add("selected")
        }
    })
})


document.getElementById("calculate-btn").addEventListener("click", ()=> {
    const amount = document.getElementById("mortgage-amount").value;
    const term = document.getElementById("mortgage-term").value;
    const rate = document.getElementById("mortgage-rate").value / 100;
    const mortgageType = document.querySelector("input[name=mortgage-type]:checked");

    let isValid = true;

    document.querySelectorAll(".form-alert").forEach(alert=> {
        alert.style.display = "none"
    })

    document.querySelectorAll(".form-flex").forEach(e=> {
        e.classList.remove("error")
    })

    if (isNaN(amount) || amount <= 0) {
        document.getElementById("amount-alert").style.display = "block"
        document.getElementById("mortgage-amount-main").classList.add("error")
        isValid = false
    } else {
        document.getElementById("amount-alert").style.display = "none"
    }

    if (isNaN(term) || term <= 0) {
        document.getElementById("term-alert").style.display = "block"
        document.getElementById("mortgage-term-main").classList.add("error")
        isValid = false
    } else {
        document.getElementById("term-alert").style.display = "none"
    }

    if (isNaN(rate) || rate <= 0) {
        document.getElementById("rate-alert").style.display = "block"
        document.getElementById("mortgage-rate-main").classList.add("error")
        isValid = false
    } else {
        document.getElementById("rate-alert").style.display = "none"
    }

    if (!mortgageType) {
        document.getElementById("type-alert").style.display = "block";
        document.querySelectorAll(".radio-inputs").forEach(e=> {
            e.classList.add("error")
        })
        isValid = false
    } else {
        document.getElementById("type-alert").style.display = "none";
        document.querySelectorAll(".radio-inputs").forEach(e=> {
            e.classList.remove("error")
        })
    }

    if (isValid) {
        let monthlyPayment = 0;
        let totalRepayment = 0;

        defaultText.classList.add("hide")
        calculationContainer.classList.add("show")

        if (mortgageType.value == "repayment") {
            const monthlyRate = rate / 12;
            const n = term * 12

            monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n))
            totalRepayment = n * monthlyPayment;
        } else if (mortgageType.value == "interest-only") {
            monthlyPayment = (amount * rate) / 12
            totalRepayment = monthlyPayment * term * 12
        }

        document.getElementById("monthly-repayment").innerText = `€ ${monthlyPayment.toFixed(2)}`
        document.getElementById("term-result").innerText = `€ ${totalRepayment.toFixed(2)}`
    } else {
        defaultText.classList.remove("hide")
        calculationContainer.classList.remove("show")

        document.getElementById("monthly-repayment").innerText = ''
        document.getElementById("term-result").innerText = ''
    }
})


document.getElementById("clear-all").addEventListener("click", ()=> {
    document.getElementById("mortgage-form").reset();

    document.getElementById("monthly-repayment").innerText = ''
    document.getElementById("term-result").innerText = ''
    document.querySelectorAll(".radio-inputs").forEach(e=> {
        e.classList.remove("selected")
    })

    defaultText.classList.remove("hide");
    calculationContainer.classList.remove("show");

    document.querySelectorAll(".form-alert").forEach(alert=> {
        alert.style.display = "none"
    })
    document.querySelectorAll(".form-flex").forEach(el=> {
        el.classList.remove("error")
    })
})