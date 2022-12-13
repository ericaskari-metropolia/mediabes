const template = `
    <div class='design-card-profile'>
        <div>
            <img class='var--home-design-card-img-profile-source design-card-profile-image' src='/sample-images/horse.jpg' alt='Profile picture' />
        </div>
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
                <button class='var--comment-button design-card-icon-button'>
                    <i class='fa fa-regular fa-message'></i>

                </button>
            </div>
            <div>
                <button class='var--heart-button design-card-icon-button'>
                    <i class='var--like-heart-icon fa fa-solid fa-heart'></i>
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
    name,
    description,
    username,
    imgProfileSource,
    imgSource,
    price,
    likeCount,
    isLiked,
    onBuyClick,
    onHeartClick,
    onCommentClick
}) => {
    const card = document.createElement('div');
    card.innerHTML = template;
    card.classList.add('design-card');

    const elements = {
        commentButton: card.querySelector(`.var--comment-button`),
        heartButton: card.querySelector(`.var--heart-button`),
        buyButton: card.querySelector(`.var--buy-button`),
        price: card.querySelector(`.var--price`),
        name: card.querySelector(`.var--home-design-card-name`),
        username: card.querySelector(`.var--home-design-card-username`),
        imgSource: card.querySelector(`.var--home-design-card-img-source`),
        imgProfileSource: card.querySelector(`.var--home-design-card-img-profile-source`),
        likeHeartIconSvg: card.querySelector(`.var--like-heart-icon`),
        likeHeartCount: card.querySelector(`.var--like-heart-count`),
        description: card.querySelector(`.var-home-design-card-description`)
    };

    elements.price.innerText = price;
    elements.name.innerText = name;
    elements.description.innerText = description;
    elements.username.innerText = username;
    elements.imgSource.setAttribute('src', imgSource);
    elements.imgProfileSource.setAttribute('src', imgProfileSource);

    if (isLiked) {
        elements.likeHeartIconSvg.classList.add('fa-solid');
        elements.likeHeartIconSvg.classList.remove('fa-regular');
    } else {
        elements.likeHeartIconSvg.classList.remove('fa-solid');
        elements.likeHeartIconSvg.classList.add('fa-regular');
    }
    elements.likeHeartCount.innerText = likeCount;

    elements.commentButton.addEventListener('click', () => {
        onCommentClick();
    });
    elements.heartButton.addEventListener('click', async () => {
        elements.heartButton.disabled = true;
        const isLiked = await onHeartClick();
        if (isLiked) {
            elements.likeHeartIconSvg.classList.add('fa-solid');
            elements.likeHeartIconSvg.classList.remove('fa-regular');
        } else {
            elements.likeHeartIconSvg.classList.remove('fa-solid');
            elements.likeHeartIconSvg.classList.add('fa-regular');
        }
        elements.heartButton.disabled = false;
    });
    elements.buyButton.addEventListener('click', () => {
        onBuyClick();
    });
    elements.imgSource.addEventListener('dblclick', () => {
        onHeartClick();
    });

    return card;
};
