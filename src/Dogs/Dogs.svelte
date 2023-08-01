<style>
    img {
        display: block;
        margin: 20px;
        border-radius: 12px;
        max-height: 480px;
    }
</style>

<script>
    import barkFile1 from '../assets/bark1.mp3';
    import barkFile2 from '../assets/bark2.mp3';
    import barkFile3 from '../assets/bark3.mp3';

    const barks = [new Audio(barkFile1), new Audio(barkFile2), new Audio(barkFile3)];

    function playRandomBark() {
        const randomBark = barks[Math.floor(Math.random() * 3)];

        randomBark.play();
    }

    async function fetchDogImageUrl() {
        const apiResponse = await fetch('https://dog.ceo/api/breeds/image/random');
        const responseJSON = await apiResponse.json();
        return responseJSON.message;
    }

    function getAnotherDog() {
        playRandomBark();
        dogImageUlrPromise = fetchDogImageUrl();
    }

    let dogImageUlrPromise = fetchDogImageUrl();
</script>

<h2>Get a random dog image</h2>
<button on:click={getAnotherDog}>Bark!</button>

{#await dogImageUlrPromise}
    <p>... loading your dog ...</p>
{:then url}
    <img src={url} alt="random dog" />
{/await}
