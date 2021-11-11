window.onload = () => {
  const TABLE = document.querySelector(".table-container");

  // IIFE to get users on window load
  (function getUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => displayUsers(json));
  })();

  // Dynamically insert users in a table
  function displayUsers(users) {
    for (let i = 0; i < users.length; i++) {
      let newRow = TABLE.insertRow();
      let newCell = newRow.insertCell();
      let userRow = document.createTextNode(users[i].name);
      newCell.appendChild(userRow);
      newCell.classList.add("table-row");
      newCell.id = `${users[i].id}`;

    }

    // Initialize a posts array
    let posts = [];

    // IIFE to not constantly spam api
    (() => {
      fetch("https://jsonplaceholder.typicode.com/posts/")
        .then((res) => res.json())
        .then((json) => posts.push(json));
    })();

    // Grab where posts will go
    let postContainer = document.querySelector(".posts-container");

    // Display posts dynamically
    function displayPost(title, content) {
      postContainer.innerHTML += `<div class="posts">
        <h2>${title}</h2>
        <p>${content}</p>
        </div>`;
    }

    // Cycle through posts, when post matches user, calls displayPost()
    function getPosts(id) {
      postContainer.innerHTML = "";
      for (let i = 0; i < posts.length; i++) {
        for (let j = 0; j < posts[i].length; j++) {
          if (posts[i][j].userId == id) {
            const { title, body } = posts[i][j];
            displayPost(title, body);
          }
        }
      }
    }

    // Select user names
    let usersName = document.querySelectorAll(".table-container tbody tr td");

    function toggleClass(cell) {
        console.log(cell)
    }


    // Add click event for users
    usersName.forEach((user) =>
      user.addEventListener("click", (e) => {
        let id = e.target.id;
        if (e.target.id) {
          getPosts(id);
        }
      })
    );
  }
};
