import { enableFormDebug, isDevelopment, endpoints, formDataToJson, storage } from './shared/common.js';
import { LoadingIndicator } from './shared/loading-indicator/loading-indicator.js';
import { DesignCard } from './components/design-card';

window.addEventListener('load', async () => {
    const loading = LoadingIndicator.init();
    const elements = {
        loadingIndicator: document.getElementsByClassName('loading-indicator')[0],
        debug: document.getElementById('debug'),
        cardList: document.getElementById('card-list')
    };

    //  Just to test the jwt
    const users = await endpoints.getUsers();
    console.log(users);

    // checking if user has a valid token, if user don't have it or expired, it will redirect to home page
    if (!storage.hasValidSession()) {
        location.href = '/login/';
    }

    // examples, testing the UI

    const cards = [
        {
            name: 'Eric Askari',
            username: 'ericaskari',
            imgSource: '/sample-images/horse.jpg',
            imgProfileSource: 'https://randomuser.me/api/portraits/men/1.jpg',
            price: 1000,
            likeCount: 20,
            isLiked: true
        },
        {
            name: 'Sara',
            username: 'sara',
            imgSource: '/sample-images/flowers.jpg',
            imgProfileSource: 'https://randomuser.me/api/portraits/women/2.jpg',
            price: 120,
            likeCount: '2',
            isLiked: false
        },
        {
            name: 'Sara',
            username: 'sara',
            imgSource: '/sample-images/flowers.jpg',
            imgProfileSource: 'https://randomuser.me/api/portraits/women/2.jpg',
            price: 120,
            likeCount: '2',
            isLiked: false
        }
    ];

    for (let card of cards) {
        const index = cards.indexOf(card);

        elements.cardList.appendChild(
            DesignCard.factory({
                ...card,
                onBuyClick: () => console.log('onBuyClick'),
                onHeartClick: (designCard) => {
                    console.log('onHeartClick');
                    cards[index].isLiked = !cards[index].isLiked;
                    designCard.refreshHeartIconStatus(cards[index].isLiked);
                },
                onCommentClick: () => console.log('onCommentClick')
            })
        );
    }
});
