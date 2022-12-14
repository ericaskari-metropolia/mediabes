const template = `
    <div class='modal-card-content'>
        <h5 class='var--modal-card-title'>Purchase confirmation</h5>
        <div><hr></div>
        <p class='var--modal-card-message'></p>
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

    const messageCard = document.createElement('div');
    messageCard.innerHTML = template;
    messageCard.classList.add('app-modal-card');
    parent.classList.add('app-modals-no-click');

    const elements = {
        yesButton: card.querySelector('.var--modal-card-button-yes'),
        noButton: card.querySelector('.var--modal-card-button-no'),
        title: card.querySelector('.var--modal-card-title'),
        message: card.querySelector('.var--modal-card-message')
    };
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

        elements.title.innerText = 'Purchase Confirmation';
        elements.message.innerHTML = `Are you sure you want to buy this design from <b class='var--name'>XXX</b> that costs <b class='var--price'>PRICE</b> ?`;
        elements.yesButton.innerHTML = 'Yes';
        const nameEl = card.querySelector('.var--name');
        const priceEl = card.querySelector('.var--price');

        nameEl.innerText = name;
        priceEl.innerText = price;
        parent.appendChild(card);

        const response = await waitForClick();
        parent.replaceChildren();
        parent.classList.add('app-modals-no-click');

        return response;
    };

    const showMessageModal = async (title, message) => {
        parent.classList.remove('app-modals-no-click');

        elements.title.innerText = title;
        elements.message.innerText = message;
        elements.yesButton.innerHTML = 'Close';
        elements.noButton.hidden = true;
        parent.appendChild(card);

        const response = await waitForClick();

        elements.noButton.hidden = false;
        parent.replaceChildren();
        parent.classList.add('app-modals-no-click');

        return response;
    };

    return { showPurchaseConfirmation, showMessageModal };
};
