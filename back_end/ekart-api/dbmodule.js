var mongojs = require("./node_modules/mongojs");
var ObjectID = require('mongodb').ObjectID;
var databaseUrl = "localhost/ekart";
var db = mongojs(databaseUrl);

/*Users collection*/

exports.addUser = function (user, response) {
    db.users.save(user, function (err, saved) {
        if (!err && saved) {
            response.send(" saved data");
        } else {
            response.send("error saving data");
        }
    })
}

exports.addGuest = function (guest, response) {
    db.guest.save(guest, function (err, saved) {
        if (!err && saved) {
            var guestUser = {
                "username": saved._id,
                "type": "guest"
            }
            db.users.save(guestUser);
            response.json({ "username": guestUser.username });
        } else {
            response.json({ "error": true });
        }
    })
}

exports.updateUser = function (username, data, response) {
    db.users.update({ "username": username }, { $set: data }, { multi: true }, function (err, modified) {
        if (!err && modified.nModified) {
            response.send(" saved data");
        } else {
            response.send("error saving data");
        }
    })
}

exports.getUser = function (username, response) {
    db.users.findOne({ "username": username }, function (err, user) {
        if (err) {
            response.send("no data found");
        } else {
            response.json(user);
        }
    })
}

exports.getUserByEmail = function (email, response) {
    db.users.findOne({ "email": email }, function (err, user) {
        if (err) {
            response.send("no data found");
        } else {
            response.json(user);
        }
    })
}

exports.userDetails = function (userCredentials, response) {
    db.users.find(userCredentials, function (err, user) {
        if (err || !user) {
            response.json({ error: "no data found" });
        } else {
            response.json(user)
        }
    })
}

exports.listUsers = function (response) {
    db.users.find(function (err, user) {
        if (err || !user) {
            response.send("no data found");
        } else {
            response.json(user)
        }
    })
}


exports.deleteUser = function (params) {
    db.users.remove(params, function (err, deleted) {
        if (err) {
            console.log(err);
        }
    })
}

/*Products collection*/

exports.getProduct = function (id, response) {
    db.products.find({ "pid": id }, function (err, products) {
        if (err || !products) {
            response.send("no data found");
        } else {
            response.json(products)
        }
    })
}

exports.listProducts = function (query, response) {
    db.products.find({ "name": { "$regex": query, "$options": "i" } }, function (err, products) {
        if (err || !products) {
            response.send("no data found");
        } else {
            response.json(products)
        }
    })
}

exports.filterProducts = function (filter, response) {
    db.products.find(filter, function (err, products) {
        if (err || !products) {
            response.send("no data found");
        } else {
            response.json(products)
        }
    })
}

exports.updateProduct = function (pid, data, response) {
    db.products.update({ pid: pid }, { $set: data }, { multi: true }, function (err, modified) {
        if (!err && modified.nModified) {
            response.send(" saved data");
        } else {
            response.send("error saving data");
        }
    })
}

/*Cart collection*/

exports.getCart = function (username, response) {
    db.cart.aggregate(
        [
            { $match: { "username": username, "active": true } },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: 'pid',
                    as: 'details'
                }
            }
        ]
        , function (err, products) {
            if (err || !products) {
                response.send("no data found");
            } else {
                response.json(products)
            }
        })
}

exports.addToCart = function (data, response) {
    data.active = true;
    db.cart.find({ "username": data.username, "productId": data.productId }, function (err, products) {
        if (err || !products || products.length === 0) {
            exports.saveCart(data, response);
        } else {
            data.qty = parseInt(products[0].qty) + 1;
            exports.updateCart(data, response);
        }
    })

}

exports.saveCart = function (data, response) {
    db.cart.save(data, function (err, saved) {
        if (!err && saved) {
            exports.cartCount(data.username, response);
        } else {
            response.json({ "error": true });
        }
    })
}

exports.updateCart = function (data, response) {
    db.cart.update({ "username": data.username, "productId": data.productId }, { $set: { "qty": data.qty } }, { multi: true },
        function (err, saved) {
            if (!err && saved) {
                exports.cartCount(data.username, response);
            } else {
                response.json({ "error": true });
            }
        })
}

