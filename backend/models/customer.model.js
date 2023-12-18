const sql = require("../dbConnect.js");
const Customer = function (customer) {
    this.name = customer.name;
    this.age = customer.age;
    this.gender = customer.gender;
    this.status = customer.status;
    this.reg_date = customer.reg_date;
    this.batch = customer.batch;

}

Customer.create = (customer, result) => {
    sql.query("INSERT INTO customer SET ?", customer, (err, res) => {
        if (err) {
            console.log("Error : ", err);
            result(err, null);
        } else {

            console.log("Created Customer");
            result(null, { id: res.insertId, ...customer });
        }
    })

}

Customer.updateById = (id, result) => {
    sql.query("UPDATE customer SET status = ? where id=?", ["isPaid", id], (err, res) => {
        if (err) {
            console.log("Error : ", err);
            result(err, null);
        } else if (res.affectedRows == 0) {
            result({ msg: "not_found" }, null);

        } else {
            result(null, { id: id, status: "isPaid" })
        }
    })
}
Customer.getCustomers = (result) => {
    sql.query("SELECT * FROM customer where status = ?", "reg", (err, res) => {
        if (err) {
            console.log("Error : ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}
module.exports = Customer;