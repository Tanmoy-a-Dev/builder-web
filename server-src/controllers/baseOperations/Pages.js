// importing required models
const { pages: Page } = require('../../utils/database');


exports.addPage = async (req, res, next) => {
    // const { pageName, pageSlug } = req.body;
    try {
        const page = await Page.create({...req.body, datas: {}});
        res.status(200).json({
            success: true,
            page
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
};

exports.UpdatePage = async (req, res, next) => {
    // console.log(req.body)
    try {
        const page = await Page.findOne({ where: { id: req.params.id } });
        await page.update({  datas: req.body });
        res.status(200).json({
            success: true,
            page
        })
        // console.log(res)
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
};

exports.deletePage = async (req, res, next) => {
    try {
        const page = await Page.findOne({ where: { id: req.params.id } });

        await page.destroy();
        res.status(200).json({
            success: true,
            page: page.pageName
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
};

exports.allPages = async (req, res, next) => {
    try {
        const pages = await Page.findAll();
        // console.log(pages)
        res.status(200).json({
            success: true,
            pages
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
};

exports.singlePage = async (req, res, next) => {
    console.log(req.params)
    try {
        const page = await Page.findOne({ where: { id: req.params.id } });
        // console.log(page.datas)
        res.status(200).json(page)
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
};

