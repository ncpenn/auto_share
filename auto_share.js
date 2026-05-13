const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const scrollToBottom = async (delay = 1200, maxAttempts = 15) => {
  let lastHeight = document.body.scrollHeight;
  let attempt = 0;

  while (attempt < maxAttempts) {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    await sleep(delay);

    const newHeight = document.body.scrollHeight;
    if (newHeight === lastHeight) {
      break;
    }

    lastHeight = newHeight;
    attempt += 1;
  }

  return lastHeight;
};

(async () => {
  console.log("Scrolling to load all listings...");
  await scrollToBottom();

  const shareButtons = Array.from(document.getElementsByClassName("share-v2"));
  console.log(`Found ${shareButtons.length} share buttons after scrolling.`);

  for (let i = 0; i < shareButtons.length; i++) {
    const button = shareButtons[i];
    console.log(
      `opening share modal on ${i + 1} of ${shareButtons.length} listings...`,
    );
    button.click();
    await sleep(2000);

    const container = document.querySelector(".share-wrapper-container");
    if (container) {
      console.log(`clicking share button on ${i + 1}`);
      container.click();
    } else {
      console.log(`share wrapper container not found for item ${i + 1}`);
    }

    await sleep(3000);
  }
})();
