const db = require("./connections/db");
const input = require("readline-sync");

const table = "users"; // table name
const first = () => {
  db.connect((err) => {
    if (err) console.log(err);
    console.log("connected");
  });
};

// show all users
const show = () => {
  db.query(
    `select name as 'USER Name', email as 'Email' from ${table}`,
    (err, data) => {
      if (err) throw err;
      console.log(data);
      start();
    }
  );
};

const Register = (name, email, pass) => {
  first();
  db.query(`select * from ${table} where email='${email}'`, (err, data) => {
    if (err) throw err;
    if (data.length < 1) {
      db.query(
        `insert into ${table} (name, email, password) values('${name}', '${email}', '${pass}')`,
        (err, data) => {
          if (err) throw err;
          console.log(data);
          start();
        }
      );
    } else {
      console.log("User already exists");
    }
  });
};

// update details
const update = (opt, email, data) => {
  first();
  console.log(opt, email, data);
  if (opt == 1) {
    db.query(`update ${table} set name='${data}' where email='${email}'`)
  } else if (opt == 2) {
    db.query(`update ${table} set email='${data}' where email='${email}'`)
  } else if (opt == 3) {
    db.query(`update ${table} set password='${data}' where email='${email}'`)
  }
};

// delete user
const remove = (email) => {
  console.log(email);
  first();
  db.query(`delete from ${table} where email='${email}'`);
  console.log("User Deleted succussfully ");
  start();
};

// login
const login = (email, pass) => {
  first();
  db.query(`select * from ${table} where email='${email}'`, (err, data) => {
    if (err) throw err;
    if (data[0].password == pass) {
      console.log("Login Success ");
      const choice = input.questionInt("1 for Update | 2 for Delete user : ");
      if (choice == 1) {
        const choice1 = input.questionInt(
          "1 for Name | 2 for Email | 3 for Password : "
        );
        if (choice1 == 1) {
          const name = input.question("Enter new name : ");
          update(1, email, name);
        } else if (choice1 == 2) {
          const email1 = input.question("Enter new email : ");
          update(2, email, email1);
        } else if (choice1 == 3) {
          const pass = input.question("Enter new password : ");
          update(3, email, pass);
        }
      } else if (choice == 2) {
        remove(email);
        // db.query(`delete from ${table} where email='${email}'`)
      }
    }
  });
};

/// starts from here
var start = () => {
  try {
    console.log(`   **********************
        1 for sinup
        2 for Login
        3 for Show Users
        9 for exit
   **********************`);
    const choice = input.questionInt("Enter your choice : ");
    if (choice == 1) {
      const name = input.question("Enter your name :");
      const reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const rePass =
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})";
      const email = input.question("Enter your email :");
      if (email.match(reEmail)) {
        const pass = input.question("Enter your password :");
        if (pass.match(rePass)) {
          Register(name, email, pass);
        } else {
          console.log("Entere a valid password and try again");
          start();
        }
      } else {
        console.log("Enter a valid Email and try again");
        start();
      }
    } else if (choice == 2) {
      const email = input.question("Enter your email :");
      const pass = input.question("Enter your password :");
      login(email, pass);
    } else if (choice == 3) {
      show();
    } else if (choice == 9) {
      console.log("Bye-Bye");
      return;
    }
  } catch (error) {
    console.log(error);
    start();
  }
};
start();
