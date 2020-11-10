const Property = require('../models/property');
const User = require('../models/user');

module.exports.add = async(req, res) => {
    await new Property({
        location: req.body.location,
        bhk: req.body.bhk,
        price: req.body.price,
        landlordId: req.body.landlordId
    }).save()
      .then(property => res.json(property))
      .catch(err => console.log(err));

    
}

module.exports.getAllProperty = async(req, res) => {
    await Property.find({}, (err, allProperty) => {
        if(err) {
            console.log(err);
            return;
        }

        return res.json(allProperty);
    });

}

module.exports.applyForProperty = async(req, res) => {
    await Property.findOne({_id: req.body.propertyId}, (err, property) => {
        if(err) {
            console.log(err);
            return;
        }
      
        property.tenants.push({
            id: req.body.userId,
            name: req.body.name, 
        });
        property.save();
    });
    
    await User.findOne({_id: req.body.userId}, (err, user) => {
        if(err){
            console.log(err);
            return;
        }

        user.wishlist.push({
            id: req.body.propertyId
        })
        user
            .save()
            .then(data => res.json(data))
            .catch(err => console.log(err));
    });
}

module.exports.getUserAppliedProperty = async(req, res) => {
    await User.findOne({_id: req.query.userId}, async(err, user) => {
        if(err){
            console.log(err);
            return;
        }

        let propertyData = [];
        await Promise.all(user.wishlist.map(async(item) => {
            await Property.findOne({_id: item.id}, (err, property) => {
               if(err){
                   console.log(err);
                   return;
               }
               propertyData.push({
                   location: property.location,
                   bhk: property.bhk,
                   price: property.price,
                   status: property.tenants[property.tenants.findIndex(tenant => tenant.id == req.query.userId)].status
               })
           })
       })).then(() => {
            console.log(propertyData);
            return res.json(propertyData);
        })
    })
} 