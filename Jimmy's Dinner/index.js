import { menuArray, yourOrderArray } from './data.js'

function getMenuHTML() {
    let menuHTML = ``
    menuArray.forEach(function (dish) {
        menuHTML +=
            `
        <div class='dish-container'>
            <div class='dish-description'>
                <P class='dish-emoji'>${dish.emoji}</P>
                <div class='dish-description-text'>
                    <h3>${dish.name}</h3>
                    <p>${dish.ingredients}</p>
                    <h4>$${dish.price}</h4>
                </div>
            </div>
            <div class='dish-button-container'>
                <button class='dish-button' data-dish="${dish.id}">+</button>
            </div>
        </div>
        `

    })

    return menuHTML
}


function render() {
    document.getElementById('menu-container').innerHTML = getMenuHTML()
}

function handleAddDishButton(dishId) {
    const targetDish = menuArray.filter(function (dish) {
        return dishId === dish.id
    })[0]
    targetDish.timesAdded++
    if (!yourOrderArray.includes(targetDish)) {
        yourOrderArray.push(targetDish)
    }
    return yourOrderArray
}

function handleCompleteOrderBtn() {
    document.getElementById("payment-container").classList.remove('hidden')
    document.getElementById("main-container").classList.add('shaded')
}

document.addEventListener('click', function (e) {
    let totalPrice = 0
    if (e.target.dataset.dish) {
        let pricingHTML = ``
        handleAddDishButton(e.target.dataset.dish).forEach(function (orderItem) {
            totalPrice = orderItem.price * orderItem.timesAdded + totalPrice
            pricingHTML += `<div class='yourOrder-item-price'><span>${orderItem.name}</span><span><span id="dish-times-added" class="">${orderItem.timesAdded} x </span> $${orderItem.price}</span></div>`
        })

        let yourOrderHTML = `
        <h3>Your order</h3>
        <div class='your-order-item-price-container'>${pricingHTML}</div>
        <div class='total-price-container'><span>Total price</span><span>$${totalPrice}</span></div>
        <button data-btn="complete-btn" class='complete-order-button'>Complete order</button>
    `

        document.getElementById('your-order-container').innerHTML = yourOrderHTML
        document.getElementById('your-order-container').classList.remove('hidden')
    }
    if (e.target.dataset.btn) {
        handleCompleteOrderBtn()
    }
})

function getFinalMessageHTML() {
    const userName = document.getElementById('user-name').value
    return `<p>Thanks, ${userName}! Your order is on its way!</P>`
}

document.getElementById('payment-input').addEventListener('submit', function (e) {
    e.preventDefault()
    document.getElementById("payment-container").classList.add('hidden')
    document.getElementById("your-order-container").classList.add('hidden')
    document.getElementById("main-container").classList.remove('shaded')
    document.getElementById('final-message').innerHTML = getFinalMessageHTML()
    document.getElementById('final-message').classList.remove('hidden')
    document.getElementById('final-message').classList.remove('hide')
    setTimeout(function () {
        document.getElementById('final-message').classList.add('hide')
    }, 2000)
})

render()
