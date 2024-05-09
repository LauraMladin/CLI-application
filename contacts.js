import { readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import colors from "colors";
import { table } from "node:console";
import { randomUUID } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    console.log("List Contacts".bgBlue);
    const contents = await readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(contents);
    console.table(contacts);
  } catch (error) {
    console.log("There is an error".bgRed.white);
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contents = await readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(contents);
    const id = String(contactId);
    const result = contacts.find((item) => item.id === id);
    console.log("Result:", result);
    return result || null;
  } catch (error) {
    console.error("Error occurred while getting contact by ID:", error);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const contents = await readFile(contactsPath, { encoding: "utf8" });
    let contacts = JSON.parse(contents);

    const indexToRemove = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (indexToRemove === -1) {
      throw new Error("Contact not found for deletion.");
    }

    contacts.splice(indexToRemove, 1);

    await writeFile(contactsPath, JSON.stringify(contacts));

    console.log("The contact has been deleted successfully!".bgGreen);
  } catch (error) {
    console.error(error);
  }
}
async function addContact(contact) {
  try {
    const contents = await readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(contents);
    const newContactId = randomUUID();
    const isValid = contact?.name && contact?.email && contact?.phone;
    if (!isValid) {
      throw new Error(
        "The contact does not have all the required parameters.".bgRed
      );
    }
    const newContact = {
      id: newContactId,
      ...contact,
    };
    contacts.push(newContact);
    const parsedContacts = JSON.stringify(contacts);

    await writeFile(contactsPath, parsedContacts);

    console.log("The contact has been created succesfully!".bgGreen);
  } catch (error) {
    console.error(error);
  }
}

export { listContacts, getContactById, removeContact, addContact };
