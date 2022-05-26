<script>
  import { onMount, onDestroy } from 'svelte'

  import { socket } from '../../stores/AppStore'
  import { currentUser } from '../../stores/UserStore'
  import { currentChatroom } from '../../stores/ChatStore'

  import Switch from '../Switch.svelte'

  let poll
  let gamepads = navigator.getGamepads()
  let lastMessage
  let saveState = false

  $: stickl = () => {
    let x = axisMap.lx * 40
    let y = axisMap.ly * 40
    let rx = axisMap.lx * 10
    let ry = axisMap.ly * 10
    let z = 1 - buttonMap.lstick * 0.05
    return `translateX(${x}%) translateY(${y}%) rotateY(${rx}deg) rotateX(${ry}deg) scale(${z})`
  }

  $: stickr = () => {
    let x = axisMap.rx * 40
    let y = axisMap.ry * 40
    let rx = axisMap.rx * 10
    let ry = axisMap.ry * 10
    let z = 1 - buttonMap.rstick * 0.05
    return `translateX(${x}%) translateY(${y}%) rotateY(${rx}deg) rotateX(${ry}deg) scale(${z})`
  }

  let buttonMap = {
    a: 0,
    b: 0,
    x: 0,
    y: 0,
    lb: 0,
    rb: 0,
    lt: 0,
    rt: 0,
    map: 0,
    menu: 0,
    lstick: 0,
    rstick: 0,
    du: 0,
    dd: 0,
    dl: 0,
    dr: 0,
    xbox: 0,
  }

  let axisMap = {
    lx: 0,
    ly: 0,
    rx: 0,
    ry: 0,
  }

  const plugIn = () => {
    startController()
  }

  const unPlug = () => {
    cancelAnimationFrame(poll)
  }

  const startController = () => {
    gamepads = navigator.getGamepads()
    if (!gamepads) {
      return
    }

    const pad = gamepads[0]
    const buttons = [
      'a',
      'b',
      'x',
      'y',
      'lb',
      'rb',
      'lt',
      'rt',
      'map',
      'menu',
      'lstick',
      'rstick',
      'du',
      'dd',
      'dl',
      'dr',
      'xbox',
    ]
    const axes = ['lx', 'ly', 'rx', 'ry']

    pad.buttons.forEach((button, i) => {
      buttonMap[buttons[i]] = button.pressed ? button.value : 0
    })

    pad.axes.forEach((axis, i) => {
      axisMap[axes[i]] =
        axis > 0.01 || axis < -0.01 ? parseFloat(axis.toFixed(3)) : 0
    })

    if (lastMessage != JSON.stringify({ buttonMap, axisMap })) {
      lastMessage = JSON.stringify({ buttonMap, axisMap })

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
          type: 'gamepad',
          msg: lastMessage,
          timestamp: Date.now(),
        },
      }
      $socket.emit('chatroom:message', payload)
      console.log({ buttonMap, axisMap })
      // THIS SLOW DOWN THE CLIENT A LOT
      // $currentChatroom.messages.push(payload.message)
      // $currentChatroom = $currentChatroom
    }

    poll = requestAnimationFrame(startController)
  }

  onMount(() => {
    gamepads[0] && startController()
  })

  onDestroy(() => unPlug())
</script>

<svelte:window on:gamepadconnected={plugIn} on:gamepaddisconnected={unPlug} />

<section>
  <header>
    <h2>Gamepad Contoller</h2>
    <div class="switch-contianer">
      <spanl>Save:&ensp</spanl>
      <Switch bind:state={saveState} />
    </div>
  </header>

  {#if gamepads[0] === null}
    <div class="warning">Please connect a controller</div>
  {/if}
  <div class="gamepad">
    <div class="shoulder-group">
      <button class="button" class:on={buttonMap.lb} />
      <div class="trigger"><div style="height: {buttonMap.lt * 100}%" /></div>
    </div>

    <div class="button-group">
      <button class="button down" class:on={buttonMap.dd} />
      <button class="button right" class:on={buttonMap.dr} />
      <button class="button left" class:on={buttonMap.dl} />
      <button class="button up" class:on={buttonMap.du} />
    </div>
    <div class="stick-container">
      <div class="stick">
        <div class:on={buttonMap.lstick} style="transform: {stickl()}" />
      </div>
    </div>

    <div class="stick-container">
      <div class="stick">
        <div class:on={buttonMap.rstick} style="transform: {stickr()}" />
      </div>
    </div>

    <div class="button-group">
      <button class="button down" class:on={buttonMap.a} />
      <button class="button right" class:on={buttonMap.b} />
      <button class="button left" class:on={buttonMap.x} />
      <button class="button up" class:on={buttonMap.y} />
    </div>
    <div class="shoulder-group">
      <button class="button" class:on={buttonMap.rb} />
      <div class="trigger"><div style="height: {buttonMap.rt * 100}%" /></div>
    </div>
  </div>
</section>

<style>
  * {
    caret-color: transparent;
  }
  button {
    filter: none;
    cursor: default;
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

  section {
    background-color: var(--brown);
    color: white;

    display: block;

    margin: 0;
    border-radius: 0 0 10px 10px;
    padding: 1rem;
    text-align: center;
  }
  .warning {
    margin-bottom: 1rem;
  }

  /* GAMEPAD PROPER */
  .gamepad {
    background-color: var(--white);
    display: grid;
    grid-template-columns: .8fr 2fr 2fr 2fr 2fr .8fr;
    gap: 10px;

    width: 100%;
    max-width: 600px;

    margin: 0 auto;
    border-radius: 20px;
    border-bottom: solid 10px var(--orange);
    padding: 1rem;
    box-shadow: var(--shadow);
  }
  .stick-container {
    width: 100%;
    justify-content: center;
  }

  .stick {
    display: flex;
    align-items: center;
    justify-content: center;

    aspect-ratio: 1/1;
    width: 100%;
    border: 2px solid var(--orange);
    border-radius: 50%;
  }

  .stick div {
    aspect-ratio: 1/1;
    width: 50%;
    border: 2px solid var(--orange);
    border-radius: 50%;
  }

  .button-group {
    --btnWidth: 30%;
    --btnSpace: 100%;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1/1;
    width: 100%;
  }

  .button-group button {
    background-color: var(--white);
    position: absolute;
    aspect-ratio: 1/1;
    width: var(--btnWidth);
    border: 2px solid var(--orange);
    border-radius: 50%;
    padding: 0;
  }

  .button-group .up {
    transform: translateY(calc(-1 * var(--btnSpace)));
  }
  .button-group .down {
    transform: translateY(var(--btnSpace));
  }
  .button-group .left {
    transform: translateX(calc(-1 * var(--btnSpace)));
  }
  .button-group .right {
    transform: translateX(var(--btnSpace));
  }

  .shoulder-group {
    width: 100%;
    height: 100%;
  }

  .shoulder-group button {
    background-color: var(--white);
    display: flex;
    height: 30%;
    min-height: 5px;
    border: 2px solid var(--orange);
    border-radius: 5px;
    padding: 0;
  }

  .trigger {
    height: 70%;
    min-height: 5px;
    margin-top: 1px;
    border: 2px solid var(--orange);
    border-radius: 5px;
  }
  .trigger div {
    background-color: var(--blue);
    width: 100%;
    border-radius: 4px;
  }

  button.on,
  .on {
    background-color: var(--blue);
  }
</style>
