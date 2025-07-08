//localhost:8989/api/v1/category/createCategory
async function createCategoryController(req, res) {
  let { name, description, image } = req.body;
  res.send(req.body);
  const images = req.file.filename;
  
}

module.exports = createCategoryController;
