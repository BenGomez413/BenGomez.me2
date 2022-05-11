<script>
  export let status
</script>

{#if status}
  <div class="container">
    <i class="fa-solid fa-spinner spin" />
  </div>
{/if}

<style>
  .container {
    color: var(--white);
    text-align: center;
    font-size: 1.5rem;
  }

  .spin {
    animation: spin 1s infinite;
    animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
