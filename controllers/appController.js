
async function home(req, res) {

  const { id } = req.user ?? "";

  res.render("home", {
    page: "Inicio",
    user_id: id
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