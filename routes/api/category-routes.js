const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
  const categories = await Category.findAll({ include: [{ model: Product }]});
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error! Not found!'})
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id, { include: [{ model: Product }],});

    if (!category) {
      res.status(404).json({ message: 'Error! Not found!'});
      return;
    }

  res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error!'})
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body)
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'Error! Failed to create new category!'})
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updated = await Category.update(req.body, { where: { id: req.params.id}});
    !updated[0] ? res.status(404).json({ message: 'Error! ID not found'}) : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error! Update failed'});
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id}});
    if (deleted){
      res.status(200).json(deleted);
    }
    } catch (err) {
      res.status(500).json({ message: 'Error! Tags failed to delete!!'})
    }
});

module.exports = router;
