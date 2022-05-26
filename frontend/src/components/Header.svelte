<script>
  import { page } from '../stores/AppStore'
  import { currentUser } from '../stores/UserStore'

  //Toggle Chatroom Details Box
  const toggleMenu = () => {
    const firstListItem = document.querySelector('ul > button')
    firstListItem.focus()
  }

  const switchPage = (targetPage) => {
    $page = targetPage
    document.getElementById('menuBtn').focus()
  }
</script>

<header>
  <span class="pad" />

  <span class="center">
    <div class="logo-wrap">
      <div>
        <button class="logo" on:click={() => ($page = 'home')}
          >BenGomez.me</button
        >
      </div>
    </div>

    <span class="nav-wrap">
      <nav>
        <img src="assets/images/notch.svg" alt="notch.svg" />
        <button class="menu-btn" id="menuBtn" on:click={toggleMenu}>Menu</button
        >
      </nav>
    </span>

    <div class="SD-wrap hide-menu">
      <img
        class="SD-card"
        src="assets/images/SDcard.svg"
        alt="SD.svg"
        on:click={toggleMenu}
      />
      <ul class="SD-list" id="navList">
        <button
          bind:this={$currentUser}
          on:click={() => {
            $currentUser._id ? switchPage('profile') : switchPage('login')
          }}
        >
          {$currentUser._id ? 'Profile' : 'Login'}
        </button>
        {#if $currentUser._id}
          <button
            on:click={() => {
              switchPage('home')
              $currentUser = {}
              localStorage.clear()
            }}
          >
            Logout
          </button>
        {/if}
      </ul>
    </div>
  </span>
  <span class="pad" />
</header>

<style>
  header {
    --headerHeight: 100px;
    --notchWidth: 140px;
    --fontSize: 1rem;

    width: 100%;
    height: var(--headerHeight);
    margin-bottom: 2rem;
    text-align: center;
    display: flex;
    z-index: 100;
    filter: drop-shadow(0px 10px 0px rgb(0, 0, 0, 35%));
  }

  .pad {
    background-color: var(--white);
    width: var(--margin);
    border-bottom: solid 7px var(--orange);
    z-index: 100;
  }

  .center {
    display: flex;
    width: calc(100vw - 2 * (var(--margin)));
  }

  .logo-wrap {
    background-color: var(--white);
    display: flex;
    align-items: center;
    text-align: left;

    width: 100%;
    height: 100%;
    border-bottom: solid 7px var(--orange);
    z-index: 100;
  }
  .logo {
    background-color: transparent;
    color: var(--blue);

    text-align: left;
    font-family: 'Pacifico', cursive;
    font-size: calc(var(--fontSize) * 2);
    z-index: 100;
    cursor: pointer;
    caret-color: transparent;
  }

  .nav-wrap {
    width: var(--notchWidth);
    z-index: 100;
  }

  nav {
    display: grid;
    place-items: center;
    transform: translateY(-7px);
    height: 100%;
  }

  nav > img {
    width: var(--notchWidth);
    height: var(--headerHeight);
    filter: drop-shadow(0px 7px 0px var(--orange))
      drop-shadow(0px 7px 0px rgb(0, 0, 0, 35%));
  }

  .menu-btn {
    background-color: transparent;
    color: #726f66;
    position: absolute;

    width: 71.43%;
    border: solid 1px #726f66;
    padding: 0.6rem 1rem;

    text-align: center;
    font-family: 'Oleo Script', cursive;
    font-size: calc(var(--fontSize) * 1.1);
    font-weight: bold;
  }

  .menu-btn::after {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    content: '\f0d7';
    padding-left: 5px;
  }

  .SD-wrap {
    display: grid;
    place-items: center;

    position: absolute;
    z-index: 99;

    width: var(--notchWidth);

    top: 105px;
    right: var(--margin);
    transition: top 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }

  .SD-wrap > img {
    filter: drop-shadow(5px 5px 0px rgb(0, 0, 0, 35%))
      drop-shadow(-5px 5px 0px rgb(0, 0, 0, 35%));
  }

  .SD-wrap:focus-within {
    top: 105px;
  }

  .hide-menu {
    top: -40px;
  }

  .SD-card {
    width: 79.57%;
    cursor: pointer;
  }

  .SD-list {
    background-color: #00000035;
    position: absolute;
    top: 15px;

    width: 65%;
    height: 75%;
    border-radius: 10px;
    border: 3px solid rgba(0, 0, 0, 0.1);
  }

  .SD-list button {
    background: none;
    margin: 0;
    padding: 0;
  }

  .SD-list button {
    color: var(--white);
    font-size: calc(var(--fontSize) * 0.8);
    font-weight: bold;
    text-align: center;

    border-radius: 7px;
    padding: 10px;

    cursor: pointer;
  }
  .SD-list button:hover {
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
  }

  @media only screen and (max-width: 600px) {
    header {
      --headerHeight: 75px;
      --notchWidth: 100px;
      --fontSize: 0.8rem;
    }
    .menu-btn {
      padding: 0.5rem 0.8rem;
    }
    .SD-wrap {
      top: 80px;
    }
    .hide-menu {
      top: -25px;
    }
  }
</style>
