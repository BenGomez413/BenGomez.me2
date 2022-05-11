<script>
  import { socket } from '../../stores/AppStore'
  import { currentUser } from '../../stores/UserStore'
  import { currentChatroom } from '../../stores/ChatStore'
  import Switch from '../Switch.svelte'

  let keys = []
  let saveState = false

  const updateStore = () => {
    const payload = {
      params: {
        _id: $currentChatroom._id,
        save: saveState,
      },
      message: {
        senderID: $currentUser._id,
        senderName: $currentUser.name,
        color: $currentUser.color,
        text: $currentUser.text,
        msg: keys.join(),
        timestamp: Date.now(),
      },
    }
    $socket.emit('chatroom:message', payload)
    console.log(keys)
    // THIS SLOW DOWN THE CLIENT A LOT
    // $currentChatroom.messages.push(payload.message)
    // $currentChatroom = $currentChatroom
  }

  const keyDown = (e) => {
    if (keys.includes(e.code) === false) {
      e.preventDefault()
      keys = [...keys, e.code]
      updateStore()
    }
  }

  const keyUp = (e) => {
    keys = keys.filter((key) => key !== e.code)
    updateStore()
  }
</script>

<svelte:window on:keydown={keyDown} on:keyup={keyUp} />

<section>
  <header>
    <h2>Keyboard Contoller</h2>
    <div class="switch-contianer">
      <spanl>Save:&ensp</spanl>
      <Switch bind:state={saveState} />
    </div>
  </header>

  <div class="key-container">
    <!-- <span class="key">key</span> -->
    {#each keys as key}
      <span class="key">{key}</span>
    {/each}
  </div>
</section>

<style>
  section {
    background-color: var(--brown);
    border-radius: 0 0 10px 10px;
    padding: 1rem;
    color: white;
    caret-color: transparent;
  }

  header {
    color: var(--white);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  h2 {
    font-size: 1.2rem;
  }

  .switch-contianer {
    display: flex;
    min-height: 0;
    margin: 0 0 0 auto;
    padding: 0;
    box-shadow: none;
  }

  .key-container {
    background-color: var(--black);
    min-height: calc(0.8rem + 2rem + 18px);
    margin-top: 5px;
    border-radius: 20px;
    padding: 5px 0;
    box-shadow: inset var(--shadow);
  }

  .key {
    background-color: var(--white);
    color: var(--orange);

    display: inline-flex;
    font-size: 0.8rem;
    font-weight: bold;

    margin: 0 5px;
    border-radius: 20px;
    border: solid 5px var(--orange);
    border-top: none;
    padding: 1rem;

    box-shadow: var(--shadow);
  }
</style>
