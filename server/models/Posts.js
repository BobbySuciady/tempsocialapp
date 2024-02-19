// Make table in mysql
module.exports = (sequelize, Datatypes) => {
    const Posts = sequelize.define("Posts", {
        title : {
            type: Datatypes.STRING,
            allowNull: false,
        },
        postText : {
            type: Datatypes.STRING,
            allowNull: false,
        },
        username : {
            type: Datatypes.STRING,
            allowNull: false,
        },
    })
    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, { //Each post has many comments
            onDelete: "cascade", //if delete post, then all comments related are also deleted
        });
        Posts.hasMany(models.Likes, { 
            onDelete: "cascade", 
        });
    }
    return Posts;
}