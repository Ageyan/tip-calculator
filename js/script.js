// Отримання доступу до елементів форми 
const calculateButton = document.getElementById('calculate'); 
const tipAmountText = document.getElementById('tip-amount'); // загальна сума чайових
const totalPerPersonText = document.getElementById('total-per-person'); //загальна сума до сплати на 1 особу
const billAmountInput = document.getElementById('bill-amount'); // сума чеку 
const numberOfPeopleInput = document.getElementById('number-of-people'); // кількість осіб

// функція яка активується за подією click по елементу calculate
calculateButton.addEventListener('click', function () {
    const originalBillAmount = Number(billAmountInput.value); //запис значення поточної суми
    const numberOfPeople = Number(numberOfPeopleInput.value); //запис поточної кількості осіб

    const selectedRadioTip = document.querySelector('input[name="tip"]:checked'); //доступ до обраного відсотка чайових

    //const tipPercentage = selectedRadioTip.value.slice(0, -1); //надає рядок, slice для відкидання сиволу % у полі value 
    const tipPercentage = Number(selectedRadioTip.value.slice(0, -1)) / 100; // тепер надає рядок зі значенням, слайс відкидає %, number переводить рядок до числа, а /100 призводить до подальшого моження на відсотки від сумми

    // const totalTip = originalBillAmount * tipPercentage; // визначення суми згідно обранного відсотку чайових, але із за JS після коми буде повний хаос
    const totalTip = Math.round(originalBillAmount * tipPercentage * 100) / 100; //math.round округлємо , а множ і діл на 100 задля обходу JS

    //Визначення загальної сумми до сплати (чек + обраховані вище чайові)
    const totalBill = originalBillAmount + totalTip;

    // const perPerson = totalBill / numberOfPeople; // визначення сумми на 1 людину 
    const perPerson = Math.round(totalBill / numberOfPeople * 100) / 100; //те саме тільки для гарних показників

    // Додавання у форму обрахованих даних
    //tipAmountText.innerText = totalTip;
    tipAmountText.innerText = formatPrice(totalTip);
    //totalPerPersonText.innerText = perPerson;
    totalPerPersonText.innerText = formatPrice(perPerson);
});


//Функція , щоб було завждипо 2 символи у значення (не 3.56 а 03.56)
const formatPrice = (price) => {
    let retVal = price.toString();
    const parts = retVal.split('.');
    if (parts[0].length === 1) {
        retVal = "0" + retVal;
    }
    if (parts[1].length === 1) {
        retVal += "0";
    }
    return retVal;
};