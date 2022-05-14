<script>
  import { socket } from '../../stores/AppStore'
  import { currentUser } from '../../stores/UserStore'
  import { currentChatroom } from '../../stores/ChatStore'

  let r = 0
  let g = 0
  let b = 0
  let rgb = `rgb(${r},${g},${b})`
  let hex = '#000000'

  let saveState = true

  function rgbToHex() {
    const RGB = (r << 16) | (g << 8) | (b << 0)
    rgb = `rgb(${r},${g},${b})`
    hex = '#' + (0x1000000 + RGB).toString(16).slice(1)
  }

  function hexToRgb() {
    const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
    let rgbArray = normal.slice(1).map((e) => parseInt(e, 16))

    r = rgbArray[0]
    g = rgbArray[1]
    b = rgbArray[2]

    rgb = `rgb(${r},${g},${b})`
  }

  const sendMessage = (e) => {
    e.preventDefault()
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
        type: 'rgb',
        msg: e.target.message.value,
        timestamp: Date.now(),
      },
    }

    $socket.emit('chatroom:message', payload)

    $currentChatroom.messages.push(payload.message)
    $currentChatroom = $currentChatroom

    console.log(
      '%c Color Sent: ',
      'background-color:rgb(199, 176, 92); color:black; font-weight: bold;'
    )
  }
</script>

<section>
  <div class="rgb">
    <div class="color">
      <header>
        <h2>Red</h2>
        <span>{r}</span>
      </header>
      <input
        type="range"
        class="red"
        min="0"
        max="255"
        bind:value={r}
        on:input={rgbToHex}
      />
    </div>

    <div class="color">
      <header>
        <h2>Green</h2>
        <span>{g}</span>
      </header>
      <input
        type="range"
        class="green"
        min="0"
        max="255"
        bind:value={g}
        on:input={rgbToHex}
      />
    </div>

    <div class="color">
      <header>
        <h2>Blue</h2>
        <span>{b}</span>
      </header>
      <input
        type="range"
        class="blue"
        min="0"
        max="255"
        bind:value={b}
        on:input={rgbToHex}
      />
    </div>
  </div>

  <form class="send" on:submit={sendMessage}>
    <input type="color" bind:value={hex} on:input={hexToRgb} />
    <input type="text" id="message" bind:value={rgb} />
    <button>Send</button>
  </form>
</section>

<style>
  section {
    background-color: var(--brown);
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    border-radius: 0 0 10px 10px;
    padding: 1rem;
  }
  .rgb {
    display: flex;
    gap: 10px;

    width: 100%;
    box-shadow: var(--shadow);
  }
  .color {
    width: 33%;
  }

  header {
    background-color: var(--white);
    color: var(--black);
    display: inline-flex;
    width: 100%;
    border-radius: 5px 5px 0 0;
    padding: 5px;
    box-shadow: var(--shadow);
    font-weight: bold;
  }

  h2 {
    font-size: 1rem;
  }
  span {
    margin-left: auto;
  }

  /* RANGE SLIDER */
  input[type='range'] {
    -webkit-appearance: none;
    background-color: var(--brown);
    display: block;
    width: 100%;
    height: 1.6rem;
    cursor: pointer;
    caret-color: transparent;
  }
  input[type='range']:focus {
    outline: none;
  }
  input[type='range']::-webkit-slider-runnable-track {
    background-color: var(--black);
    width: 100%;
    height: 100%;
    border-radius: 0 0 5px 5px;
  }
  input[type='range']:focus::-webkit-slider-runnable-track {
    border: 1px solid white;
  }

  input[type='range']:hover::-webkit-slider-runnable-track {
    filter: brightness(120%);
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    cursor: pointer;
    width: 1rem;
    height: 100%;
    border-radius: 0 0 5px 5px;
    box-shadow: var(--shadow);
  }

  .red::-webkit-slider-thumb {
    background-color: rgb(190, 58, 58);
    border-top: 0;
  }
  .green::-webkit-slider-thumb {
    background-color: rgb(84, 167, 63);
  }
  .blue::-webkit-slider-thumb {
    background-color: rgb(38, 87, 160);
  }

  /* SEND */
  .send {
    display: flex;
    width: 100%;
    height: 100%;
    max-height: 3rem;
    box-shadow: var(--shadow);
    flex-grow: 1;
  }
  .send input[type='color'] {
    width: 75px;
    height: 100%;
    border-radius: 5px 0 0 5px;
  }

  .send input[type='color']::-webkit-color-swatch {
    border-radius: 5px 0 0 5px;
  }

  .send input[type='text'] {
    min-width: none;
    width: 100%;
    flex-grow: 1;
    padding: 1rem;
    font-size: 1rem;
  }
  .send button {
    width: fit-content;
    margin: 0;
    border-radius: 0 0 5px 0;
    padding: 0 1rem;
  }
</style>
