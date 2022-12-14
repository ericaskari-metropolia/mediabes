const template = `
        <div class="profile-design-card">
            <img class='var--home-design-card-img-source'/>
            <div class="likes">
                <i class="fa-regular fa-heart"></i>
                <span class="number-likes var--like-heart-count">1</span>
            </div>
        </div>
`;

export const ProfileDesignCardBuilder = ({ imgSource, likeCount }) => {
    const card = document.createElement('div');
    card.innerHTML = template;
    card.classList.add('design-card');

    const elements = {
        imgSource: card.querySelector(`.var--home-design-card-img-source`),
        likeHeartCount: card.querySelector(`.var--like-heart-count`)
    };

    elements.imgSource.setAttribute('src', imgSource);
    elements.likeHeartCount.innerText = likeCount;

    elements.imgSource.addEventListener('dblclick', () => {});

    return card;
};
