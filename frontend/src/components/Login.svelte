<!-- JS -->
<script>
  import { onMount } from 'svelte'

  import { socket, page } from '../stores/AppStore'
  import { currentUser } from '../stores/UserStore'

  import { hexToRgb } from '../functions/formats'

  let defaults = {
    username: 'Username',
    color: '#3d8499',
    text: '#ffffff',
    time: new Date(),
  }

  let tab = 'login'

  onMount(() => document.getElementById('email').focus())

  //FORM SUBMIT FUNCTIONS
  const loginUser = (e) => {
    const payload = {
      email: e.target.email.value,
      password: e.target.password.value,
    }

    $socket.emit('user:login', payload, (response) => {
      if (response.code === 200) {
        $currentUser = response.payload
        localStorage.setItem('currentUser', JSON.stringify(response.payload))
        console.log(
          '%c ✔ Login Success',
          'color:rgb(63, 153, 82); font-weight: bold;'
        )
        console.log(
          '%c User Recieved',
          'color:rgb(61, 132, 153); font-weight: bold;'
        )

        console.dir($currentUser)
      } else {
        console.log(
          `%c ✖ Login Failed: ${response.message}`,
          'color:rgb(197, 69, 69); font-weight: bold;'
        )
        console.dir($currentUser)
      }
    })
  }

  const createUser = (e) => {
    const email = e.target.email.value
    const password1 = e.target.password1.value
    const password2 = e.target.password2.value
    const username = e.target.username.value

    const color = e.target.bgColor.value
    const text = e.target.txtColor.value

    if (password1 != password2) {
      return console.log('Passwords do not match')
    }
    if (username.length < 3) {
      return console.log('Username must be at least 3 characters')
    }

    const payload = {
      email: email,
      password: password1,
      name: username,
      color: hexToRgb(color),
      text: hexToRgb(text),
      icon: 'BROWSER',
    }

    $socket.emit('user:create', payload, (response) => {
      if (response.code === 201) {
        $currentUser = response.payload
        localStorage.setItem('currentUser', JSON.stringify(response.payload))
        console.log(
          '%c ✔ User Created',
          'color:rgb(63, 153, 82); font-weight: bold;'
        )

        console.dir(response.payload)
      } else {
        console.log(
          `%c ✖ Login Failed: ${response.message}`,
          'color:rgb(197, 69, 69); font-weight: bold;'
        )
      }
    })
  }
</script>

<!-- HTML -->
<section>
  <div class="container glass ">
    {#if $currentUser._id}
      <p>You are already Logged In</p>
      <button on:click={() => ($currentUser = {})}>Logout</button>
    {:else}
      {#if tab === 'login'}
        <h1>Login</h1>
        <form class="login " id="login" on:submit|preventDefault={loginUser}>
          <div class="input-group">
            <label for="email">Email</label>
            <!-- svelte-ignore a11y-autofocus -->
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email..."
              required
              autofocus
            />
          </div>

          <div class="input-group">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password..."
              required
            />
          </div>

          <input type="submit" value="Login" />
        </form>
        <div class="switch-tab-wrapper">
          <button class="switch-tab-btn" on:click={() => (tab = 'create')}
            >Create An Account</button
          >
        </div>
      {/if}

      {#if tab === 'create'}
        <form class="login" id="login" on:submit|preventDefault={createUser}>
          <h1>Create</h1>
          <div class="input-group">
            <label for="email">Email</label>
            <!-- svelte-ignore a11y-autofocus -->
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email..."
              required
              autofocus
            />
          </div>

          <div class="flex">
            <div class="input-group">
              <label for="password1">Password</label>
              <input
                type="password"
                name="password1"
                id="password1"
                placeholder="password..."
                required
              />
            </div>
            <div class="input-group">
              <label for="password2">Confirm</label>
              <input
                type="password"
                name="password2"
                id="password2"
                placeholder="password..."
                required
              />
            </div>
          </div>

          <div class="input-group">
            <label for="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username..."
              required
            />
          </div>

          <h3>Colors</h3>
          <div class="flex">
            <div class="color-group">
              <input
                type="color"
                class="color"
                name="bg-color"
                id="bgColor"
                value={defaults.color}
              />
            </div>

            <div class=" color-group">
              <input
                type="color"
                class="color"
                name="txt-color"
                id="txtColor"
                value={defaults.text}
              />
            </div>
          </div>

          <input type="submit" value="Create" />
        </form>
        <div class="switch-tab-wrapper">
          <button class="switch-tab-btn" on:click={() => (tab = 'login')}
            >Back To Login</button
          >
        </div>
      {/if}
    {/if}
  </div>
</section>

<!-- CSS -->
<style>
  .container {
    color: white;
    width: fit-content;
    margin: auto;
    border-radius: 5px;
    padding: 1rem 1.5rem;
  }

  form {
    margin-top: 1rem;
  }

  h1 {
    font-family: 'Oleo Script', cursive;
    text-align: center;
  }

  .flex {
    display: flex;
    gap: 5px;
  }

  .input-group {
    display: block;
    width: 100%;
    min-width: 5px;
    margin-bottom: 0.5rem;
  }

  label,
  h3 {
    display: block;
    font-size: 1rem;
    font-weight: normal;
    margin-bottom: 5px;
  }
  input[type='text'],
  input[type='password'],
  input[type='email'] {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    display: block;
    width: 100%;
    border-radius: 10px;
    border: 1px solid rgba(230, 229, 218, 0.575);
    padding: 1rem;
  }

  input[type='submit'] {
    background-color: transparent;
    border: 1px solid var(--blue);
    color: var(--blue);
    width: 100%;
    margin-top: 1rem;
    border-radius: 10px;
    padding: 1rem;
    font-weight: bold;
    cursor: pointer;
  }

  input[type='submit']:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: white;
  }

  .color-group {
    width: 100%;
  }

  input[type='color'] {
    width: 100%;
    height: 2.5rem;
    border-radius: 5px;
    border: 1px solid rgba(230, 229, 218, 0.35);
  }

  input[type='color']:hover {
    border: 1px solid white;
  }

  input[type='color']:focus {
    border: 1px solid white;
  }

  .switch-tab-wrapper {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
  }

  .switch-tab-btn {
    background-color: transparent;
    color: rgba(255, 255, 255, 0.5);
    width: fit-content;
    padding: 0;
  }
  .switch-tab-btn:hover {
    color: white;
  }
</style>
