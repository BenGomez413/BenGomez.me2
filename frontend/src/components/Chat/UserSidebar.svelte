<script>
  //stores
  import { loading, socket, page } from '../../stores/AppStore'
  import { currentUser } from '../../stores/UserStore'
  import { currentChatroom } from '../../stores/ChatStore'

  //Choose Icon
  const setIcon = (icon) => {
    let className
    switch (icon) {
      case 'BROWSER':
        className = 'fas fa-user'
        break
      case 'ARDUINO':
        className = 'fas fa-microchip'
        break
      case 'RASPBERRY':
        className = 'fab fa-raspberry-pi'
        break
      default:
        className = 'fas fa-question-circle'
        break
    }
    return className
  }
  //Refresh Room
  const refresh = () => {
    //Read User
    $socket.emit('user:read', { _id: $currentUser._id }, (response) => {
      $currentUser = response
      localStorage.setItem('currentUser', JSON.stringify(response))
      console.log(
        '%c User Recieved',
        'color:rgb(61, 132, 153); font-weight: bold;'
      )
      console.dir(response)
    })
    //Read Chatroom
    $socket.emit('chatroom:read', { _id: $currentChatroom._id }, (response) => {
      $currentChatroom = response

      console.log(
        '%c Room Recieved',
        'color:rgb(186, 104, 69);font-weight: bold;'
      )
      console.dir(response)
    })
  }
  //Create Room
  const createRoom = async (e) => {
    e.preventDefault()

    let newChatroom = {
      name: e.target.newRoom.value,
      ownerID: $currentUser._id,
      ownerName: $currentUser.name,
      ownerIcon: 'BROWSER',
      unique: `${$currentUser._id}:${e.target.newRoom.value}`,
      members: [$currentUser._id],
      messages: [
        {
          senderID: $currentUser._id,
          senderName: $currentUser.name,
          color: $currentUser.color,
          text: $currentUser.text,
          msg: `${$currentUser.name} created the Room: ${e.target.newRoom.value}`,
          timestamp: Date.now(),
        },
      ],
    }

    // console.log(newChatroom)
    $socket.emit('chatroom:create', newChatroom)
    e.target.newRoom.value = ''
  }
  //Join Room
  const joinRoom = (e) => {
    if (e.target.id != null) {
      $loading = true
      $socket.emit('chatroom:read', { _id: e.target.id }, (response) => {
        $loading = false
        $currentChatroom = response
        document.getElementById('dropdown').style.display = 'none'
        console.log(
          '%c Room Recieved',
          'color:rgb(186, 104, 69);font-weight: bold;'
        )
        console.dir(response)
      })
    }
  }

  joinRoom({
    target: { id: 'GLOBAL' },
  })

  const toggleDropdown = () => {
    const dropdown = document.getElementById('dropdown')
    getComputedStyle(dropdown).display === 'none'
      ? (dropdown.style.display = 'block')
      : (dropdown.style.display = 'none')
  }
</script>

