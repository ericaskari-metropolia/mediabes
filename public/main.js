import { endpoints, storage } from './shared/common.js';
import { LoadingIndicator } from './shared/loading-indicator/loading-indicator.js';
import { HomeDesignCardBuilder } from './components/home-design-card.js';
import { AppHeaderBuilder } from './components/app-header.js';

window.addEventListener('load', async () => {
    const loading = LoadingIndicator.init(true);

    const { body, response, error } = await endpoints.getMyUserProfile();
    if (error || !body) {
        console.log(error);
        return;
    }
    const { user } = body;

    AppHeaderBuilder(document.getElementById('app-header'), user.id);

    const elements = {
        loadingIndicator: document.getElementsByClassName('loading-indicator')[0],
        debug: document.getElementById('debug'),
        cardList: document.getElementById('card-list')
    };

    //  Just to test the jwt
    const users = await endpoints.getUsers();
    console.log(users);
    await loading.hide();

    if (!storage.hasValidSession()) {
        location.href = '/login/';
    }

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
        document.getElementById('card-list').appendChild(
            HomeDesignCardBuilder({
                ...card,
                onBuyClick: () => {
                    console.log('onBuyClick');
                },
                onHeartClick: () => {
                    console.log('onHeartClick');
                },
                onCommentClick: () => {
                    console.log('onCommentClick');
                }
            })
        );
    }
});
