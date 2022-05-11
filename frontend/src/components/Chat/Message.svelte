<script>
  export let currentUserID = 0
  export let message = {
    senderID: 0,
    senderName: 'BenGomez',
    msg: 'Default Msg',
    color: 'rgb(61, 132, 153)',
    text: 'white',
    timestamp: new Date(),
  }

  import { formatAMPM } from '../../functions/formats'

  const parseMessage = async (msg) => {
    const rgbRegex = /rgb\(\d+,\d+,\d+\)/g
    const imgRegex = /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim
    if (msg.match(rgbRegex)) {
      return { type: 'rgb', colors: [...msg.matchAll(rgbRegex)] }
    } else if (msg.match(imgRegex)) {
      return { type: 'img' }
    } else {
      return { type: 'txt' }
    }
  }
</script>

<!-- RGB DIV -->

{#await parseMessage(message.msg)}
  <li>LOADING...</li>
{:then parsedInfo}
  {#if parsedInfo.type === 'rgb'}
    {#each parsedInfo.colors as color}
      <li
        class={message.senderID === currentUserID
          ? 'message color you'
          : 'message color'}
      >
        <div class="header">
          <h3>{message.senderName}</h3>
          <time>{formatAMPM(new Date(message.timestamp))}</time>
        </div>
        <div class="color-box">
          <h2>{color}</h2>
          <div style="background-color:{color}" />
        </div>
      </li>
    {/each}
  {/if}

  <!-- IMG DIV -->
  {#if parsedInfo.type === 'img'}
    <li class={message.senderID === currentUserID ? 'message you' : 'message'}>
      <div class="header">
        <h3>{message.senderName}</h3>
        <time>{formatAMPM(new Date(message.timestamp))}</time>
      </div>
      <a href={message.msg} target="_blank">
        <img
          class={message.senderID === currentUserID ? 'you' : ''}
          src={message.msg}
          alt={message.msg}
          loading="lazy"
        />
      </a>
    </li>
  {/if}

  <!-- DEFAULT TO TEXTBOX -->
  {#if parsedInfo.type === 'txt'}
    <li class={message.senderID === currentUserID ? 'message you' : 'message'}>
      <div class="header">
        <h3>{message.senderName}</h3>
        <time>{formatAMPM(new Date(message.timestamp))}</time>
      </div>

      <p style="background-color: {message.color}; color: {message.text}">
        {message.msg}
      </p>
    </li>
  {/if}
{/await}

<style>
  .message {
    list-style: none;
    margin-bottom: 10px;
    width: fit-content;
    max-width: 95%;

    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
  }
  .message:hover {
    cursor: pointer;
  }
  .message .header {
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 3px;
    color: var(--white);
  }

  .message h3 {
    margin-right: 1rem;
    font-weight: normal;
    font-size: 1rem;
  }

  .message time {
    display: none;
    color: var(--white);
    margin-left: auto;
  }
  .message:hover time {
    display: inline;
    cursor: pointer;
  }

  .message p {
    /* text-align: center; */
    width: fit-content;
    max-width: 100%;
    border-radius: 10px;
    padding: 1rem;
  }

  .color-box h2 {
    background-color: var(--brown);
    color: white;
    text-align: center;

    width: 155px;
    border-radius: 5px 5px 0 0;
    padding: 5px;
    display: block;
    font-size: 1rem;
  }

  .color-box div {
    width: 100%;
    height: 2rem;
    border-radius: 0 0 5px 5px;
    border: solid 3px var(--brown);
    border-top: none;
  }

  img {
    border-radius: 5px;
    margin-top: 2px;
    max-height: 100px;
    display: flex;
  }

  /* Puts your messages on the right */
  .you {
    margin-left: auto;
  }
  .you > p {
    margin-left: auto;
  }
</style>
