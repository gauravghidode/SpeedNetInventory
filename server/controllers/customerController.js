import Customer from "../models/customer.js";

export const addCustomer = async(req, res) => {
    try {
        const customer = new Customer({
            customerFName: req.body.customerFName,
            customerLName: req.body.customerLName,
            email: req.body.email,
            contact: req.body.contact,
            address: {
                street: req.body.street,
                city: req.body.city,
                country: req.body.country,
                zip: req.body.zip,
            },
            role:req.body.role
        });
        const newCustomer = await customer.save();
        res.status(201).json(newCustomer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