exports.updateCartUser = function (data, response) {
    db.cart.update(
        { "username": data.guest },
        { $set: { "username": data.username, type: "" } },
        { multi: true },
        function (err, saved) {
            if (!err && saved) {
                exports.deleteUser({ "username": data.guest, "type": "guest" });
                exports.cartCount(data.username, response);
            } else {
                response.json({ "error": true });
            }
        })
}

exports.cartCount = function (username, response) {
    db.cart.find({ "username": username, "active": true }, function (err, products) {
        var count = 0;
        if (!err && products) {
            for (var i = 0; i < products.length; i++) {
                count += products[i].qty;
            }
        }
        response.json({ "count": count });
    })
}

exports.deleteCart = function (data, response) {
    db.cart.remove({ "username": data.username, "productId": data.pid }, function (err, deleted) {
        if (!err) {
            exports.cartCount(data.username, response);
        } else {
            response.json({ "error": true });
        }
    })
}

/*Orders collection*/

exports.listOrders = function (username, response) {
    db.orders.find({ "username": username, "active": true }, function (err, orders) {
        if (err || !orders) {
            response.send("no data found");
        } else {
            response.json(orders)
        }
    })
}

exports.getOrder = function (id, response) {
    db.orders.find({ "_id": ObjectID(id) }, function (err, order) {
        if (err || !order) {
            response.send("no data found");
        } else {
            response.json(order)
        }
    })
}

exports.createOrder = function (data, response) {
    data.active = true;
    db.orders.save(data, function (err, saved) {
        if (!err && saved) {
            response.send(" saved data");
        } else {
            response.send("error saving data");
        }
    })
}

exports.deleteOrder = function (id, response) {
    db.orders.remove({ "_id": ObjectID(id) }, function (err, deleted) {
        if (!err) {
            response.send(" deleted record");
        } else {
            response.send("error deleting record");
        }
    })
}

exports.updateOrder = function (id, order, response) {
    delete order._id;/*Restrict modifying the immutable field _id*/
    db.orders.update({ "_id": ObjectID(id) }, { $set: order }, { multi: true }, function (err, modified) {
        if (!err && modified.nModified) {
            response.send(" saved data");
        } else {
            response.send("error saving data");
        }
    })
}

/*Wishlist collection*/

exports.getWishlist = function (username, response) {
    db.wishlist.aggregate(
        [
            { $match: { "username": username, "active": true } },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: 'pid',
                    as: 'details'
                }
            }
        ]
        , function (err, products) {
            if (err || !products) {
                response.send("no data found");
            } else {
                response.json(products)
            }
        })
}

exports.addToWishlist = function (data, response) {
    data.active = true;
    db.wishlist.save(data, function (err, saved) {
        if (!err && saved) {
            response.json({ "msg": "added to wishlist" });
        } else {
            response.json({ "error": true });
        }
    })
}

exports.deleteWishlist = function (data, response) {
    db.wishlist.remove({ "username": data.username, "productId": data.pid }, function (err, deleted) {
        if (!err) {
            response.json({ "msg": "item deleted successfully" });
        } else {
            response.json({ "error": true });
        }
    })
}

/*Notifications collection*/

exports.addNotification = function (notification, response) {
    db.notifications.save(notification, function (err, saved) {
        if (!err && saved) {
            response.send(" saved data");
        } else {
            response.send("error saving data");
        }
    })
}

exports.getNotifications = function (username, response) {
    db.notifications.find({ "username": username }, function (err, notifications) {
        if (err || !notifications) {
            response.send("no data found");
        } else {
            response.json(notifications)
        }
    })
}

exports.updateNotification = function (id, data, response) {
    db.notifications.update({ "notificationID": id }, { $set: data }, { multi: true }, function (err, modified) {
        if (!err && modified.nModified) {
            response.send(" saved data");
        } else {
            response.send("error saving data");
        }
    })
}

