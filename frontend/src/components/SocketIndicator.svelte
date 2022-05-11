<script>
  import { socketStatus } from '../stores/AppStore'
</script>

<section id="indicator">
  <img src="/assets/images/socketRecess.svg" alt="" class="recess" />
  <svg
    class={$socketStatus === 1 ? 'connected' : 'disconnected'}
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMinYMin meet"
  >
    <circle cx="128" cy="128" r="114" stroke-width="20" fill="none" />
    <path
      d="M97.637 121.69c27.327-22.326 54.058-45.426 81.98-67.097-14.646 22.505-29.708 44.711-44.354 67.215-12.562.06-25.123.06-37.626-.119zM120.737 134.132c12.621 0 25.183 0 37.745.179-27.505 22.206-54.117 45.484-82.099 67.096 14.646-22.505 29.708-44.77 44.354-67.275z"
      fill="#010101"
    />
  </svg>
</section>

<style>
  section {
    --connectedColor: var(--blue);
    --disconnectedcolor: black;
    --rimThickness: 0.4rem;

    background-color: rgba(0, 0, 0, 0.50);
    position: relative;

    width: 50px;
    aspect-ratio: 1/1;

    border-radius: 100% 0 0 100%;
    padding: var(--rimThickness);

    display: grid;
    align-items: center;
  }
  img {
    width: calc(100% - 2 * var(--rimThickness));
    position: absolute;
    top: var(--rimThickness);
    left: var(--rimThickness);
  }

  svg {
    width: 100%;
    stroke: transparent;
    filter: drop-shadow(0 0 10px transparent);
  }
  path {
    fill: transparent;
  }

  .connected {
    stroke: var(--connectedColor);
    filter: drop-shadow(0 0 10px var(--connectedColor));
  }
  .connected path {
    fill: var(--connectedColor);
  }

  .disconnected {
    stroke: var(--disconnectedColor);
    filter: drop-shadow(0 0 10px var(--disconnectedColor));
  }
  .disconnected path {
    fill: var(--disconnectedColor);
  }
</style>
