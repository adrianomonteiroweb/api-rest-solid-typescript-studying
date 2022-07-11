import { MailtrapMailProvider } from "../../providers/implementatios/Mailtrap.MailProvider";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserUserCase } from "./CreateUser.UseCase";
import { CreateUserController } from "./CreateUserController";

const mailtrapMailProvider = new MailtrapMailProvider();
const postgresUsersRepository = new PostgresUsersRepository();

const createUserUserCase = new CreateUserUserCase(
  postgresUsersRepository,
  mailtrapMailProvider
);

const createUserController = new CreateUserController(createUserUserCase);

export { createUserUserCase, createUserController };
