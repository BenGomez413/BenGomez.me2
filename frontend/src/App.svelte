<script>
  import { onMount } from 'svelte'
  //Components
  import Header from './components/Header.svelte'
  import Modal from './components/modal.svelte'
  import Home from './components/Home.svelte'
  import Login from './components/Login.svelte'
  import Profile from './components/Profile.svelte'
  import MorseDecoder from './components/MorseDecoder.svelte'
  import Chatroom from './components/Chat/Chatroom.svelte'

  //Stores
  import { page, socket, socketStatus } from './stores/AppStore'
  import { currentUser } from './stores/UserStore'

  let modalContent = null

  onMount(() => {
    if (localStorage.getItem('currentUser')) {
      $currentUser = JSON.parse(localStorage.getItem('currentUser'))
      $socket.emit('user:read', {_id: $currentUser._id}, (response) => {
        $currentUser = response
        console.log('Auto Login')
        console.dir(response)
      })
    }
  })

  //Socket.io
  $socket.on('connect', () => {
    $socketStatus = 1
    console.log(
      `%cConnected: ${$socket.id}`,
      'background-color:rgb(63, 153, 82); padding: 2px 15px; border-radius: 10px;font-weight: bold;'
    )
  })

  $socket.on('disconnect', () => {
    $socketStatus = 0
    console.log(
      `%cDisconnected`,
      'background-color:rgb(197, 69, 69); padding: 2px 15px; border-radius: 10px;font-weight: bold;'
    ) // undefined
  })
</script>

<main>
  {#if modalContent}
    <Modal>{modalContent}</Modal>
  {/if}

  <Header />
  <div class="container">
    {#if $page === 'home'}
      <Home />
    {:else if $page === 'login'}
      <Login />
    {:else if $page === 'morse'}
      <MorseDecoder props={{ full: true }} />
    {:else if $page === 'chat'}
      <Chatroom />
    {:else if $page === 'profile'}
      <Profile />
    {:else}
      <h1>Page Not Found</h1>
      <button
        on:click={() => {
          $page = 'home'
        }}>Go Home</button
      >
    {/if}
  </div>
</main>

<style>
  .container {
    width: calc(100vw - (2 * var(--margin)));
    margin: auto;
  }
</style>
