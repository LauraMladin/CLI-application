import { getContactById, listContacts } from "./contacts.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;
const action = argv.action;

switch (action) {
  case "list":
    listContacts();
    break;
  case "add":
    const hasAllArguments = argv.name && argv.email && argv.phone;
    if (!hasAllArguments) {
      console.log(
        `For adding a contact we need 'name', 'email' and 'phone'!`.bgYellow
      );
    }
    break;

  case "remove":
    if (argv.contactId) {
      removeContact(argv.contactId);
    } else {
      console.log("Please provide the ID of the contact to remove.".bgYellow);
    }
    break;

  case "get":
    if (argv.contactId) {
      const contact = await getContactById(argv.contactId);
      if (contact) {
        console.log(contact);
      } else {
        console.log("Contact not found.");
      }
    } else {
      console.log("Please provide the ID of the contact to retrieve.".bgYellow);
    }
    break;

  default:
    console.log(`This command ${action} is not supported!`.bgYellow);
}
