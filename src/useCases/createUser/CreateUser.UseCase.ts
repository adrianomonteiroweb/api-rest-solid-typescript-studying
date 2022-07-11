import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { iCreateUserRequestDTO } from "./CreateUserDTPO";

export class CreateUserUserCase {
  constructor(
    private usersRepository: IUserRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: iCreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Teste aplication",
        email: "test@email.com",
      },
      subject: "Welcome!",
      body: "<p>Testando a aplicação!<p>",
    });
  }
}

/* 

  SINGLE RESPONSIBILITY PRINCIPLE : Class responsável apenas por criar usuários.

  LISKOV SUBSTITUTION PINCIPLE: Recebe uma interface de repositório externa.

  DEPENDENCY INVERSION PRINCIPLE: A class não tem dependência direta de métodos, mas de uma abstração via interface.

*/
