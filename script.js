(() => {
  function getNumberPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get("page");
    return page ? page : 1;
  }

  function loadPage(num) {
    fetch(`https://gorest.co.in/public-api/posts?page=${num}`)
      .then((response) => response.json())
      .then((data) => getPage(data));
  }

  loadPage(getNumberPage());

  function getPage(data) {
    const paginationList = document.getElementById("pagination-list");
    const paperList = document.getElementById("paper-list");

    if (paginationList && paperList) {
      for (
        let pageNumbers = 1;
        pageNumbers <= data.meta.pagination.pages;
        pageNumbers++
      ) {
        const paginationItem = document.createElement("li");
        const paginationLink = document.createElement("a");

        paginationLink.href = "?page=" + pageNumbers;
        paginationLink.innerText = pageNumbers;
        paginationItem.style = "width: 50px; margin: 2px;";
        paginationLink.classList.add(
          "page-link",
          "link-dark",
          "list-group-item-action",
          "list-group-item-light",
          "text-center"
        );
        paginationList.append(paginationItem);
        paginationItem.append(paginationLink);
      }
      for (const elem of data.data) {
        const linkTitle = document.createElement("a");
        linkTitle.setAttribute("href", "post.html?id=" + elem.id);
        linkTitle.innerText = elem.title;
        linkTitle.classList.add(
          "list-group-item",
          "list-group-item-action",
          "list-group-item-light",
          "link-dark"
        );
        paperList.append(linkTitle);
      }
    }
  }

  function getNumberPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    return id;
  }

  function loadTextPost(num) {
    fetch(`https://gorest.co.in/public-api/posts?id=${num}`)
      .then((response) => response.json())
      .then((data) => getTextPost(data));
  }

  loadTextPost(getNumberPost());

  function loadAuthorPost(num) {
    fetch(`https://gorest.co.in/public-api/comments?id=${num}`)
      .then((response) => response.json())
      .then((data) => getAuthorPost(data));
  }

  loadAuthorPost(getNumberPost());

  function getTextPost(data) {
    for (const elem of data.data) {
      const title = document.getElementById("title");
      const text = document.getElementById("text");
      title.innerText = elem.title;
      text.innerText = elem.body;
    }
  }

  function getAuthorPost(data) {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const comment = document.getElementById("comment");
    for (const elem of data.data) {
      name.innerHTML = `<strong class="text-dark">Имя автора:</strong> ${elem.name}`;
      email.innerHTML = `<strong class="text-dark">E-mail автора:</strong> ${elem.email}`;
      comment.innerHTML = `<strong class="text-dark">Комментарий:</strong> ${elem.body}`;
    }
  }
  
  function returnBackward() {
    const backwardBtn = document.getElementById("backward");
    if (backwardBtn) {
      backwardBtn.innerText = "<";
      backwardBtn.addEventListener("click", () => {
        window.history.back();
      });
    }
  }
  returnBackward();
})();
