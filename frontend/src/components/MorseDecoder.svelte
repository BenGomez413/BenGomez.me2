<script>
  export let props = {
    full: false,
  }

  let morseCode = [
    ['-----', '0'],
    ['.----', '1'],
    ['..---', '2'],
    ['...--', '3'],
    ['....-', '4'],
    ['.....', '5'],
    ['-....', '6'],
    ['--...', '7'],
    ['---..', '8'],
    ['----.', '9'],
    ['.-', 'a'],
    ['-...', 'b'],
    ['-.-.', 'c'],
    ['-..', 'd'],
    ['.', 'e'],
    ['..-.', 'f'],
    ['--.', 'g'],
    ['....', 'h'],
    ['..', 'i'],
    ['.---', 'j'],
    ['-.-', 'k'],
    ['.-..', 'l'],
    ['--', 'm'],
    ['-.', 'n'],
    ['---', 'o'],
    ['.--.', 'p'],
    ['--.-', 'q'],
    ['.-.', 'r'],
    ['...', 's'],
    ['-', 't'],
    ['..-', 'u'],
    ['...-', 'v'],
    ['.--', 'w'],
    ['-..-', 'x'],
    ['-.--', 'y'],
    ['--..', 'z'],
    ['/', ' '],
    ['-.-.--', '!'],
    ['.-.-.-', '.'],
    ['--..--', ','],
    ['-....-', '-'],
  ]

  let dotLength = 500 //ms
  let dashLength = 3 * dotLength
  let charGapLength = dotLength
  let letterGapLength = 3 * dotLength
  let wordGapLength = 7 * dotLength

  const updateDotLength = (e) => {
    dotLength = e.target.value
    dashLength = 3 * dotLength
    charGapLength = dotLength
    letterGapLength = 3 * dotLength
    wordGapLength = 7 * dotLength
  }

  //Buttons
  const keyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      check()
    }
  }

  let keyDownTime = 0
  const pressed = () => {
    keyDownTime = new Date()
  }

  const unpressed = () => {
    const lengthOfPress = new Date() - keyDownTime
    // console.log(lengthOfPress)

    lengthOfPress < dotLength
      ? (document.getElementById('input').value += '.')
      : (document.getElementById('input').value += '-')
  }

  const clear = () => {
    document.getElementById('input').value = ''
  }

  //Morse
  function check() {
    const input = document.getElementById('input')
    let output
    input.value = input.value.trim()

    input.value.match(/^[\.\-\/\s]+$/)
      ? (output = decode(input.value))
      : (output = encode(input.value))

    input.value = ''
    input.value = output.toUpperCase()
  }

  function decode(value) {
    let output = ''
    let morse = []
    morse = value.match(/([\.\/-]+)/g)
    for (let i = 0; i < morse.length; i++) {
      for (let j = 0; j < morseCode.length; j++) {
        if (morse[i] == morseCode[j][0]) {
          output += morseCode[j][1]
        }
      }
    }
    return output
  }

  function encode(value) {
    let output = ''
    let char = []
    char = value.toLowerCase().split('')
    for (let i = 0; i < char.length; i++) {
      for (let j = 0; j < morseCode.length; j++) {
        if (char[i] == morseCode[j][1]) {
          output += morseCode[j][0] + ' '
        }
      }
    }
    return output
  }
</script>

