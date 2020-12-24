const Utility = require('./utility');

var readlineSync = require('readline-sync');

checkoption = function () {

    let isTerminated = true;

    while (isTerminated == true) {

        let checkoption = readlineSync.question("\nEner your choice:\n1.Read\n2.Add\n3.delete\n4.search\n5.update\n6.exit\n");

        switch (checkoption) {

            case '1':
                Utility.readFile();
                break;

            case '2':
                Utility.writeFilePromise();
                break;

            case '3':
                Utility.delete();
                break;

            case '4':
                Utility.search();
                break;

            case '5':
                Utility.update();
                break;

            case '6':
                isTerminated = false;
                break;

            default: 
		console.log("please enter correct option");
        }
    }
}
checkoption();

