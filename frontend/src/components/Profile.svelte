<script>
  import { socket } from '../stores/AppStore'
  import { currentUser } from '../stores/UserStore'
  import { rgbToHex, hexToRgb } from '../functions/formats'

  const updateProfile = (e) => {
    e.preventDefault()

    //form data
    let username = e.target.username.value.trim()
    let email = e.target.email.value.trim()
    let password = e.target.password.value.trim()
    let color = hexToRgb(e.target.color.value)
    let text = hexToRgb(e.target.text.value)

    //check different
    if (username === $currentUser.name) username = null
    if (email === $currentUser.email) email = null
    if (color === $currentUser.color) color = null
    if (text === $currentUser.text) text = null

    //Only send values that are different and need to be updated
    const payload = {
      _id: $currentUser._id,
      update: {
        ...(username && { name: username }),
        ...(email && { email }),
        ...(password && { password }),
        ...(color && { color }),
        ...(text && { text }),
      },
    }

    //nothing different return
    if (Object.keys(payload).length <= 1) return

    $socket.emit('user:update', payload, (response) => {
      $currentUser = response
      localStorage.setItem('currentUser', JSON.stringify(response))
      console.log(
        '%c ✔ User Updated',
        'color:rgb(63, 153, 82); font-weight: bold;'
      )
      // console.dir(response)
    })
  }
</script>

{#if $currentUser}
  <section class="profile ">
    <div class="body glass">
      <form on:submit={updateProfile}>
        <h1>Profile</h1>
        <label for="username">Username</label>
        <input
          class="input"
          name="username"
          type="text"
          value={$currentUser.name}
        />
        <label for="email">Email</label>
        <input
          class="input"
          name="email"
          type="email"
          value={$currentUser.email}
        />
        <label for="password">Password</label>
        <input
          class="input"
          name="password"
          type="password"
          placeholder="password..."
        />

        <label for="colors">Colors</label>
        <div class="color-container">
          <input
            type="color"
            name="color"
            value={rgbToHex($currentUser.color)}
          />
          <input type="color" name="text" value={rgbToHex($currentUser.text)} />
        </div>

        <button>Update Profile</button>
      </form>
    </div>
    <div class="details">
      <p>ID: <span>{$currentUser._id}</span></p>
      <p>Created At: {$currentUser.createdAt}</p>
      <p>Updated At: {$currentUser.updatedAt}</p>
      <button id="deleteUser">Delete User</button>
    </div>
  </section>
{:else}
  <section>
    <h1>No User Found</h1>
  </section>
{/if}

<style>
  .profile {
    color: white;
    width: fit-content;
    margin: auto;
  }

  h1 {
    text-align: center;
    font-family: 'Oleo Script', cursive;
  }

  .body {
    width: 285px;
    margin-bottom: 5px;
  }

  form {
    padding: 1rem;
  }

  form label {
    display: block;
  }

  .input {
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    display: block;
    width: 100%;
    margin-bottom: 1rem;
    border-radius: 5px;
    padding: 0.5rem;
    font-size: 1rem;
  }

  .color-container {
    display: flex;
    width: 100%;
    margin-bottom: 1rem;
    border-radius: 5px;
    padding: 0;
    gap: 5px;
  }

  input[type='color'] {
    width: 100%;
    height: 2.5rem;
  }

  input[type='color']::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  input[type='color']:hover {
    border: 1px solid rgba(255, 255, 255);
    border-radius: 3px;
  }

  form button {
    background-color: transparent;
    color: white;
    margin-top: 0;
    border: 1px solid var(--blue);
    border-radius: 5px;
    padding: 0.8rem;

    font-family: 'Oleo Script', cursive;
    font-size: 1rem;
  }

  form button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .details {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.8rem;
    font-family: monospace;
    text-align: right;
  }

  #deleteUser {
    background-color: transparent;
    color: rgb(255, 70, 70);
    width: fit-content;
    padding: 5px;
  }
</style>
