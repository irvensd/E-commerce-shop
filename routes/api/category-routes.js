const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
   Category.findAll({
     include:{model: Product}
   }).then(dbData => res.json(dbData))
   .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  // find all categories
  Category.findOne({
    where:{
      id: req.params.id
    },
    include:{model: Product}
  }).then(dbCategoryData => res.json(dbCategoryData))
  .catch((err) => {
   console.log(err);
   res.status(500).json(err);
 });
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  }
  ).then(dbData => res.json(dbData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(
    { category_name: req.body.category_name },
    {
      where: { id: req.params.id },
    }
  )
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "no category found with that id" });
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
 Category.destroy({
   where:{id:req.params.id}
 }) .then(dbCategoryData => {
  if (!dbCategoryData) {
    res.status(404).json({ message: 'No post found with this id' });
    return;
  }
  res.json(dbCategoryData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

module.exports = router;