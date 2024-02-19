// Make table in mysql
module.exports = (sequelize, Datatypes) => {
    const Likes = sequelize.define("Likes");
    return Likes;
}