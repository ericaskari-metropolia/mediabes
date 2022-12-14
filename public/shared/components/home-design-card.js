const template = `
    <div class='design-card-profile'>
        <a class='var--profile-link' href='/profile'>
            <img class='var--home-design-card-img-profile-source design-card-profile-image' src='/profile.png' alt='Profile picture' />
        </a>
        <div class='design-card-profile-info-wrap'>
            <b class='var--home-design-card-name'>SomeOne</b>
            <small><b class='var--home-design-card-username'>@username</b></small>
        </div>
    </div>

    <div class='design-card-image-wrap'>
        <img class='var--home-design-card-img-source design-card-image' src='/sample-images/flowers.jpg' alt='Flowers' />
    </div>

    <div class='design-card-panel-text'>
        <span class='var-home-design-card-description'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad corporis eligendi est
        non quasi quos voluptatem. Dolor harum pariatur suscipit.</span>
    </div>

    <div class='design-card-panel'>
        <div class='design-card-panel-likes'>
            <div>
                <button class='var--heart-button design-card-icon-button'>
                    <span><svg ><use xlink:href="/solid.svg#heart"></use></svg></span>
                    <span hidden><svg ><use xlink:href="/regular.svg#heart"></use></svg></span>
                </button>
                <small><b class='var--like-heart-count'>1000</b></small>
            </div>
        </div>
        <div class='design-card-panel-buy'>
            <div>
                <small><b class='var--price'>1000</b></small>
                <i class='fa fa-solid fa-euro-sign'></i>
            </div>
            <button class='var--buy-button'>
                <i class='fa-solid fa-cart-shopping'></i> <small><b>BUY</b></small>
            </button>
        </div>
    </div>
`;

export const HomeDesignCardBuilder = ({
    userId,
    name,
    description,
    username,
    imgProfileSource,
    imgSource,
    price,
    likeCount,
    isLiked,
    hideBuyButton,
    onImgClick,
    onBuyClick,
    onHeartClick
}) => {
    const card = document.createElement('div');
    card.innerHTML = template;
    card.classList.add('design-card');

    const elements = {
        heartButton: card.querySelector(`.var--heart-button`),
        buyButton: card.querySelector(`.var--buy-button`),
        price: card.querySelector(`.var--price`),
        name: card.querySelector(`.var--home-design-card-name`),
        username: card.querySelector(`.var--home-design-card-username`),
        imgSource: card.querySelector(`.var--home-design-card-img-source`),
        imgProfileSource: card.querySelector(`.var--home-design-card-img-profile-source`),
        likeHeartIconSvg: card.querySelector(`.var--like-heart-icon`),
        likeHeartCount: card.querySelector(`.var--like-heart-count`),
        profileLink: card.querySelector(`.var--profile-link`),
        description: card.querySelector(`.var-home-design-card-description`)
    };

    elements.price.innerText = price;
    elements.name.innerText = name;
    elements.description.innerText = description;
    elements.username.innerText = username;
    elements.profileLink.setAttribute('href', `/profile/?id=${userId}`);
    elements.imgSource.setAttribute('src', imgSource);
    if (imgProfileSource) {
        elements.imgProfileSource.setAttribute('src', imgProfileSource);
    }
    elements.buyButton.hidden = hideBuyButton;

    const updateLikeUI = (isLiked) => {
        const heartButton = card.querySelector(`.var--heart-button`);
        const [solid, regular] = heartButton.children;
        solid.hidden = !isLiked;
        regular.hidden = isLiked;
    };

    updateLikeUI(isLiked);
    elements.likeHeartCount.innerText = likeCount;

    elements.heartButton.addEventListener('click', async () => {
        elements.heartButton.disabled = true;
        const { isLiked, likeCount } = await onHeartClick();
        updateLikeUI(isLiked);
        elements.likeHeartCount.innerText = likeCount;

        elements.heartButton.disabled = false;
    });

    elements.buyButton.addEventListener('click', async () => {
        const succeeded = await onBuyClick();
        elements.buyButton.hidden = !!succeeded;
    });
    elements.imgSource.addEventListener('dblclick', () => {
        onHeartClick();
    });

    elements.imgSource.addEventListener('click', () => {
        onImgClick();
    });

    return card;
};