/*Products collection INSERT*/

exports.products = function () {
    /*Clear data*/
    db.products.remove({});
    db.products.insert([
        { pid: '1', name: "Fogg Brown Watch", spec: {}, deal: true, description: "Fogg Brown Day Watch For Men", brand: "Fogg", category: "watch", instock: true, rate: "1200", discount: "10", image: "1", deliveryCharge: 10, "avgRating": 4, "reviews": [{ "username": "Saran", "title": "jobin", "comment": "Excellent watch ", "rating": 4 }, { "username": "Saran", "title": "Brahman", "comment": "Good color ", "rating": 4 }] },
        { pid: '2', name: "Fogg Day And Date Watch", spec: {}, description: "Fogg Day And Date Watch For Men", brand: "Fogg", category: "watch", instock: true, rate: "1900", discount: "10", image: "2", deliveryCharge: 10, "avgRating": 4, "reviews": [{ "username": "Saran", "title": "Abraham", "comment": "Excellent design ", "rating": 4 }, { "username": "Joy", "title": "jobin", "comment": "Best watch i bought", "rating": 4 }] },
        { pid: '3', name: "Sonata Volt watch", spec: {}, description: "Sonta Volt Watch For Men", brand: "sonata", category: "watch", instock: false, rate: "1500", discount: "10", image: "3", deliveryCharge: 10, "avgRating": 4, "reviews": [{ "username": "Saran", "title": "sandeep", "comment": "Best watch in the market", "rating": 4 }, { "username": "Saran", "title": "Anil", "comment": "Worth for the price", "rating": 4 }] },
        { pid: '4', name: "Fogg Blue Day Watch", spec: {}, description: "Fogg Blue Day Watch For Men", brand: "Fogg", category: "watch", instock: true, rate: "1000", discount: "5", image: "4", deliveryCharge: 10, "avgRating": 4, "reviews": [{ "username": "Saran", "title": "Fincy", "comment": "Best in market", "rating": 4 }, { "username": "Saran", "title": "Sajin", "comment": "Good qaulity", "rating": 4 }] },
        { pid: '5', name: "Hero Skyper Cycle", spec: {}, description: "Hero Skyper Mountain Cycle For Men", brand: "Hero", category: "cycle", instock: true, rate: "20000", discount: "15", image: "5", deliveryCharge: 10, "avgRating": 4, "reviews": [{ "username": "Saran", "title": "Abraham", "comment": "Good quality ", "rating": 4 }, { "username": "Saran", "title": "jobin", "comment": "Light weight ", "rating": 4 }] },
        { pid: '6', name: "Hero Road Cycle", spec: {}, description: "Hero Quicker Road Cycle For Men", brand: "Hero", category: "cycle", instock: true, rate: "10000", discount: "10", image: "6", deliveryCharge: 10, "avgRating": 4, "reviews": [{ "username": "Saran", "title": "Brahman", "comment": "Better design", "rating": 4 }, { "username": "Saran", "title": "Jacob", "comment": "Excellent service ", "rating": 4 }] },
        { pid: '7', name: "Hercules Crusher Cycle", spec: {}, description: "Hercules Crusher Mountain Cycle For Men", brand: "Hercules", category: "cycle", instock: true, rate: "15000", discount: "10", image: "7", deliveryCharge: 10, "avgRating": 4, "reviews": [{ "username": "Saran", "title": "Abraham", "comment": "Good service ", "rating": 4 }, { "username": "Saran", "title": "Jay", "comment": "Good  color ", "rating": 4 }] },
        { pid: '8', name: "Hero Stomper Cycle", spec: {}, description: "Hero Stomper Recreation Cycle For Men", brand: "Hero", category: "cycle", instock: true, rate: "25000", discount: "20", image: "8", deal: true, deliveryCharge: 10, "avgRating": 4, "reviews": [{ "username": "Saran", "title": "Roshan", "comment": "Best product ", "rating": 4 }, { "username": "Saran", "title": "Mohith", "comment": "Easy to use ", "rating": 4 }] },
        { pid: '9', name: "Oricum White Sneakers", spec: {}, description: "Oricum White Sneakers For Men", brand: "Oricum", category: "sneakers", instock: false, rate: "1500", discount: "12", image: "9", deal: true, deliveryCharge: 10, "avgRating": 4, "reviews": [{ "username": "Saran", "title": "Abraham", "comment": "Excellent qaulity ", "rating": 4 }, { "username": "Saran", "title": "jobin", "comment": "Good color", "rating": 4 }] },
        { pid: '10', name: "Addidas Red Black Sneakers", spec: {}, description: "Addidas Red  Black Sneakers For Men", brand: "Addidas", category: "sneakers", instock: false, rate: "2000", discount: "10", image: "10", deliveryCharge: 10, "avgRating": 4, "reviews": [{ "username": "Saran", "title": "Brahman", "comment": "Correct fit ", "rating": 4 }, { "username": "Saran", "title": "Saran", "comment": "Good qaulity ", "rating": 4 }] },
        { pid: '11', name: "Puma Grey Sneakers", spec: {}, description: "Puma Grey Sneakers For Men", brand: "Puma", category: "sneakers", instock: false, rate: "2500", discount: "5", image: "11", deliveryCharge: 10, "avgRating": 4, "reviews": [{ "username": "Saran", "title": "Sandeep", "comment": "Good service", "rating": 4 }, { "username": "Saran", "title": "Anil", "comment": "Awsome product", "rating": 4 }] },
        { pid: '12', name: "DC Black Sneakers", spec: {}, description: "DC Black Sneakers For Men", brand: "DC", category: "sneakers", instock: false, rate: "3500", discount: "10", image: "12", deliveryCharge: 10, "avgRating": 4, "reviews": [{ "username": "Saran", "title": "Aanad", "comment": "Hell of a product !!", "rating": 4 }, { "username": "Saran", "title": "Martin", "comment": "Delivered on time ", "rating": 4 }] },
        { pid: '13', name: "One Plus 6", spec: {}, description: "One Plus 6 128GB, 16Gb Ram Black", brand: "One plus six", category: "phone", instock: false, rate: "45000", discount: "8", image: "13", deal: true, deliveryCharge: 10, "avgRating": 4, "reviews": [{ "username": "Saran", "title": "Brahman", "comment": "Suits my req.", "rating": 4 }, { "username": "Saran", "title": "Saran", "comment": "Good perfomance", "rating": 4 }] },
        { pid: '14', name: "Samsung Galaxy S6", spec: {}, description: "Samsung Galaxy S6 128GB, 16Gb Ram Black", brand: "Samsung", category: "phone", instock: false, rate: "30000", discount: "12", image: "14", deliveryCharge: 10, "avgRating": 4, "reviews": [{ "username": "Saran", "title": "Abraham", "comment": "Better color selection ", "rating": 4 }, { "username": "Saran", "title": "Saran", "comment": "Full hs is good", "rating": 4 }] },
        { pid: '15', name: "Note 5 Pro", spec: {}, description: "Note 5 Pro 16GB, 4Gb Ram Black", brand: "Note", category: "phone", instock: false, rate: "25000", discount: "10", image: "15", deliveryCharge: 10, "avgRating": 4, "reviews": [{ "username": "Saran", "title": "Brahman", "comment": "Worth every peny ", "rating": 4 }, { "username": "Saran", "title": "Saran", "comment": "Good product", "rating": 4 }] },
        { pid: '16', name: "Moto G5 plus", spec: {}, description: "Moto G5 plus 16GB, 4Gb Ram Black", brand: "Moto", category: "phone", instock: false, rate: "16600", discount: "10", image: "16", deliveryCharge: 10, "avgRating": 4, "reviews": [{ "username": "Saran", "title": "Anil", "comment": "Supports all kind of games", "rating": 4 }, { "username": "Saran", "title": "Anand", "comment": "Good perf ", "rating": 4 }] },
    ])
};