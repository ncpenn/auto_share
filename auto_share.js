(function() {
    const inventoryTagClass = ".inventory-tag";
    const shareButtonClass = ".social-action-bar__share";
    const shareModalId = ".share-modal";
    const followerShareClass = ".internal-share__link";
    const randomMilliseconds = () => Math.floor(Math.random() * (3010 - 1570)) + 1570;
    const isVisible = el => el.offsetParent !== null || getComputedStyle(el).display !== "none";
    const getCaptchaElement = () => document.querySelector("#captcha-popup");
    const getWindowHeight = () => document.body.offsetHeight;
    const scrollToBottomOfPage = () => window.scrollTo(0, document.body.offsetHeight);
    const getAllTiles = () => document.querySelectorAll(".tile");
    const getActiveTiles = () => {
        const allTiles = getAllTiles();
        window.console.log("You have a total of " + allTiles.length + " items in your closet.");
        return Array.prototype.filter.call(allTiles, tile => tile.querySelector(inventoryTagClass) === null)
    };
    const clickModalShareButton = () => {
        document
        .querySelector(shareModalId)
        .querySelector(followerShareClass)
        .click();
    };
    const getShareButton = t => t.querySelector(shareButtonClass);
    const shareActiveListings = () => {
        const activeTiles = getActiveTiles();
        let currentTileIndex = 0;
        let captchaEl = getCaptchaElement();
        const shareNextActiveTile = () => {
            captchaEl = captchaEl || getCaptchaElement();
            if (!captchaEl || !isVisible(captchaEl)) {
                window.console.log("sharing item: " + currentTileIndex + " of " + activeTiles.length + " active listings.");
                const currentTile = activeTiles[currentTileIndex++];
                const shareButton = getShareButton(currentTile); 
                shareButton.click(clickModalShareButton);
                let isModalShowing = setInterval(function(){
                   if(isVisible(document.querySelector(shareModalId)) && isVisible(document.querySelector(followerShareClass))) {
                        clearInterval(isModalShowing);
                        clickModalShareButton();

                        let isSuccessToastGone = setInterval(function(){
                            if(!isVisible(document.querySelector('#flash__message'))){
                                clearInterval(isSuccessToastGone);
                                
                                if (currentTileIndex < activeTiles.length) {
                                    window.setTimeout(shareNextActiveTile, randomMilliseconds());
                                }
                            }
                        }, 100);  
                   }
                }, 100);
            }
        };
        shareNextActiveTile();
    };

    let lastHeight = getWindowHeight();
    let numberOfTimesScollToBottomFailed = 0
    scrollToBottomOfPage();
    let handler = setInterval(function(){
        let current = getWindowHeight();
        if(lastHeight != current) {
            lastHeight = current;
            scrollToBottomOfPage();
            numberOfTimesScollToBottomFailed = 0;
        } else {
            numberOfTimesScollToBottomFailed++;
        }

        if(numberOfTimesScollToBottomFailed > 10){
            clearInterval(handler);
            shareActiveListings();
        }
    }, 500);
})();
