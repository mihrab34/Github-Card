const apiUrl = "https://api.github.com/users";
//  "https://api.github.com/users/username/repos"
const main = document.querySelector("#container");
const search = document.querySelector("#search");
const form = document.querySelector("form");

const fetchData = async function (username) {
  try {
    const response = await axios.get(apiUrl + "/" + username);
    // console.log(response.data);
    createCard(response.data);
    // fetchRepos(user);
  } catch (error) {
    if (error.response.status === 404) {
      createErrorCard("the username does not exist");
    }
  }
};

// fetchData('mihrab34');  testing fetchdata function

const displayRepos = (userRepo) => {
  const repoElement = document.querySelector(".links");

  userRepo.slice(0, 5).forEach((repo) => {
    const repoTag = document.createElement("a");
    repoTag.href = repo.html_url;
    repoTag.target = "_blank";
    repoTag.innerText = repo.name;

    repoElement.appendChild(repoTag);
  });
};

const fetchRepos = async function (username) {
  try {
    const response = await axios.get(apiUrl + "/" + username + "/repos");
    console.log(response.data);
    displayRepos(response.data);
  } catch (error) {
    if (error.response.status === 404) {
      createErrorCard("the username does not exist");
    }
  }
};

const createErrorCard = (message) => {
  const errorCard = `
    <div class='profile-card'>
    ${message}
    </div>
    `;
  main.innerHTML = errorCard;
};

const createCard = (user) => {
  const userCard = `
        <form>
            <input type="text" id="search" placeholder="Search a Github username">
        </form>
    <div class="profile-card">
        <div class="profile-image"><img src=${user.avatar_url}></div>

        <div class="profile-info">
            <h4>${user.login}</h4>
            <p>${user.bio}.</p>

            <ul>
                <li>${user.followers} followers</li>
                <li>${user.following} following</li>
                <li>${user.public_repos} repos</li>
            </ul>

            <div class="links"></div>
        </div>

    </div>
    `;
  main.innerHTML = userCard;
};

form.addEventListener("submit", (e) => {
  // alert('form is working');
  e.preventDefault();

  const user = search.value;

  if (user) {
    fetchData(user);
    fetchRepos(user);
    search.value = "";
  }
});
