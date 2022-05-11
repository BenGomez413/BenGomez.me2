<script>
  export let state = false

  const toggle = () => {
    state = !state
  }
</script>

<div class={state ? 'switch on' : 'switch off'} on:click={toggle}>
  <div class="thumb" />
</div>

<style>
  .switch {
    background-color: var(--black);

    position: relative;

    width: 3rem;
    height: 1.5rem;

    margin: 0;
    border-radius: .75rem;
    box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.267);

    cursor: pointer;
    caret-color: transparent;

    transition: background-color 500ms ease-in-out;
  }

  .switch:hover {
    filter: brightness(120%);
  }

  .thumb {
    background-color: var(--white);

    position: absolute;
    transform: scale(0.7, 0.7);

    width: 1.5rem;
    height: 1.5rem;

    border-radius: 50%;
    box-shadow: var(--shadow), 0 5px 3px rgba(0, 0, 0, 0.438);

    left: 0;
    transition: left 200ms ease-in-out;
    caret-color: transparent;
  }

  .on {
    background-color: var(--orange);
    transition: background-color 500ms ease-in-out;
  }

  .on .thumb {
    left: 1.5rem;
    transition: left 200ms ease-in-out;
  }
</style>
