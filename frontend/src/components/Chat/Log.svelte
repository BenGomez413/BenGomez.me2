<script>
  import { afterUpdate } from 'svelte'

  //stores
  import { socket } from '../../stores/AppStore'
  import { currentUser } from '../../stores/UserStore'
  import { currentChatroom } from '../../stores/ChatStore'

  import { formatAMPM, formatDate } from '../../functions/formats'

  import Message from './Message.svelte'
  import Loading from '../Loading.svelte'
  import DeleteButton from '../DeleteButton.svelte'

  import RGB from './RGB.svelte'
  import Keyboard from './Keyboard.svelte'
  import Gamepad from './Gamepad.svelte'

  let loading = false

  //Toggle Chatroom Details Box
  let showDetails = false
  const toggleDetails = () => {
    const detailsArrows = document.getElementById('detailsArrows')
    showDetails = !showDetails

    showDetails
      ? (detailsArrows.className = 'fas fa-angle-down')
      : (detailsArrows.className = 'fas fa-angle-up')
  }

  //Select Input Tab
  let selectedTab = 'inputText'
  const selectTab = (e) => {
    selectedTab = e.target.dataset.tab
  }

  //Keep Messages scrolled At Bottom
  history.scrollRestoration = 'manual'
  const scrollToBottom = () => {
    const scrollDiv = document.getElementById('scrollDiv')
    setTimeout(() => {
      scrollDiv.scrollTop = scrollDiv.scrollHeight
    }, 1)
  }
  afterUpdate(() => {
    scrollToBottom()
  })

  // Join Room
  const joinRoom = (e) => {
    e.preventDefault()
    loading = true

    const inputValue = e.target.joinRoom.value
    e.target.joinRoom.value = ''
    if (inputValue === '') return

    const payload = {
      userID: $currentUser._id,
      chatroomID: inputValue,
    }

    $socket.emit('chatroom:join', payload, (response) => {
      if (response.user) {
        $currentUser = response.user
      }
      if (response.chatroom) {
        $currentChatroom = response.chatroom
        console.log(
          '%c Chatroom Joined',
          'color:rgb(186, 104, 69);font-weight: bold;'
        )
        console.dir(response.chatroom)
      }
      loading = false
    })
  }

  //Delete Chatroom
  const deleteRoom = () => {
    $socket.emit(
      'chatroom:delete',
      { _id: $currentChatroom._id },
      (response) => {
        if (response.body) {
          $currentChatroom = response.body
          console.log(response.message)
          $socket.emit('user:read', { _id: $currentUser._id }, (response) => {
            $currentUser = response
            console.log(
              '%c User Recieved',
              'color:rgb(61, 132, 153); font-weight: bold;'
            )
            console.dir(response)
          })
        }
      }
    )
    showDetails = false
  }
  //Leave Chatroom
  const leaveRoom = () => {
    $socket.emit('chatroom:leave', {
      userID: $currentUser._id,
      chatroomID: $currentChatroom._id,
    })
  }

  //Send Message
  let saveState = true
  const sendMessage = (e) => {
    e.preventDefault()
    const payload = {
      target: $currentChatroom._id,
      save: saveState,
      message: {
        senderID: $currentUser._id,
        senderName: $currentUser.name,
        color: $currentUser.color,
        text: $currentUser.text,
        type: 'text',
        msg: e.target.message.value,
        timestamp: Date.now(),
      },
    }

    $socket.emit('chatroom:message', payload)
    e.target.message.value = ''

    $currentChatroom.messages.push(payload.message)
    $currentChatroom = $currentChatroom
    scrollToBottom()
    console.log(
      '%c Message Sent: ',
      'background-color:rgb(199, 176, 92); color:black; font-weight: bold;'
    )
    console.dir($currentUser)
  }
  //Get message
  $socket.on('message', (data) => {
    $currentChatroom.messages.push(data)
    $currentChatroom = $currentChatroom
    scrollToBottom()

    console.log(
      '%c Message Recieved: ',
      'color:rgb(199, 176, 92); font-weight: bold;'
    )

    // console.dir(data)
  })
</script>

