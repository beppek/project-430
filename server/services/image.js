/**
 * Created by Beppe on 8/05/2016.
 */

var Image = require("../models/Image");

module.exports = {
    fetch: getImage
};

/**
 *
 * This function gets the image data and sends it back to client
 *
 * */
function getImage(req, res) {

    var searchImage = {
        _id: req.params.imageId
    };

    Image.findOne(searchImage, function(err, image) {
        if (err) {
            throw err;
        }

        if (image) {
            res.send(image);
        }

    })

}
