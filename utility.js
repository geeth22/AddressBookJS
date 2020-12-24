const fs = require('fs');
var readlineSync = require('readline-sync');
const user = require('./addressbook.json');

class Addressbook {

    readFile = () => {
        fs.readFile('./addressbook.json', (err, user) => {
            if (err) {
                console.log(err);
            }
            else {
                const object = JSON.parse(user);
                console.log(object);
            }
        })
    }

    writeFilePromise = () => {
        try {
            return new Promise((resolve, reject) => {
                var name = readlineSync.question('Enter name: ');
                var address = readlineSync.question('Enter address: ');
                var email = readlineSync.question('Enter email: ');
                var number = readlineSync.question('Enter number: ');

                var nameio = /^[A-Za-z0-9]{1,}$/
                var addressio = /^[A-Za-z0-9]{1,}$/
                var emailio = /^([a-zA-Z0-9_.$*&!+-]+)@([a-z0-9]+).([a-z.]{2,7})$/
                var numberio = /^[0-9]{10}$/

                const namepattern = nameio.test(name);
                const addresspattern = addressio.test(address);
                const emailpattern = emailio.test(email);
                const numberpattern = numberio.test(number);

                if (namepattern == true) {
                    if (addresspattern == true) {
                        if (emailpattern == true) {
                            if (numberpattern == true) {
                                user.push({
                                    name: name,
                                    address: address,
                                    email: email,
                                    number: number
                                })
                                console.log("added successfully");
                            }
                            else {
                                console.log("enter valid number");
                            }
                        }
                        else {
                            console.log("enter valid email");
                        }
                    }
                    else {
                        console.log("enter valid address");
                    }
                }
                else {
                    console.log("enter valid name");
                }
                fs.writeFile('./addressbook.json', JSON.stringify(user, null, 2), error => {
                    if (error) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            })
        } catch (err) {
            console.log(err);
        }
    }

    search = () => {
        var searchh = readlineSync.question("enter name to search: ");
        var found = user.find(it => it.name === searchh)
        if (found) {
            var arrfound = user.filter(it => it.name === searchh)
            console.log(arrfound);
        }
        else {
            console.log("not found");
        }
    }

    update = () => {
        var ssearchh = readlineSync.question("enter which you need to change: ")
        var namefound = user.find(it => it.name === ssearchh)
        if (namefound) {
            var Nname = readlineSync.question("enter name to update: ");
            namefound.name = Nname;
            console.log("updated name: " + Nname);
            user.push(namefound);
            fs.writeFile('./addressbook.json', JSON.stringify(user, null, 2), error => {
                if (error) {
                    console.log(err);
                }
                else {
                }
            });
        }
        else {
            var addressfound = user.find(it => it.address === ssearchh)
            if (addressfound) {
                var Aaddress = readlineSync.question("enter address to update: ");
                addressfound.address = Aaddress;
                console.log("updated address: " + Aaddress)
                user.push(addressfound);
                fs.writeFile('./addressbook.json', JSON.stringify(user, null, 2), error => {
                    if (error) {
                        console.log(err);
                    }
                    else {
                    }
                });
            }
            else {
                var emailfound = user.find(it => it.email === ssearchh)
                if (emailfound) {
                    var emailid = readlineSync.question("enter email to update: ");
                    emailfound.email = emailid;
                    console.log("updated mail: " + emailid);
                    user.push(emailfound);
                    fs.writeFile('./addressbook.json', JSON.stringify(user, null, 2), error => {
                        if (error) {
                            console.log(err);
                        }
                        else {
                        }
                    });
                }
                else {
                    var numberfound = user.find(it => it.number === ssearchh)
                    if (numberfound) {
                        var numberr = readlineSync.question("enter number to update: ");
                        numberfound.number = numberr;
                        console.log("updated number: " + numberr);
                        user.push(numberfound);
                        fs.writeFile('./addressbook.json', JSON.stringify(user, null, 2), error => {
                            if (error) {
                                console.log(err);
                            }
                            else {
                            }
                        });
                    }
                    else {
                        console.log("not found");
                    }
                }
            }
        }
    }

    delete = () => {
        try {
            return new Promise((resolve, reject) => {
                var index = readlineSync.question("enter index to delete contact: ");
                if (index <= user.length) {
                    user.splice(index, 1);
                }
                else {
                    console.log("index is greater than length of array");
                }
                fs.writeFile('./addressbook.json', JSON.stringify(user, null, 2), error => {
                    if (error) {
                        reject(err);
                    }
                    else {
                        resolve();
                        console.log("deleted");
                    }
                });
            })
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new Addressbook();