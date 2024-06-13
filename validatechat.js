module.exports = (req, res, next) => {
    const { from, to, msg } = req.body;
    const errors = [];

    if (!from || !from.trim()) {
        errors.push("From field is required.");
    }
    if (!to || !to.trim()) {
        errors.push("To field is required.");
    }
    if (!msg || !msg.trim()) {
        errors.push("Message field is required.");
    }

    if (errors.length > 0) {
        res.status(400).render("new.ejs", { errors, formData: req.body });
    } else {
        next();
    }
};
