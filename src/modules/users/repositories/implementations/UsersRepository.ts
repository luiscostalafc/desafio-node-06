import { getRepository, Repository } from "typeorm";

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const userWithGames = await this.repository.findOne(user_id);
    if (!userWithGames) {
      throw new Error("Does not games");
    }
    return userWithGames;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(`SELECT * FROM users ORDER BY "first_name"`);
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(
      `SELECT first_name, last_name
      FROM users
      WHERE first_name '=' ${first_name}
      AND last_name '=' ${last_name}
      ORDER BY ${first_name} DESC
      `
    );
  }
}
