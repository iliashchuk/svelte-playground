<style>
    h2 {
        width: 360px;
        margin: 0;
    }
    .header {
        height: 116px;
        display: grid;
        justify-content: center;
        align-content: space-evenly;
    }
    .settings {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
    }
    label {
        cursor: pointer;
    }
</style>

<script>
    import Grid from './Grid.svelte';
    import { gameSize, gameMessage, gameTurn, winner } from './stores';
    import { resetBaseStores } from './utils';
</script>

<div class="header">
    <h2>{$gameMessage}</h2>
    {#if $winner || $gameTurn === 0}
        <div class="settings">
            <label for="size">Size: </label>
            <input
                type="range"
                id="size"
                min="3"
                max="6"
                bind:value={$gameSize}
                on:change={resetBaseStores}
            />
            {#if $gameTurn !== 0}
                <button on:click={resetBaseStores}>Reset</button>
            {/if}
        </div>
    {/if}
</div>
<Grid />