<!-- sidebar -->
<div class="user-side">
  <!-- CURRENT USER -->
  <h2
    on:click|self={() => ($page = 'profile')}
    style="background-color: {$currentUser.color}; color:{$currentUser.text}"
  >
    {$currentUser.name}
    <span on:click={refresh}>&#10227;</span>
  </h2>

  <!-- ROOM LIST -->
  <div class="room-list">
    <form class="add-room" on:submit={createRoom}>
      <input name="newRoom" type="text" required placeholder="Create Room..." />
      <button class="add-room-btn">+</button>
    </form>

    <ul>
      <button
        id="GLOBAL"
        class="room {$currentChatroom._id === 'GLOBAL' && 'selected'}"
        on:click={joinRoom}
      >
        GLOBAL
        <i class="fa-solid fa-earth-americas" />
      </button>

      {#if $currentUser.ownedChatrooms && $currentUser.ownedChatrooms.length > 0}
        {#each $currentUser.ownedChatrooms as room}
          <button
            class="room {$currentChatroom._id === room._id && 'selected'}"
            id={room._id}
            on:click={joinRoom}
          >
            {room.name}
            <i class={setIcon(room.ownerIcon)} />
          </button>
        {/each}
      {/if}

      {#if $currentUser.joinedChatrooms && $currentUser.joinedChatrooms.length > 0}
        {#each $currentUser.joinedChatrooms as room}
          <button
            class="room {$currentChatroom._id === room._id && 'selected'}"
            id={room._id}
            on:click={joinRoom}
          >
            {room.name}
            <i class={setIcon(room.ownerIcon)} />
          </button>
        {/each}
      {/if}
    </ul>
  </div>
</div>

<!-- topbar -->
<div class="user-top">
  <!-- CURRENT USER -->
  <h2
    on:click|self={() => ($page = 'profile')}
    style="background-color: {$currentUser.color}; color:{$currentUser.text}"
  >
    {$currentUser.name}
  </h2>
  <button class="dropdown-btn" on:click={toggleDropdown}
    ><i class="fa-solid fa-bars" /> Room List</button
  >
  <button class="refresh-btn" on:click={refresh}
    ><i class="fa-solid fa-rotate-right" /></button
  >

  <div class="room-list-dropdown" id="dropdown">
    <form class="add-room" on:submit={createRoom}>
      <input name="newRoom" type="text" required placeholder="Create Room..." />
      <button class="add-room-btn">+</button>
    </form>

    <ul>
      <button
        id="GLOBAL"
        class="room {$currentChatroom._id === 'GLOBAL' && 'selected'}"
        on:click={joinRoom}
      >
        GLOBAL
        <i class="fa-solid fa-earth-americas" />
      </button>

      {#if $currentUser.ownedChatrooms && $currentUser.ownedChatrooms.length > 0}
        {#each $currentUser.ownedChatrooms as room}
          <button
            class="room {$currentChatroom._id === room._id && 'selected'}"
            id={room._id}
            on:click={joinRoom}
          >
            {room.name}
            <i class={setIcon(room.ownerIcon)} />
          </button>
        {/each}
      {/if}

      {#if $currentUser.joinedChatrooms && $currentUser.joinedChatrooms.length > 0}
        {#each $currentUser.joinedChatrooms as room}
          <button
            class="room {$currentChatroom._id === room._id && 'selected'}"
            id={room._id}
            on:click={joinRoom}
          >
            {room.name}
            <i class={setIcon(room.ownerIcon)} />
          </button>
        {/each}
      {/if}
    </ul>
  </div>
</div>

<style>
  .user-side {
    background-color: var(--white);
    max-width: 300px;
    height: fit-content;
    border-radius: 5px;
    border: 1px solid rgba(241, 240, 234, 0.699);
    box-shadow: 0 10px 0 rgb(175, 167, 145), 0px 5px 5px 5px rgba(0, 0, 0, 0.35);
  }
  /* Current User */
  h2 {
    display: flex;
    align-items: center;

    width: 100%;
    margin-bottom: 5px;
    border-radius: 5px 5px 0 0;
    padding: 0.5rem;
    box-shadow: 0 5px 0 rgba(0, 0, 0, 0.35);

    font-size: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  h2:hover {
    filter: brightness(120%);
  }

  h2 span {
    margin-left: auto;
    border-radius: 50%;
    padding: 0 5px;
    caret-color: transparent;
  }

  h2 span:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  /* ROOM LIST */
  .room-list {
    padding: 0.5rem;
  }
  .room-list ul {
    margin-top: 5px;
    overflow-x: hidden;
  }

  .room-list h3 i {
    float: right;
  }
  .room-list h3 i:hover {
    cursor: pointer;
    color: var(--yellow);
  }

  .add-room {
    display: inline-flex;
    width: 100%;
  }

  .add-room input {
    background-color: var(--black);
    color: var(--white);
    width: 100%;

    border-radius: 5px 0 0 5px;
    padding: 0 0.5rem;
    box-shadow: inset rgba(37, 37, 37, 0.842) 0px 5px 5px;
  }

  .add-room-btn {
    width: fit-content;
    margin: 0;
    border-radius: 0 5px 5px 0;
    padding: 0.7rem;
    font-size: 0.8rem;
  }

  .add-room button:hover {
    background-color: rgb(46, 147, 179);
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    background-color: var(--black);
    height: 100%;
    max-height: 400px;
    border-radius: 5px;
    padding: 5px;
    overflow-y: auto;
  }
  .room {
    background-color: rgb(119, 116, 108);
    color: var(--white);
    font-size: 1rem;

    display: inline-flex;
    width: 100%;
    margin: 0 auto;
    border-radius: 5px;
    padding: 0.5rem;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .room i {
    margin-left: auto;
  }

  .room:hover {
    cursor: pointer;
    filter: brightness(120%);
  }

  .selected {
    background-color: var(--blue);
  }

  /* TOPBAR */
  .user-top {
    display: none;
    align-items: center;

    width: 100%;
    height: 2.5rem;
    border-radius: 5px;

    font-size: 1.5rem;
  }
  .user-top h2 {
    overflow: hidden;
    height: 100%;
    margin: 0;
    border: none;
    border-radius: 5px 0 0 5px;
    box-shadow: inset -5px 0 0 rgba(0, 0, 0, 0.35);
  }

  .user-top .dropdown-btn {
    background-color: var(--white);
    color: rgb(129, 126, 108);

    height: 100%;
    border-radius: 0;
    padding: 0.25rem;
    font-size: 1.1rem;
    font-weight: bold;

    white-space: nowrap;
    overflow: hidden;
  }

  .user-top .refresh-btn {
    background-color: rgb(171, 167, 143);
    color: white;
    width: fit-content;
    height: 100%;
    border-radius: 0 5px 5px 0;
    padding: 0 1rem;
    box-shadow: inset 2px 0 0 rgba(0, 0, 0, 0.1);
    font-size: 1.25rem;
  }

  .user-top .room-list-dropdown {
    background-color: var(--white);
    display: none;
    position: absolute;
    top: 200px;
    left: 10px;

    width: calc(100% - 20px);

    border-radius: 5px;
    padding: 5px;
    box-shadow: 0 0px 10px 10px rgba(0, 0, 0, 0.35);
  }

  .room-list-dropdown > .add-room {
    margin-bottom: 5px;
  }

  /* SWITCH TO TOP BAR IF SCREEN NARROW */
  @media only screen and (max-width: 800px) {
    .user-top {
      display: flex;
    }

    .user-side {
      display: none;
    }
  }
</style>
