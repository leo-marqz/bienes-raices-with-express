
async function home(req, res) {
  res.render("home", {
    page: "Inicio",
  });
}

async function categories(req, res) {
  res.render("categories");
}

async function pageNotFound(req, res) {
    res.render("app/404");
}

async function search(req, res) {
    res.render("search");
}

export {
    home,
    categories,
    pageNotFound,
    search
}