<section class="morse-decoder">
  <div class="device" on:keydown={keyDown}>
    <div class="screen">
      <textarea placeholder="Type Here..." id="input" />
      <div class="groove-wrap">
        <div class="groove" />
        <div class="groove" />
        <div class="groove" />
      </div>
    </div>
    <div class="button-wrap">
      <button on:click={clear}>&#215;</button>
      <button on:click={check}>&#8629;</button>
    </div>
    <button
      class="spacebar pressed"
      id="spacebar"
      on:mousedown={pressed}
      on:mouseup={unpressed}
    />
  </div>

  {#if props.full === true}
    <div class="settings glass">
      <h1>How To Use</h1>
      <p>
        Click on screen and type. <br />
        Use periods(.) for Dots and hyphens(-) for Dashes. <br />
        Press Enter to Encode or Decode.
      </p>
      <br />
      <br />
      <h1>Settings</h1>
      <table>
        <tr>
          <th>Dot Length</th>
          <td>
            <input
              type="number"
              min="0"
              max="10000"
              value={dotLength}
              on:change={updateDotLength}
            /> ms
          </td>
        </tr>
        <tr>
          <th>Dash Length</th>
          <td>3 x dotLength = {dashLength}ms</td>
        </tr>
        <tr>
          <th>Gap Between Dots</th>
          <td>1 x dotLength = {charGapLength}ms</td>
        </tr>
        <tr>
          <th>Gap Between Letters</th>
          <td>3 x dotLength = {letterGapLength}ms</td>
        </tr>
        <tr>
          <th>Gap Between Words</th>
          <td>7 x dotLength = {wordGapLength}ms</td>
        </tr>
      </table>
    </div>
  {/if}
</section>

<style>
  .morse-decoder {
    display: flex;
    flex-wrap: nowrap;
    gap: 1rem;
    z-index: 50;
  }
  .device {
    background-color: var(--white);
    display: grid;
    grid-template-columns: 1fr 4rem;
    gap: 1rem;

    width: 100%;
    height: fit-content;

    margin-bottom: 1rem;
    border-radius: 6px;
    padding: 1rem 1rem 0 1rem;
    box-shadow: 0 15px 0 0px rgb(175, 167, 145),
      0px 20px 5px 5px rgba(0, 0, 0, 0.35);
  }

  .device:focus-within {
    border: 1px solid white;
  }
  .screen {
    display: flex;
    background-color: var(--orange);

    height: fit-content;

    border: 1px solid rgb(219, 161, 136);
    border-radius: 6px;
    padding: 1rem 0 1rem 1rem;
    box-shadow: 0 5px 0 5px rgb(158, 89, 59);
  }

  .screen textarea {
    background-color: #1e1d1c;
    color: rgba(199, 176, 92, 0.75);

    resize: none;
    width: 100%;
    min-height: 4rem;

    border: 1px solid rgb(216, 158, 133);
    border-radius: 6px;
    padding: 1rem;
    box-shadow: inset 0 2px 0 5px rgb(90, 58, 43);

    font-family: 'Press Start 2P', cursive;
    font-size: 0.8rem;
  }

  .screen textarea:hover {
    filter: brightness(150%);
  }

  .groove-wrap {
    width: 100px;
    margin-top: 2px;
  }

  .groove {
    background-color: #9e593b;
    width: 100%;
    height: 10px;
    margin-top: 7px;
    box-shadow: inset 0px 2px 0px rgba(0, 0, 0, 0.25);
  }

  .button-wrap {
    margin: 0;
    background-color: rgb(161, 154, 134);
    border-radius: 5px;
    padding: 0 7px;
  }

  .button-wrap button {
    margin: 0 0 10px 0;
    border: 1px solid rgb(95, 148, 165);
    padding: 5px;
    box-shadow: 0 4px 0 2px rgb(52, 111, 130);

    color: rgba(255, 255, 255, 0.7);
    font-size: 1.5rem;
  }

  .button-wrap button:active {
    transform: translateY(3px);
    box-shadow: 0 1px 0 2px rgb(52, 111, 130);
  }

  .spacebar {
    background-color: rgb(217, 214, 201);

    width: 90%;
    height: 3rem;

    margin: 0 auto;
    border: 1px solid rgb(114, 111, 102);
    border-bottom: none;
    border-radius: 4px 4px 0 0;
    box-shadow: inset 0px -15px 0px rgb(175, 167, 145);

    transform: translateY(15px);
    cursor: pointer;
    caret-color: transparent;
  }

  .spacebar:active {
    background-color: rgb(217, 214, 201);
    border-top: 5px solid rgb(175, 167, 145);
    box-shadow: inset 0px -10px 0px rgb(175, 167, 145);
  }

  .settings {
    color: white;
    padding: 1rem;
  }

  input[type='number'] {
    background-color: rgba(0, 0, 0, 0.623);
    color: white;
    width: 5rem;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 1rem;
    box-shadow: inset 0px 10px 5px 5px rgba(0, 0, 0, 0.35);
  }
  table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
  }
  tr:nth-child(even) {
    border-top: 1px solid rgba(255, 255, 255, 0.35);
    border-bottom: 1px solid rgba(255, 255, 255, 0.35);
  }
  th,
  td {
    padding: 5px;
  }
  th {
    text-align: right;
  }
  td {
    border-left: 1px solid rgba(255, 255, 255, 0.35);
    padding-left: 10px;
  }

  @media only screen and (max-width: 1000px) {
    .morse-decoder {
      flex-wrap: wrap;
    }
  }


  @media only screen and (max-width: 400px) {
    .screen{
      padding: 1rem;
    }
    .groove-wrap {
      display: none;
    }
  }

  
</style>
