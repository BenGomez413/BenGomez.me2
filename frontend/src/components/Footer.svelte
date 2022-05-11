<script>
  import { currentUser } from '../stores/UserStore'
  const submitContact = (e) => {
    e.preventDefault()

    const payload = {
      _id: 'id for contact chatroom',
      save: true,
      message: {
        senderID: $currentUser._id,
        senderName: $currentUser.name,
        color: 'rgb(61, 132, 153)',
        text: 'rgb(255, 255, 255)',
        msg: `${e.target.email.value}: ${e.target.message.value}`,
        timestamp: Date.now(),
      },
    }

    console.log(payload)
  }
</script>

<footer>
  <div>
    <h1>Contacts</h1>
    <a href="mailto:contact@bengomez.me">
      <i class="fa-solid fa-envelope" /> contact@bengomez.me
    </a>
    <a href="https://github.com/BenGomez413"
      ><i class="fa-brands fa-github" /> GitHub</a
    >
    <a href="https://www.linkedin.com/in/benjamin-gomez413/"
      ><i class="fa-brands fa-linkedin" /> LinkedIn</a
    >
  </div>

  <div class="form-wrapper glass">
    <form on:submit={submitContact}>
      <div class="input-group">
        <label for="user">Name</label>
        <input type="text" name="user" placeholder="name" required />
      </div>
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="email" required />
      </div>
      <div class="input-group">
        <label for="message">Message</label>
        <input type="text" name="message" placeholder="message" required />
      </div>
      <button>Send Message</button>
    </form>
  </div>
</footer>

<style>
  footer {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    justify-content: center;

    left: 0;
    width: 100%;
    padding: 2rem;
  }

  h1 {
    color: white;
    font-family: 'Oleo Script', cursive;
  }
  a {
    display: block;
    font-size: 1.2rem;
  }
  i {
    margin-right: 5px;
  }

  .form-wrapper {
    padding: 0.5rem;
  }

  .input-group {
    margin-bottom: 0.5rem;
  }

  form label {
    color: rgb(187, 187, 187);
    display: block;
  }

  form input {
    background-color: var(--black);
    color: white;
    padding: 0.5rem;
  }
  form button {
    background-color: transparent;

    border: 1px solid var(--blue);
    padding: 0.5rem;
  }
</style>
