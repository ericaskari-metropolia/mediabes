import { endpoints, storage } from './shared/common.js';
import { AppLoadingIndicatorBuilder } from './shared/components/app-loading-indicator.js';
import { HomeDesignCardBuilder } from './shared/components/home-design-card.js';
import { AppBottomHeaderBuilder } from './shared/components/app-bottom-header.js';
import { AppTopHeaderBuilder } from './shared/components/app-top-header.js';
import { ModalBuilder } from './shared/components/app-modal.js';

window.addEventListener('load', async () => {
    //  Page Html element references
    const elements = {
        cardList: document.getElementById('card-list')
    };

    //  Modal Component
    const { showPurchaseConfirmation, showMessageModal } = ModalBuilder(document.getElementById('app-modals'));
    //  Page Loading Indicator
    const { hideLoading, showLoading } = AppLoadingIndicatorBuilder(document.getElementById('app-loading-indicator'));
    //  Top Header Component
    const { updateTopHeaderAvatar } = AppTopHeaderBuilder(document.getElementById('app-top-header'));
    //  Bottom Header Component
    const { setBottomHeaderUserId } = AppBottomHeaderBuilder(document.getElementById('app-bottom-header'));

    showLoading();
    const { body, response, error } = await endpoints.getMyUserProfile();
    const { user, userAvatar } = body;

    const { body: purchasedDesignsBody } = await endpoints.getUserPurchasedDesigns();
    const { items: purchasedDesigns } = purchasedDesignsBody;

    console.log(purchasedDesigns);
    setBottomHeaderUserId(user.id);

    if (userAvatar) {
        updateTopHeaderAvatar(userAvatar.url);
    }

    {
        const { body, response, error } = await endpoints.getAllDesigns();
        const { items = [] } = body ?? {};

        const cards = await Promise.all(
            items.map(async (card) => {
                const { id, avatarUrl, description, username, name, price, url, userId } = card;
                const { body } = await endpoints.getDesignLikeCount(id);
                const { likeCount, isLiked } = body;
                console.log(purchasedDesigns.find((x) => x.id === id));
                return HomeDesignCardBuilder({
                    userId,
                    name,
                    description,
                    imgSource: url,
                    username,
                    price: price,
                    imgProfileSource: avatarUrl,
                    isLiked: isLiked,
                    likeCount,
                    hideBuyButton: userId === user.id || purchasedDesigns.find((x) => x.id === id),
                    onBuyClick: async () => {
                        const confirmation = await showPurchaseConfirmation(name, price);
                        if (!confirmation) {
                            return false;
                        }
                        const { response, error, body } = await endpoints.buyDesign(id);

                        console.log({ response, error, body });

                        if (error) {
                            await showMessageModal('Error', `Something went wrong: ${error.message}`);
                            return false;
                        }
                        await showMessageModal('Congratulations!', `Purchase succeeded.`);
                        return true;
                    },
                    onHeartClick: async () => {
                        const { body } = await endpoints.likeDesign(id);
                        const { isLiked, likeCount } = body;
                        return { isLiked, likeCount };
                    },
                    onCommentClick: () => {
                        console.log('onCommentClick');
                    },
                    onImgClick: () => {
                        window.location.href = `/design/?id=${id}`;
                    }
                });
            })
        );

        for (let card of cards) {
            elements.cardList.appendChild(card);
        }
    }

    hideLoading();

    if (!storage.hasValidSession()) {
        location.href = '/login/';
    }
});
