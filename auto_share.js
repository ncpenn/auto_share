(function(){
    const  ajaxSuccessEvent = "lprequestend";
    const inventoryTagClass = ".inventory-tag";
    const shareButtonClass = ".share";
    const shareModalId = "#share-popup";
    const followerShareClass = ".pm-followers-share-link";

    const getWindowHeight = () => document.body.offsetHeight;
    const scrollToBottomOfPage = () => window.scrollTo(0, getWindowHeight());
    const getAllTiles = () => document.querySelectorAll(".tile");
    const getActiveTiles = () => {
        const allTiles = getAllTiles();

        return Array.prototype.filter.call(allTiles, 
            tile => tile.querySelector(inventoryTagClass) === null)
    };
    const getShareButton = t => t.querySelector(shareButtonClass);

    const shareActiveListings = () => {
        const shareModal = document.querySelector(shareModalId);
        const shareToFollowersButton = shareModal.querySelector(followerShareClass);
        const activeTiles = getActiveTiles();
        let currentTileIndex = 0;

        const shareNextActiveTile = () => {
            const currentTile = activeTiles[currentTileIndex++];
            const shareButton = getShareButton(currentTile);

            shareButton.click();
            shareToFollowersButton.click();

            if(currentTileIndex < activeTiles.length){
                window.setTimeout(shareNextActiveTile, 500);
            }
        };
        shareNextActiveTile();
    };

    let lastWindowHeight = getWindowHeight();

    const checkHeightAndScroll = () => {
        const newHeight = getWindowHeight();
        if (newHeight !== lastWindowHeight){
            lastWindowHeight = newHeight;
            scrollToBottomOfPage();
        } else {
            window.removeEventListener(ajaxSuccessEvent, checkHeightAndScroll);
            shareActiveListings();
        }
    };

    window.addEventListener(ajaxSuccessEvent, checkHeightAndScroll);
    scrollToBottomOfPage();
})();
