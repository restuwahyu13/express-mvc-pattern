class View {
    static view(res, view, data) {

        res.render('../../app/views/' + view, data);
    }
}

module.exports = { View };