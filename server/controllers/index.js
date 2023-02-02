const Category = require("../models/Category")
const BudgetEntry = require("../models/BudgetEntry")
const pastExpense = require('../models/pastExpense');
const budgetEntry = require('../models/budgetEntry');
const { validationResult } = require('express-validator');
const Agency = require("../models/Agency");


exports.createBudgetEntry = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, category, description, amount } = req.body

        await BudgetEntry.create({
            name,
            categoryId: category,
            description,
            amount,
            date: Date.now(),
            status: "pending",
            agencyId: req.user.agencyId
        })

        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(500)
    }
}

exports.categories = async (req, res) => {
    try {
        const categories = await Category.findAll()
        res.status(200).json(categories)
    } catch (error) {
        res.sendStatus(500)
    }
}

exports.agencies = async (req, res) => {
    try {
        const agencies = await Agency.findAll()
        res.status(200).json(agencies)
    } catch (error) {
        res.sendStatus(500)
    }
}

exports.budgetInformations = async (req, res) => {
    try {
        let agencyId = req.user.agencyId;
        let isDirector = req.user.type === 'director';

        // Get all categories
        const categories = await Category.findAll();

        const budgetData = [];
        for (const category of categories) {
            // Only filter by agencyId if the user is not a director
            let filter = isDirector ? {} : { agencyId };
            filter = { ...filter, categoryId: category.id };

            const lastYearExpenses = await pastExpense.sum('amount', {
                where: filter,
            });

            // Calculate the new budget for this category
            const newBudget = await budgetEntry.sum('amount', {
                where: { ...filter, status: 'approved' },
            });

            budgetData.push({
                category: category.name,
                lastYearExpenses: lastYearExpenses || 0,
                newBudget: newBudget || 0,
            });
        }

        res.status(200).json(budgetData);
    } catch (error) {
        res.sendStatus(500);
    }
};
exports.budgetEntries = async (req, res) => {
    try {
        const entries = await BudgetEntry.findAll({
            include: [
                { model: Category, as: 'category' },
                { model: Agency, as: "Agency" }
            ],
            where: req.user.type === 'normal' ? { agencyId: req.user.agencyId } : req.user.type === 'director' && {},
            order: [
                ['status', 'DESC']
            ],
        });

        entries?.sort((a, b) => {
            if (a.status === 'pending' && b.status !== 'pending') {
                return -1;
            }
            if (a.status === 'approved' && b.status === 'denied') {
                return -1;
            }
            return 1;
        });
        res.status(200).json(entries)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.takeAction = async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const entry = await BudgetEntry.findByPk(id)

        if (entry.status === 'pending') {
            entry.status = status
            await entry.save()
        }

    } catch (err) {

    }

    next()
}