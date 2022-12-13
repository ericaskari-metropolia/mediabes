const template = `
    <div class='modal-card-content'>
        <h5>Purchase confirmation</h5>
        <div><hr></div>
        <p>Are you sure you want to buy this design from <b class='var--name'>XXX</b> that costs <b class='var--price'>PRICE</b> ?</p>
        <div class='modal-card-content-actions'>
            <button class='var--modal-card-button-no app-form-action-outline-button'>No</button>
            <button class='var--modal-card-button-yes app-form-action-button'>Yes</button>
        </div>
    </div>
`;

export const ModalBuilder = (parent) => {
    const card = document.createElement('div');
    card.innerHTML = template;
    card.classList.add('app-modal-card');
    parent.classList.add('app-modals-no-click');

    const elements = {
        yesButton: card.querySelector('.var--modal-card-button-yes'),
        noButton: card.querySelector('.var--modal-card-button-no'),
        name: card.querySelector('.var--name'),
        price: card.querySelector('.var--price')
    };
    console.log(elements);
    const waitForClick = () => {
        return new Promise((resolve) => {
            elements.noButton.onclick = () => {
                resolve(false);
            };
            elements.yesButton.onclick = () => {
                resolve(true);
            };
        });
    };

    const showPurchaseConfirmation = async (name, price) => {
        parent.classList.remove('app-modals-no-click');

        elements.name.innerText = name;
        elements.price.innerText = price;
        parent.appendChild(card);

        const response = await waitForClick();
        parent.replaceChildren();
        parent.classList.add('app-modals-no-click');

        return response;
    };

    return { showPurchaseConfirmation };
};
