import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/iUserRepository";
import { iCreateUserRequestDTO } from "./CreateUserDTPO";

export class CreateUserUserCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute(data: iCreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const user = new User(data);

    await this.usersRepository.save(user);
  }
}

/* 

  SINGLE RESPONSIBILITY PRINCIPLE : Class responsável apenas por criar usuários.

  LISKOV SUBSTITUTION PINCIPLE: Recebe uma interface de repositório externa.

  DEPENDENCY INVERSION PRINCIPLE: A class não tem dependência direta de métodos, mas de uma abstração via interface.

*/
