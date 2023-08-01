<style>
    .contanier {
        display: flex;
        align-items: center;
        gap: 8px;
    }
</style>

<script>
    let value;
    export let handleAddNew;

    const handleAddClick = () => {
        handleAddNew(value);
        value = '';
    };
</script>

<div class="contanier">
    New todo
    <input bind:value />
    <button disabled={!value} on:click={handleAddClick}>Add</button>
</div>
