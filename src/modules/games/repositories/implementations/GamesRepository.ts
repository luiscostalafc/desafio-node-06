import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const title = await this.repository
      .createQueryBuilder("games")
      .where("games.title = :title", { title: param })
      .execute();

    if (!title) {
      throw new Error("Does not found title");
    }

    return title;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`SELECT SUM(COUNT(title)) OVER() AS total_count
    FROM games`);
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const userWithGames = await this.repository
      .createQueryBuilder("games")
      .where("games.id = :id", { id: id })
      .execute();
    if (!userWithGames) {
      throw new Error("Does not games for that user");
    }

    return userWithGames;
  }
}
