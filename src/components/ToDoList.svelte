<style>
    li {
        text-align: left;
    }
</style>

<script>
    import AddToDo from './AddToDo.svelte';

    let toDos = [];

    const addToDo = value => {
        toDos = [...toDos, value];
    };
</script>

<div>
    <AddToDo handleAddNew={addToDo} />
    <ul>
        {#each toDos as toDo}
            <li>
                {toDo}
            </li>
        {/each}
    </ul>
</div>
