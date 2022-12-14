import { AppBottomHeaderBuilder } from '../shared/components/app-bottom-header.js';
import { endpoints, getQueryParam } from '../shared/common.js';
import { AppTopHeaderBuilder } from '../shared/components/app-top-header.js';
import { AppLoadingIndicatorBuilder } from '../shared/components/app-loading-indicator.js';
import { ProfileDesignCardBuilder } from '../shared/components/profile-design-card.js';

window.addEventListener('load', async () => {
    const elements = {
        container: document.querySelector('.var--profile-container'),
        actions: document.querySelector('.var--profile-actions'),
        designList: document.querySelector('.var--user-designs'),
        showMyDesignsButton: document.querySelector('.var--show-my-designs'),
        showPurchasedDesignsButton: document.querySelector('.var--show-purchased-designs'),
        name: document.querySelector('.var--profile-name'),
        avatar: document.querySelector('.var--profile-avatar'),
        description: document.querySelector('.var--profile-description'),
        followerCount: document.querySelector('.var--follower-count'),
        followingCount: document.querySelector('.var--following-count'),
        accountBalance: document.querySelector('.var--account-balance'),
        showBalance: document.querySelector('.var--show-balance'),
        showEditProfile: document.querySelector('.var--show-edit-profile'),
        showAddBalance: document.querySelector('.var--show-add-balance')
    };

    //  Page Loading Indicator
    const { hideLoading, showLoading } = AppLoadingIndicatorBuilder(document.getElementById('app-loading-indicator'));

    //  Top Header Component
    const { updateTopHeaderAvatar } = AppTopHeaderBuilder(document.getElementById('app-top-header'));

    //  Bottom Header Component
    const { setBottomHeaderUserId } = AppBottomHeaderBuilder(document.getElementById('app-bottom-header'));

    showLoading();

    //  Fetch User profile and rename keys for being clear
    const {
        body: getMyUserProfileBody,
        response: getMyUserProfileResponse,
        error: getMyUserProfileError
    } = await endpoints.getMyUserProfile();

    //  User profile and rename keys for being clear
    const {
        user: myUser,
        balance: myBalance,
        followerUsers: myFollowerUsers,
        followedUsers: myFollowedUsers,
        userAvatar: myUserAvatar
    } = getMyUserProfileBody;

    if (myUserAvatar) {
        updateTopHeaderAvatar(myUserAvatar?.url || '/profile.png');
    }

    //  Decide what profile we should show. Self invoked function to group some logic
    const userProfile = await (async () => {
        const queryParamUserId = getQueryParam('id');

        //  No ID in param means my profile
        if (!queryParamUserId) {
            return {
                user: myUser,
                followerUsers: myFollowerUsers,
                followedUsers: myFollowedUsers,
                userAvatar: myUserAvatar,
                isMyProfile: true,
                balance: myBalance
            };
        }

        const parsedUserId = Number.isNaN(parseInt(queryParamUserId)) ? null : parseInt(queryParamUserId);

        //  Bad Id
        if (!parsedUserId) {
            return null;
        }

        //  Same id as user means user's profile
        if (parsedUserId === myUser.id) {
            return {
                user: myUser,
                followerUsers: myFollowerUsers,
                followedUsers: myFollowedUsers,
                userAvatar: myUserAvatar,
                isMyProfile: true,
                balance: myBalance
            };
        }
        const { body, response, error } = await endpoints.getUserProfile(queryParamUserId);

        //  User not found
        if (!body) {
            return null;
        }

        const { user, followerUsers, followedUsers, userAvatar } = body;

        return {
            user: user,
            followerUsers: followerUsers,
            followedUsers: followedUsers,
            userAvatar: userAvatar,
            isMyProfile: false,
            balance: 0
        };
    })();

    if (!userProfile) {
        elements.container.innerHTML = '<div>User not found!</div>';
        hideLoading();
        return;
    }

    const { user, followerUsers, followedUsers, userAvatar, balance, isMyProfile } = userProfile;

    elements.avatar.setAttribute('src', userAvatar?.url || '/profile.png');

    const userPurchasedDesignsItems = await (async () => {
        if (!isMyProfile) {
            return [];
        }

        //  Fetch User profile and rename keys for being clear
        const { body, response, error } = await endpoints.getUserPurchasedDesigns();
        const { items } = body;
        return items ?? [];
    })();

    if (isMyProfile) {
        elements.showBalance.removeAttribute('hidden');
        elements.showEditProfile.removeAttribute('hidden');
        elements.showAddBalance.removeAttribute('hidden');
        elements.accountBalance.innerText = balance;
    } else {
        elements.actions.classList.add('profile-actions-hide');
    }

    elements.name.innerText = user.name;
    elements.description.innerText = user.description;
    elements.followerCount.innerText = followerUsers.length;
    elements.followingCount.innerText = followedUsers.length;
    const { body, response, error } = await endpoints.getUserDesigns(user.id);
    const { items } = body;

    const cards = await Promise.all(
        items.map(async (card) => {
            const { id, avatarUrl, description, username, name, price, url, userId } = card;
            const { body } = await endpoints.getDesignLikeCount(id);
            const { likeCount, isLiked } = body;
            return ProfileDesignCardBuilder({
                designId: id,
                imgSource: url,
                likeCount
            });
        })
    );

    const purchasedCards = await Promise.all(
        userPurchasedDesignsItems.map(async (card) => {
            const { id, avatarUrl, description, username, name, price, url, userId } = card;
            const { body } = await endpoints.getDesignLikeCount(id);
            const { likeCount, isLiked } = body;
            return ProfileDesignCardBuilder({
                designId: id,
                imgSource: url,
                likeCount
            });
        })
    );

    elements.designList.replaceChildren(...cards);

    elements.showMyDesignsButton.addEventListener('click', () => {
        elements.designList.replaceChildren(...cards);
    });

    elements.showPurchasedDesignsButton.addEventListener('click', () => {
        if (isMyProfile) {
            elements.designList.replaceChildren(...purchasedCards);
        }
    });

    console.log(body);
    hideLoading();
});
