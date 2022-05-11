<script>
  export let position = 'top'
</script>

{#if position === 'top'}
  <div class="notch horizontal">
    <div class="triangle left" id="triangle-topleft" />
    <div class="triangle right" id="triangle-topright" />
  </div>
{/if}

{#if position === 'bottom'}
  <div class="notch horizontal">
    <div class="triangle left" id="triangle-bottomleft" />
    <div class="triangle right" id="triangle-bottomright" />
  </div>
{/if}

{#if position === 'left'}
  <div class="notch vertical">
    <div class="triangle top" id="triangle-topleft" />
    <div class="triangle bottom" id="triangle-bottomleft" />
  </div>
{/if}

{#if position === 'right'}
  <div class="notch vertical">
    <div class="triangle top" id="triangle-topright" />
    <div class="triangle bottom" id="triangle-bottomright" />
  </div>
{/if}

<style>
  .notch {
    --triangle-width: 50px;
    --notch-height: 10px;

    display: flex;
    flex-wrap: nowrap;
    filter: drop-shadow(0 7px 0 var(--orange));
  }

  .horizontal {
    width: 100%;
    height: var(--notch-height);
  }

  .vertical {
    width: var(--notch-height);
    height: 100%;
  }

  .right {
    margin-left: auto;
  }

  .triangle {
    width: var(--triangle-width);
  }

  #triangle-topleft {
    border-top: var(--notch-height) solid var(--white);
    border-right: var(--notch-height) solid transparent;
  }

  #triangle-topright {
    border-top: var(--notch-height) solid var(--white);
    border-left: var(--notch-height) solid transparent;
  }

  #triangle-bottomleft {
    border-bottom: var(--notch-height) solid var(--white);
    border-right: var(--notch-height) solid transparent;
  }

  #triangle-bottomright {
    border-bottom: var(--notch-height) solid var(--white);
    border-left: var(--notch-height) solid transparent;
  }
</style>
