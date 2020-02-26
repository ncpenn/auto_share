(function($) {
    const ajaxSuccessEvent = "lprequestend";
    const inventoryTagClass = ".inventory-tag";
    const shareButtonClass = ".share";
    const shareModalId = "#share-popup";
    const followerShareClass = ".pm-followers-share-link";
    const randomMilliseconds = () => Math.floor(Math.random() * (3000 - 1070)) + 1070;
    const isVisible = el => el.offsetParent !== null || getComputedStyle(el).display !== "none";
    const getCaptchaElement = () => document.querySelector("#captcha-popup");
    const getWindowHeight = () => document.body.offsetHeight;
    const scrollToBottomOfPage = () => window.scrollTo(0, getWindowHeight());
    const getAllTiles = () => document.querySelectorAll(".tile");
    const getActiveTiles = () => {
        const allTiles = getAllTiles();
        window.console.log("You have a total of " + allTiles.length + " items in your closet.");
        return Array.prototype.filter.call(allTiles, tile => tile.querySelector(inventoryTagClass) === null)
    };
    const getShareButton = t => t.querySelector(shareButtonClass);
    const shareActiveListings = () => {
        const shareModal = document.querySelector(shareModalId);
        const shareToFollowersButton = shareModal.querySelector(followerShareClass);
        const activeTiles = getActiveTiles();
        let currentTileIndex = 0;
        let captchaEl = getCaptchaElement();
        const shareNextActiveTile = () => {
            captchaEl = captchaEl || getCaptchaElement();
            if (!captchaEl || !isVisible(captchaEl)) {
                window.console.log("sharing item: " + currentTileIndex + " of " + activeTiles.length + " active listings.");
                const currentTile = activeTiles[currentTileIndex++];
                const shareButton = getShareButton(currentTile);
                shareButton.click();
                shareToFollowersButton.click();
            }
            if (currentTileIndex < activeTiles.length) {
                window.setTimeout(shareNextActiveTile, randomMilliseconds());
            }
        };
        shareNextActiveTile();
    };
    let lastWindowHeight = getWindowHeight();
    const checkHeightAndScroll = () => {
        const newHeight = getWindowHeight();
        if (newHeight !== lastWindowHeight) {
            lastWindowHeight = newHeight;
            scrollToBottomOfPage();
        } else {
            $(document).off("ajaxComplete");
            shareActiveListings();
        }
    };
    $(document).ajaxComplete(checkHeightAndScroll);
    scrollToBottomOfPage();
    if (Number(document.querySelectorAll(".active a .count")[0].innerText) < 49) {
        checkHeightAndScroll();
    }
})(jQuery);
