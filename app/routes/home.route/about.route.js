const { Controller } = require('../../../core/Controller');
const { View } = require('../../../core/View');
class AboutRoute extends Controller {
    constructor(app) {

        super(app);
        this.controller = new Controller(app);
        this.v = View;
    }
    Route() {

        let { controller, v } = this;
        controller.GET('/about', [], (req, res) => {

            v.view(res, 'home.views/about', {

                title1: 'Follow Me in Github:',
                title2: 'restuwahyu13',
                title3: 'Follow Me in Facebook:',
                title4: 'Restu Wahyu Saputra'
            });
        });
    }
}

module.exports = { AboutRoute };