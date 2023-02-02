const { createBudgetEntry, categories, budgetInformations, budgetEntries, takeAction, agencies } = require('../controllers')
const verifyAuth = require('../middlewares/verifyAuth')
const verifyDirector = require('../middlewares/verifyDirector')
const { check } = require('express-validator')
const router = require('express').Router()


router.post(
    '/createBudgetEntry',
    verifyAuth,
    [
        check('name').notEmpty().withMessage('Name is required').isLength({ max: "15" }).withMessage('Name must be less than 25 character'),
        check('category', 'Category is required').notEmpty(),
        check('description', 'Description must contain al least 25 and maximum 250 character').isLength({ min: 10, max: 250 }),
        check('amount').isNumeric().withMessage('Amount must be a number').isInt({ gt: 0, lt: 1000000 }).withMessage('Amount must be between 0 and 1000000'),
        check('agency', 'Agency is required').custom((value, { req }) => {
            if (req.user.type === 'director') {
                if (!value) {
                    throw new Error('Agency is required');
                }
            }
            return true;
        })
    ],
    createBudgetEntry
)

router.get('/categories', verifyAuth, categories)
router.get('/agencies', verifyAuth, verifyDirector, agencies)

router.get('/budgetInformations', verifyAuth, budgetInformations)

router.get('/budgetEntries', verifyAuth, budgetEntries)

router.post('/takeAction/:id', verifyAuth, verifyDirector, takeAction, budgetEntries)


module.exports = router