<script>
  export let label = 'Delete'
  export let action = () => {
    console.log('Default Delete Component Function Called')
  }

  const reveal = () => {
    const btn = document.getElementById('btn')
    btn.style.display = 'flex'

    const span = document.getElementById('span')
    span.style.display = 'none'
  }
  const hide = () => {
    const btn = document.getElementById('btn')
    btn.style.display = 'none'

    const span = document.getElementById('span')
    span.style.display = 'flex'
  }
</script>

<section>
  <span id="span" on:click={reveal}>{label}</span>

  <button id="btn" on:mouseleave={hide} on:click={action}>
    Are You Sure?
    <i class="fa-solid fa-trash" />
  </button>
</section>

<style>
  section {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    margin: 5px 0 5px auto;
    caret-color: transparent;
  }
  button {
    background-color: var(--error);
    color: white;

    display: none;
    align-items: center;

    width: fit-content;
    margin: 0;
    margin-left: auto;
    padding: 5px;
    cursor: pointer;
  }
  span {
    color: var(--brown);
    margin-left: auto;
    cursor: pointer;
  }

  span:hover {
    color: var(--error);
  }

  i {
    padding-left: 5px;
  }
</style>
