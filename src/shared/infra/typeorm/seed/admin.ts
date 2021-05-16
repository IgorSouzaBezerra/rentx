import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  try {
    const id = uuidV4();
    const password = await hash("admin", 8);

    console.log(id);
    console.log(password);
    console.log(new Date());

    const connection = await createConnection("localhost");

    await connection.query(
      `INSERT INTO USERS
      (id, name, email, password, "isAdmin", created_at, driver_license)
      values
      ('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXX')`
    );

    await connection.close;
  } catch (err) {
    console.log(err);
  }
}

create().then(() => console.log("User admin created!"));
