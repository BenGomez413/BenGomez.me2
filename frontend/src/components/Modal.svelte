<dialog class="container modal" id="modal">
  <button class="exit">&#215;</button>
  <slot>
    <div>
      <h1>Modal</h1>
      <p>Nothing slotted</p>
    </div>
  </slot>
</dialog>

<style>
  .modal {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    text-align: center;

    display: grid;
    align-items: center;

    position: absolute;
    top: 0;

    width: 100%;
    height: 100%;
    padding: 10%;

    border-radius: 0;
    z-index: 150;
  }

  .exit {
    background-color: transparent;
    position: absolute;
    top: 0;
    right: 0;
    width: fit-content;
    margin: 0;
    border-radius: none;
    padding: 0.7rem 1rem;
    font-size: 1.5rem;
  }

  .exit:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>