<section class="chatlog">
  <div class="room-header">
    <div class="left">
      <button on:click={navigator.clipboard.writeText($currentChatroom._id)}
        ><i class="fas fa-copy" />
      </button>
      <div class="info">
        <h2>{$currentChatroom.name}</h2>
        <p>ID: {$currentChatroom._id}</p>
      </div>
    </div>

    <div class="right">
      <form class="join-room" on:submit={joinRoom}>
        <input type="text" name="joinRoom" placeholder="Room ID..." />
        <button type="submit">Join</button>
      </form>
      <div class="toggle-details-button" on:click={toggleDetails}>
        <span>Room Details</span>
        <i id="detailsArrows" class="fas fa-angle-up" />
      </div>
    </div>
  </div>
  {#if showDetails === true}
    <div class="details">
      <div class="wrapper">
        <table>
          <tr><th>Owner:</th> <td>{$currentChatroom.ownerName}</td></tr>
          <tr
            ><th>Created:</th>
            <td>
              <span>{formatDate(new Date($currentChatroom.createdAt))}</span>
              <span>{formatAMPM(new Date($currentChatroom.createdAt))}</span>
            </td>
          </tr>
          <tr
            ><th>Updated:</th>
            <td>
              <span>{formatDate(new Date($currentChatroom.updatedAt))}</span>
              <span>{formatAMPM(new Date($currentChatroom.updatedAt))}</span>
            </td>
          </tr>
        </table>
        {#if $currentChatroom.ownerID === $currentUser._id}
          <DeleteButton label={'Delete Chatroom'} action={deleteRoom} />
        {:else if $currentChatroom._id != 'GLOBAL'}
          <button on:click={leaveRoom}>Leave</button>
        {/if}
      </div>
      <div class="members-list">
        <h3>Members</h3>
        <ul>
          {#if $currentChatroom.members}
            {#each $currentChatroom.members as member}
              <li
                class="members-list-item"
                id={member._id}
                style="background-color:{member.color}; color:{member.text}"
              >
                {member.name}
              </li>
            {/each}
          {/if}
        </ul>
      </div>
    </div>
  {/if}

  <ul class="log" id="scrollDiv">
    {#if $currentChatroom.messages}
      {#each $currentChatroom.messages as message}
        <Message currentUserID={$currentUser._id} {message} />
      {/each}
    {/if}
    <Loading status={loading} />
  </ul>
  <div class="inputs">
    <div class="tabs">
      <span
        class="tab {selectedTab === 'inputText' ? 'selected' : ''}"
        data-tab="inputText"
        on:click={selectTab}
      >
        <i class="fa-solid fa-message" data-tab="inputText" />
      </span>
      <span
        class="tab {selectedTab === 'inputRgb' ? 'selected' : ''}"
        data-tab="inputRgb"
        on:click={selectTab}
      >
        <i class="fa-solid fa-palette" data-tab="inputRgb" />
      </span>
      <span
        class="tab {selectedTab === 'inputKeyboard' ? 'selected' : ''}"
        data-tab="inputKeyboard"
        on:click={selectTab}
      >
        <i class="fa-solid fa-keyboard" data-tab="inputKeyboard" />
      </span>
      <span
        class="tab {selectedTab === 'inputGamepad' ? 'selected' : ''}"
        data-tab="inputGamepad"
        on:click={selectTab}
      >
        <i class="fa-solid fa-gamepad" data-tab="inputGamepad" />
      </span>
    </div>
  </div>
  {#if selectedTab === 'inputText'}
    <form class="send-message" on:submit={sendMessage}>
      <input type="text" name="message" id="message" autocomplete="off" />
      <button>Send</button>
    </form>
  {/if}

  {#if selectedTab === 'inputRgb'}
    <RGB />
  {/if}

  {#if selectedTab === 'inputKeyboard'}
    <Keyboard />
  {/if}

  {#if selectedTab === 'inputGamepad'}
    <div class="gamepad-container">
      <Gamepad />
    </div>
  {/if}
</section>

<style>
  .chatlog {
    background-color: var(--white);
    width: 100%;
    max-height: calc(100vh - (100px + 7px + 4rem));
    border-radius: 5px;
    border: 1px solid rgba(241, 240, 234, 0.699);
    padding: 1rem;

    box-shadow: 0 10px 0 rgb(175, 167, 145), 0px 5px 5px 5px rgba(0, 0, 0, 0.35);

    display: flex;
    flex-direction: column;
  }

  .room-header {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .left {
    display: flex;
    margin: 0;
  }

  .left button {
    margin: 0;
    max-width: 3rem;
  }

  .left .info {
    padding: 0 0.5rem;
    overflow: hidden;
  }

  .left .info h2 {
    color: var(--orange);
    font-size: 1.6rem;
    white-space: nowrap;
  }
  .left .info p {
    color: hsla(54, 11%, 34%, 0.733);
    font-size: 0.9rem;
    font-weight: bold;
    white-space: nowrap;
  }

  .right {
    margin-left: auto;
  }

  .join-room {
    display: inline-flex;
    min-width: 100px;
    margin-left: auto;
  }

  .join-room input {
    background-color: var(--black);
    color: var(--white);
    width: 100%;
    border-radius: 5px 0 0 5px;
    padding: 0 0.5rem;
    box-shadow: inset rgba(37, 37, 37, 0.842) 0px 5px 5px;
  }

  .join-room button {
    width: fit-content;
    margin: 0;
    border-radius: 0 5px 5px 0;
    padding: 0.7rem;
    font-size: 0.8rem;
  }

  .join-room button:hover {
    background-color: rgb(46, 147, 179);
  }

  .toggle-details-button {
    color: var(--orange);
    cursor: pointer;
    white-space: nowrap;
    margin-left: auto;
    text-align: right;
  }

  .toggle-details-button:hover {
    color: rgb(221, 111, 20);
  }

  .toggle-details-button span {
    padding-right: 5px;
  }

  .toggle-details-button i {
    vertical-align: middle;
  }

  .details {
    background-color: rgb(185, 180, 160);
    display: flex;
    margin-top: 1rem;
    border-radius: 0 0 5px 5px;
    padding: 10px;
  }

  th {
    text-align: left;
  }
  .details .members-list {
    margin-left: auto;
  }

  .members-list ul {
    background-color: var(--black);

    border-radius: 10px;
    padding: 2px;
    box-shadow: inset rgba(37, 37, 37, 0.842) 0px 5px 5px;
  }

  .members-list-item {
    margin: 5px;
    border-radius: 5px;
    padding: 5px;
    box-shadow: var(--shadow);
  }

  .log {
    background-color: var(--black);

    min-height: 300px;

    margin-top: 1rem;
    border-radius: 10px 10px 0 0;
    padding: 1rem;
    padding-bottom: 3rem;
    box-shadow: inset rgba(37, 37, 37, 0.942) 0px 20px 20px;

    overflow-x: hidden;
    overflow-y: scroll;
  }

  .send-message {
    display: flex;
    width: 100%;

    border-top: solid 10px var(--brown);
  }
  .send-message input {
    width: 100%;
    height: 3rem;
    border-radius: 0 0 0 10px;
    padding: 1rem;
    /* box-shadow: inset 0px 5px 1rem  rgba(0, 0, 0, 0.712) ; */
    font-size: 1rem;
  }
  .send-message button {
    margin: 0;
    border-radius: 0 0 10px 0;
    width: fit-content;
  }

  .inputs {
    background-color: var(--black);
  }

  .tabs {
    color: white;
    display: inline-flex;
    gap: 2px;

    max-width: calc(100vw - 5rem);
    position: absolute;
    transform: translate(0%, -40px);
    overflow: hidden;
  }
  .tab {
    caret-color: transparent;
    background-color: rgb(87, 82, 75);

    width: 70px;
    height: 40px;

    border-bottom: var(--black) solid 2px;
    border-radius: 10px 10px 0 0;

    padding: 0.5rem;
    font-size: 1rem;
    text-align: center;
    cursor: pointer;
  }

  .tab:hover {
    filter: brightness(120%);
  }

  .tab.selected {
    background-color: var(--brown);
    border-bottom: none;
  }

  /* SCROLLBAR */
  ::-webkit-scrollbar {
    width: 1rem;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 0 5px 0 0;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 0 5px 0 0;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: var(--orange);
  }
  .gamepad-container {
    height: fit-content;
  }

  @media only screen and (max-width: 800px) {
    .chatlog {
      max-height: calc(100vh - (100px + 7px + 5.5rem));
    }
    .log {
      min-height: 0px;
    }
  }
</style>
