<script>
  import MorseDecoder from '../components/MorseDecoder.svelte'
  import Message from './Chat/Message.svelte'
  import Footer from './Footer.svelte'

  import { page } from '../stores/AppStore'

  const fullscreen = (e) => {
    console.log(e.target.dataset.page)
    $page = e.target.dataset.page
  }
</script>

<main>
  <div class="hero" id="hero">
    <div class="center-wrap">
      <h1>Welcome to my Website!</h1>
      <p>I reserve the right to break it on a whim...</p>
    </div>
  </div>

  <div class="flex-container" id="contentContainer">
    <div class="morse-decoder card" id="morseDecoder">
      <div class="card-header">
        <h2>Morse Decoder</h2>
        <p on:click={() => ($page = 'morse')}>fullscreen &#10530;</p>
      </div>
      <MorseDecoder />
    </div>

    <div class="chat card" id="chat">
      <div class="card-header">
        <h2>Chat</h2>
      </div>

      <div class="preview glass" on:click={() => ($page = 'chat')}>
        <Message
          message={{
            senderID: 1,
            senderName: 'BenGomez.me',
            msg: 'Hello World!',
            color: 'rgb(61, 132, 153)',
            text: 'white',
            timestamp: new Date(),
          }}
        />
        <Message
          message={{
            senderID: 0,
            senderName: 'You',
            msg: 'hi!',
            color: 'rgb(199, 176, 92)',
            text: 'black',
            timestamp: new Date(),
          }}
        />
      </div>
      <div class="chin">
        <div class="inline">
          <div class="triangle" id="triangle-bottomleft" />
          <div class="triangle" id="triangle-bottomright" />
        </div>
        <div class="link-wrap">
          <a href="/">Chat API</a>
        </div>
      </div>
      <!-- <div class="code-links">
        <h1>Connect a Device:</h1>
        <ul>
          <li><a href="/">Arduino (C++)</a></li>
          <li><a href="/">Raspberry Pi (Python)</a></li>
        </ul>
      </div> -->
    </div>
  </div>

  <div class="games">
    <div class="card-header">
      <h2>Games</h2>
    </div>

    <ul class="games-list">
      <a href="/projects/AmazingAsteroids/index.html">
        <li>
          <img
            src="../assets/images/AmazingAstroidCartridge.png"
            alt="Amazing Astroids PNG"
          />
        </li>
      </a>

      <a href="/projects/SafeCracker/index.html">
        <li>
          <img
            src="../assets/images/SafeCrackerCartridge.png"
            alt="Safe Cracker PNG"
          />
        </li>
      </a>

      <a href="/projects/RockPaperScissors/index.html">
        <li>
          <img
            src="../assets/images/RockPaperScissorsCartridge.png"
            alt="Rock Paper Scissors PNG"
          />
        </li>
      </a>
    </ul>
  </div>
  <Footer />
</main>

<style>
  main {
    --chin-width: 30px;
    --chin-height: 10px;
    margin: auto;
  }

  h2 {
    color: white;
    font-family: 'Oleo Script', cursive;
  }

  .center-wrap {
    margin: auto;
    width: fit-content;
  }

  /* HERO */
  .hero {
    font-family: 'Oleo Script', cursive;
    color: white;
    height: 100%;
    padding: 5rem 0 8rem 0;
  }

  .hero h1 {
    font-size: 3rem;
  }

  .hero p {
    color: rgba(255, 255, 255, 0.45);
    margin-left: 2rem;
    font-size: 1.5rem;
  }

  .flex-container {
    display: flex;
    gap: 3rem;
  }

  .card {
    width: 50%;
    min-width: 200px;
  }

  .card-header {
    display: flex;
    align-items: center;
  }

  .card-header p {
    color: rgb(145, 145, 145);
    margin-left: auto;
    cursor: pointer;
    user-select: none;
  }
  .card-header p:hover {
    color: white;
  }

  .morse-decoder {
    transition: width 2s, height 2s;
  }

  .chat {
    transition: width 2s;
  }

  .chat .preview {
    min-width: 300px;
    border-radius: 5px 5px 0 0;
    padding: 1rem;
    padding-bottom: calc(var(--chin-height) + 1rem);
    cursor: pointer;
  }

  .chat .preview:hover {
    border: 1px solid white;
  }

  .chin {
    transform: translateY(-25px);
    filter: drop-shadow(0 -5px 0 var(--orange));
  }

  .inline {
    display: flex;
    width: 100%;
  }

  .triangle {
    width: var(--chin-width);
  }

  #triangle-bottomleft {
    border-bottom: var(--chin-height) solid var(--white);
    border-right: var(--chin-height) solid transparent;
  }

  #triangle-bottomright {
    margin-left: auto;
    border-bottom: var(--chin-height) solid var(--white);
    border-left: var(--chin-height) solid transparent;
  }

  .link-wrap {
    background-color: var(--white);
    text-align: right;
    width: 100%;
    border-radius: 0 0 5px 5px;
    padding: 0.25rem 0;
  }
  .link-wrap a {
    padding: 0 1rem;
    color: var(--black);
    font-family: 'Oleo Script', cursive;
  }
  /* .code-links h1 {
    font-size: 1.5rem;
    color: white;
  }
  .code-links li {
    margin: 5px 0;
  } */

  .games {
    width: fit-content;
    margin: 0 auto 2rem auto;
  }
  .games-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    gap: 10px;
  }

  .games-list a:hover {
    animation: gameHover 1s ease-in-out;
    animation-iteration-count: infinite;
  }

  @keyframes gameHover {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-10px);
    }

    100% {
      transform: translateY(0);
    }
  }

  .games-list img {
    width: 100%;
    max-width: 300px;
  }

  @media only screen and (max-width: 1000px) {
    .flex-container {
      flex-wrap: wrap;
    }
    .card {
      width: 100%;
    }
  }
</style>
