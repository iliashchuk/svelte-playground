<style>
    .tile {
        --tic-color: #555555;
        position: relative;
        padding: 0;
        width: 100%;
        height: 100%;
        border-radius: 0px;
        border: 0px solid #555555;
        border-width: var(--borders);
        grid-area: var(--grid-area);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .tile:active {
        box-shadow: 0 0 12px gray inset;
    }

    .tile:disabled {
        box-shadow: none;
        cursor: default;
    }

    .naught {
        display: flex;
        width: 80%;
        height: 80%;
        background-color: var(--tic-color);
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }

    .naught:after {
        width: 70%;
        height: 70%;
        background-color: #f9f9f9;
        content: '';
        border-radius: 50%;
    }

    .cross {
        background: var(--tic-color);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .cross:before,
    .cross:after {
        background: var(--tic-color);
        content: '';
        height: 80%;
        position: absolute;
        width: 10%;
    }
    .cross:after {
        rotate: 45deg;
    }
    .cross:before {
        rotate: -45deg;
    }
</style>

<script>
    import { winner } from './stores';
    import { PLAYERS } from './constants';

    export let tickedBy = undefined;
</script>

<button disabled={tickedBy || $winner} on:click class="tile">
    {#if tickedBy === PLAYERS.crosses}
        <div class="cross" />
    {:else if tickedBy === PLAYERS.naughts}
        <div class="naught" />
    {/if}
</button>
