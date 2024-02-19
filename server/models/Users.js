// Make table in mysql
module.exports = (sequelize, Datatypes) => {
    const Users = sequelize.define("Users", {
        username : {
            type: Datatypes.STRING,
            allowNull: false,
        },
        password : {
            type: Datatypes.STRING,
            allowNull: false,
        },
    })
   Users.associate = (models) => {
        Users.hasMany(models.Likes, { //Each post has many comments
            onDelete: "cascade", //if delete post, then all comments related are also deleted
        });

        Users.hasMany(models.Posts, { 
            onDelete: "cascade", 
        });

    }
    return Users;
}