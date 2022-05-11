<script>
  import Login from '../Login.svelte'
  import UserSidebar from '../Chat/UserSidebar.svelte'
  import Log from '../Chat/Log.svelte'

  //stores
  import { currentUser } from '../../stores/UserStore'
</script>

{#if $currentUser._id}
  <div class="chatroom">
    <div class="center-container">
      <UserSidebar />
      <Log />
    </div>
  </div>
{:else}
  <Login />
{/if}

<style>
  .chatroom {
    margin: 1rem auto;
  }
  .center-container {
    display: flex;
    flex-wrap: nowrap;
    gap: 1rem;
    margin: auto;
  }

  @media only screen and (max-width: 800px) {
    .center-container {
      flex-wrap: wrap;
    }
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
