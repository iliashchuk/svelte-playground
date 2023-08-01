<style>
    .container {
        display: grid;
        place-items: center;
    }

    img {
        display: block;
        margin: 20px;
        border-radius: 12px;
        max-height: 480px;
    }

    .shareButton {
        display: flex;
        padding: 6px;
        align-items: center;
        gap: 4px;
    }

    .shareButton img {
        margin: 0px;
        height: 32px;
    }

    .dogSearch {
        position: relative;
        display: inline;
        border: none;
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        letter-spacing: 0.2em;
        font-size: 1em;
        font-weight: bold;
        color: #213547;
        text-decoration: underline;
        margin-right: -0.4ch;
    }

    .dogSearch:focus-visible {
        outline: none;
    }

    .fake-cursor {
        position: absolute;
        height: 1.15em;
        top: 0.15em;
        right: 0.05em;
        width: 1px;
        background: #213547;
        animation: fake-cursor infinite alternate 0.7s steps(2, jump-none);
    }

    @keyframes fake-cursor {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }
</style>

<script>
    import barkFile1 from '../assets/bark1.mp3';
    import barkFile2 from '../assets/bark2.mp3';
    import barkFile3 from '../assets/bark3.mp3';
    import telegramLogo from '../assets/telegram_logo.svg';
    const barks = [new Audio(barkFile1), new Audio(barkFile2), new Audio(barkFile3)];

    function playRandomBark() {
        const randomBark = barks[Math.floor(Math.random() * 3)];

        randomBark.play();
    }

    async function fetchDogImageUrl() {
        let url;
        if (randomDog) {
            url = 'https://dog.ceo/api/breeds/image/random';
        } else {
            url = `https://dog.ceo/api/breed/${dogQuery}/images/random`;
        }
        const apiResponse = await fetch(url);
        if (!apiResponse.ok) {
            return Promise.reject(dogQuery);
        }
        const responseJSON = await apiResponse.json();
        fetchedDogQuery = dogQuery;
        // return randomDog ? responseJSON.message : responseJSON.message[0];
        return responseJSON.message;
    }

    function getAnotherDog() {
        playRandomBark();
        dogImageUlrPromise = fetchDogImageUrl();
    }

    async function shareTelegram() {
        const imageUrl = await dogImageUlrPromise;
        const message = `Check out this cool ${fetchedDogQuery}!`;
        const url = `https://t.me/share/url?url=${imageUrl}&text=${message}`;
        window.open(url);
    }

    function unfocusSearch() {
        searchFocused = false;
        if (!dogQuery) {
            dogQuery = 'dog';
        }
    }

    let dogQuery = 'dog';
    let fetchedDogQuery = '';
    let randomDog = true;
    let searchFocused = false;
    let dogImageUlrPromise = fetchDogImageUrl();

    $: randomDog = dogQuery === 'dog';
</script>

<div class="container">
    <h2>
        Get a random
        <span style="position: relative; display: inline-block;">
            <input
                bind:value={dogQuery}
                maxlength="20"
                size={dogQuery.length + 1}
                class="dogSearch"
                style="width: {dogQuery.length + 1}ch"
                on:focusin={() => (searchFocused = true)}
                on:focusout={unfocusSearch}
            />
            {#if !searchFocused}
                <div class="fake-cursor" />
            {/if}
        </span>
        image
    </h2>
    <button on:click={getAnotherDog}>Fetch!</button>

    {#await dogImageUlrPromise}
        <p style="height: 480px;">... loading your dog ...</p>
    {:then url}
        <img src={url} alt="random dog" />
        <button on:click={shareTelegram} class="shareButton">
            <img src={telegramLogo} alt="telegram" />
            Share
        </button>
    {:catch badDogQuery}
        <p>{badDogQuery} doesn't seem to be a dog breed that exists :c</p>
    {/await}
</div>
