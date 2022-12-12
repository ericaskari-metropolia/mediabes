import { endpoints, storage } from './shared/common.js';
import { LoadingIndicator } from './shared/loading-indicator/loading-indicator.js';
import { HomeDesignCardBuilder } from './shared/components/home-design-card.js';
import { AppBottomHeaderBuilder } from './shared/components/app-bottom-header.js';
import { AppTopHeaderBuilder } from './shared/components/app-top-header.js';

window.addEventListener('load', async () => {
    const elements = {
        loadingIndicator: document.getElementsByClassName('loading-indicator')[0],
        debug: document.getElementById('debug'),
        cardList: document.getElementById('card-list')
    };

    const loading = LoadingIndicator.init(true);

    const { body, response, error } = await endpoints.getMyUserProfile();
    if (error || !body) {
        console.log(error);
        return;
    }
    const { user, userAvatar } = body;

    const { updateTopHeaderAvatar } = AppTopHeaderBuilder(document.getElementById('app-top-header'), user.id);
    AppBottomHeaderBuilder(document.getElementById('app-bottom-header'), user.id);

    if (userAvatar) {
        updateTopHeaderAvatar(userAvatar.url);
    }

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
